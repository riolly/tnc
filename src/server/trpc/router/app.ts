import {z} from 'zod'
import {publicProcedure, router, adminProcedure} from '../trpc'
import {appCreateSchema, appUpdateSchema} from 'types/app'
import {requiredIdSchema} from 'types/general'

import {revalidate} from 'server/utils/route'
import {slugify} from 'utils/literal'

export const appRouter = router({
	fetchAll: publicProcedure.query(({ctx}) =>
		ctx.prisma.app.findMany({include: {AppCriteria: true}})
	),
	fetchOne: publicProcedure.input(requiredIdSchema).query(({ctx, input}) =>
		ctx.prisma.app.findUnique({
			where: {id: input.id},
			include: {AppCriteria: true},
		})
	),
	search: publicProcedure
		.input(
			z.object({
				query: z.string().optional(),
				dataPerPage: z.number().optional(),
				cursorId: z.string().optional(),
			})
		)
		.query(({ctx, input}) =>
			ctx.prisma.app.findMany({
				where: {
					name: {search: input.query},
					company: {search: input.query},
					about: {search: input.query},
				},
				take: input.dataPerPage ?? 8,
				orderBy: {
					updatedAt: 'desc',
				},
				...(input.cursorId && {cursor: {id: input.cursorId}, skip: 1}),
			})
		),

	create: adminProcedure
		.input(appCreateSchema)
		.mutation(({ctx, input: {criteria, ...input}}) =>
			ctx.prisma.app.create({
				data: {
					...input,
					AppCriteria: {
						createMany: {
							data: criteria,
						},
					},
				},
			})
		),
	update: adminProcedure
		.input(appUpdateSchema)
		.mutation(({ctx, input: {id, ...input}}) =>
			ctx.prisma.app
				.update({where: {id}, data: input})
				.then(async (updated) => {
					await revalidate('policy', slugify(updated.name, updated.id))
					return updated
				})
		),
	delete: adminProcedure.input(requiredIdSchema).mutation(({ctx, input}) =>
		ctx.prisma.$transaction([
			ctx.prisma.appCriteria.deleteMany({where: {appId: input.id}}),
			ctx.prisma.app.delete({
				where: {id: input.id},
			}),
		])
	),
})
