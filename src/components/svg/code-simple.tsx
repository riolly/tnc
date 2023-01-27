type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const CodeSimpleIcon = ({
	className = 'h-5 w-5',
	primaryClassName,
	secondaryClassName,
}: Props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 576 512'
		className={className}
	>
		<path
			className={primaryClassName}
			d='M214.6 73.37C227.1 85.87 227.1 106.1 214.6 118.6L77.25 256L214.6 393.4C227.1 405.9 227.1 426.1 214.6 438.6C202.1 451.1 181.9 451.1 169.4 438.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L169.4 73.37C181.9 60.88 202.1 60.88 214.6 73.37V73.37z'
		/>
		<path
			className={secondaryClassName}
			d='M406.6 73.37L566.6 233.4C579.1 245.9 579.1 266.1 566.6 278.6L406.6 438.6C394.1 451.1 373.9 451.1 361.4 438.6C348.9 426.1 348.9 405.9 361.4 393.4L498.7 255.1L361.4 118.6C348.9 106.1 348.9 85.87 361.4 73.37C373.9 60.88 394.1 60.88 406.6 73.37V73.37z'
		/>
	</svg>
)

export default CodeSimpleIcon
