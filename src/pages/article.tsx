/* eslint-disable unicorn/no-useless-undefined */
import React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {trpc} from 'utils/trpc'
import {useDebounceState} from 'utils/hooks/use-debounce'
import {truncate} from 'utils/literal'

import NavbarLayout from 'layouts/navbar'
import {
	LoadingPlaceholder,
	ErrorPlaceholder,
	EmptyPlaceholder,
} from 'components/query-wrapper'
import DataInfiniteWrapper from 'components/query-infinite-wrapper'
import DivAnimate from 'components/div-animate'
import Modal from 'components/modal'
import FormWrapper from 'components/form-wrapper'
import TextAreaInput from 'components/textarea-input'
import {Button, IconButton} from 'components/button'
import {
	PlusIcon,
	PencilIcon,
	TrashIcon,
	ArrowPathIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

import {type NextPageWithLayout} from './_app'
import {
	articleCreateSchema,
	ArticleCreateType,
	type ArticleType,
} from 'types/article'
import {type SubmitHandler} from 'react-hook-form'

const MyArticlePage: NextPageWithLayout = () => {
	const router = useRouter()
	const {data: auth, status} = useSession()

	const [isCreate, setIsCreate] = React.useState(false)
	const [edit, setEdit] = React.useState<
		Pick<ArticleType, 'id' | 'authorId' | 'title' | 'content'> | undefined
	>(undefined)

	const [searchQuery, setSearchQuery] = useDebounceState<string>('', 350)
	const {hasNextPage, fetchNextPage, data, isLoading, isError, error, refetch} =
		trpc.article.fetchAll.useInfiniteQuery(
			{query: searchQuery, own: true},
			{
				staleTime: 60_000,
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			}
		)

	const methods = useForm<ArticleCreateType>({
		mode: 'onTouched',
		resolver: zodResolver(articleCreateSchema),
	})

	const {mutate: create, isLoading: isCreating} =
		trpc.article.create.useMutation({
			onError: (error) => alert(error.message),
			onSuccess: () => {
				refetch()
				methods.reset()
				setIsCreate(false)
			},
		})
	const {mutate: update, isLoading: isUpdating} =
		trpc.article.update.useMutation({
			onError: (error) => alert(error.message),
			onSuccess: () => {
				refetch()
				methods.reset()
				setEdit(undefined)
			},
		})
	const {mutate: remove, isLoading: isRemoving} =
		trpc.article.delete.useMutation({
			onError: (err) => alert(err.message),
			onSuccess: () => refetch(),
		})

	const onValidSubmit: SubmitHandler<ArticleCreateType> = (data) => {
		if (isCreate) {
			create(data)
		} else if (edit) {
			update({id: edit.id, authorId: edit.authorId, ...data})
		}
	}

	React.useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/community')
		}
	}, [status, router])

	if (status === 'loading') return <p>Loading...</p>
	return (
		<>
			<Head>
				<title>My Articles | Transparency</title>
			</Head>
			<main className='container space-y-8 px-5 pt-8 md:px-8'>
				<div className='mx-auto max-w-screen-md space-y-2'>
					<div className='flex gap-2'>
						<h1 className='text-2xl'>Your Articles</h1>
						<IconButton onClick={() => void setIsCreate(true)}>
							<PlusIcon className='w-6 text-brand-300' />
						</IconButton>
					</div>
					<input
						className='h-10 w-full flex-1 rounded rounded-tl-lg rounded-br-2xl bg-gradient-to-br from-white via-brand-100 to-brand-300 py-2 px-3 placeholder:font-body placeholder:text-sm placeholder:italic md:w-1/2'
						onChange={(e) => void setSearchQuery(e.target.value)}
						placeholder='search by title or content...'
					/>
				</div>

				<DivAnimate className='mx-auto max-w-screen-md '>
					{isLoading ? (
						<LoadingPlaceholder label='articles' />
					) : isError ? (
						<ErrorPlaceholder error={error} refetch={refetch} />
					) : data.pages[0]?.items.length === 0 ? (
						<EmptyPlaceholder label='articles' />
					) : (
						<DataInfiniteWrapper
							name='user_article'
							className='flex flex-col gap-2'
							keys={[auth?.user.id ?? '']}
							{...{hasNextPage, fetchNextPage, data}}
						>
							{({id, title, content, authorId}) => (
								<div
									key={id}
									className='flex items-center justify-between gap-8 rounded-lg rounded-t-lg bg-dark-bg/25 py-2 pl-4 pr-3 shadow'
								>
									<div className='flex flex-col'>
										<h2 className='text-lg'>{truncate(title, 60)}</h2>
										<p className='text-sm'>{truncate(content, 80)}</p>
									</div>

									<div className='item-center flex divide-x-2 '>
										<button
											onClick={() => {
												methods.setValue('title', title)
												methods.setValue('content', content)

												setEdit({id, authorId, title, content})
											}}
										>
											<PencilIcon className='h-8 w-8 rounded-l-lg bg-brand-100/75 p-1 text-brand-800 transition-colors duration-200 hover:bg-brand-200 active:bg-brand-300 md:h-10 md:w-10 md:p-2' />
										</button>
										<button
											disabled={isRemoving}
											onClick={() => remove({id, authorId})}
											className='rounded-r-lg bg-brand-100/75 p-1 text-red-700 transition-colors duration-200 hover:bg-brand-200 active:bg-brand-300 disabled:cursor-not-allowed disabled:bg-gray-400 md:h-10 md:w-10 md:p-1.5'
										>
											{isRemoving ? (
												<ArrowPathIcon className='w-6 animate-spin text-white' />
											) : (
												<TrashIcon className='h-6' />
											)}
										</button>
									</div>
								</div>
							)}
						</DataInfiniteWrapper>
					)}
				</DivAnimate>

				<Modal
					isOpen={isCreate || !!edit}
					setIsOpen={setIsCreate}
					className='max-w-screen-md'
				>
					<div className='border-6 container max-w-screen-lg space-y-2 rounded-lg border-light-bg/40 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 py-6 px-8'>
						<div className=''>
							<FormWrapper
								methods={methods}
								onValidSubmit={onValidSubmit}
								className='flex flex-col gap-4'
							>
								<TextAreaInput<ArticleCreateType> name='title' rows={2} />
								<TextAreaInput<ArticleCreateType> name='content' rows={8} />
								<div className='flex gap-2'>
									<Button
										type='submit'
										variant='filled'
										isLoading={isCreating || isUpdating}
									>
										{isCreate ? (
											<>
												Publish <PencilIcon className='w-5' />
											</>
										) : (
											<>
												Update <PencilIcon className='w-5' />
											</>
										)}
									</Button>
									<Button
										type='reset'
										variant='outlined'
										onClick={() => {
											setIsCreate(false)
											setEdit(undefined)
											methods.reset()
										}}
										isLoading={isCreating || isUpdating}
									>
										Cancel <XMarkIcon className='w-5' />
									</Button>
								</div>
							</FormWrapper>
						</div>
					</div>
				</Modal>
			</main>
		</>
	)
}

MyArticlePage.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>

export default MyArticlePage
