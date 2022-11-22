import {
	FormProvider,
	type UseFormReturn,
	type SubmitHandler,
	type SubmitErrorHandler,
	type FieldValues,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
	className: string
	children: React.ReactNode
	methods: UseFormReturn<T>
	onValid: SubmitHandler<T>
	onInvalid?: SubmitErrorHandler<T>
}

const FormWrapper = <T extends FieldValues>({
	children,
	className,
	methods,
	onValid,
	onInvalid,
}: Props<T>) => {
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onValid, onInvalid)}
				className={className}
			>
				{children}
			</form>
		</FormProvider>
	)
}

export default FormWrapper
