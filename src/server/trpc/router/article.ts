import {z} from 'zod'

import {router, publicProcedure} from '../trpc'
import {revalidate, slugify} from '@server/utils/page'

import {createArticleInputSchema, updateArticleInputSchema} from 'types/article'

const requiredIdSchema = z.object({id: z.string()})

export const articleRouter = router({
	getArticles: publicProcedure.query(({ctx}) => ctx.prisma.article.findMany()),
	getArticle: publicProcedure
		.input(requiredIdSchema)
		.query(({ctx, input}) =>
			ctx.prisma.article.findUnique({where: {id: input.id}})
		),
	createArticle: publicProcedure
		.input(createArticleInputSchema)
		.mutation(async ({ctx, input}) =>
			ctx.prisma.article
				.create({
					data: {...input, slug: slugify(input.title)},
				})
				.then(({id, title}) =>
					ctx.prisma.article.update({
						where: {id},
						data: {
							slug: slugify(title, id),
						},
					})
				)
		),
	updateArticle: publicProcedure.input(updateArticleInputSchema).mutation(
		async ({ctx, input}) =>
			ctx.prisma.article
				.update({
					where: {id: input.id},
					data: {
						...input,
						slug: slugify(input.title, input.id),
					},
				})
				.then(async (updated) => {
					await revalidate('article', updated.slug)
					return updated
				})

		// RETAIN PUBLISHED ARTICLE PATH WHILE UPDATING ITS CONTENT
		// const fetchOldArticles = ctx.prisma.article.findMany({
		// 	where: {id},
		// 	select: {slug: true},
		// })

		// const [updated, olds] = await Promise.all([
		// 	updateCurrentArticle,
		// 	fetchOldArticles,
		// ]).then((data) => {
		// 	console.log('Finish updating current article & fetching old articles')
		// 	console.log('UPDATED >>>')
		// 	console.log(data[0])
		// 	console.log('OLDS >>>>>>')
		// 	console.log(data[1])
		// 	return data
		// })

		// const revalidation: RevalidationResponses = []
		// if (updated.slug === oldSlug) {
		// 	revalidation.push(revalidate('article', updated.slug))
		// } else {
		// 	for (const old of olds) {
		// 		revalidation.push(revalidate('article', old.slug))
		// 	}
		// }

		// const response = new Promise<{
		// 	data: typeof updated
		// 	revalidation: RevalidationResponses
		// }>((resolve) => {
		// 	resolve({
		// 		data: updated,
		// 		revalidation,
		// 	})
		// })

		// Promise.all(revalidation).then((revalidated) => {
		// 	console.log('Finish revalidate all related articles')
		// 	console.log(revalidated)
		// 	Promise.resolve(response)
		// })
	),
	deleteArticle: publicProcedure
		.input(requiredIdSchema)
		.mutation(({ctx, input}) =>
			ctx.prisma.article.delete({where: {id: input.id}})
		),
})
