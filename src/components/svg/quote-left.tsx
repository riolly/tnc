type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const QuoteLeftIcon = ({
	className = 'h-5 w-5',
	primaryClassName,
	secondaryClassName,
}: Props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'
		className={className}
	>
		<path
			className={primaryClassName}
			d='M96 224C84.72 224 74.05 226.3 64 229.9V224c0-35.3 28.7-64 64-64c17.67 0 32-14.33 32-32S145.7 96 128 96C57.42 96 0 153.4 0 224v96c0 53.02 42.98 96 96 96s96-42.98 96-96S149 224 96 224z'
		/>
		<path
			className={secondaryClassName}
			d='M352 224c-11.28 0-21.95 2.305-32 5.879V224c0-35.3 28.7-64 64-64c17.67 0 32-14.33 32-32s-14.33-32-32-32c-70.58 0-128 57.42-128 128v96c0 53.02 42.98 96 96 96s96-42.98 96-96S405 224 352 224z'
		/>
	</svg>
)

export default QuoteLeftIcon
