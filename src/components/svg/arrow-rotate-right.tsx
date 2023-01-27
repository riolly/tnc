type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const ArrowRotateRightIcon = ({
	className = 'h-5 w-5',
	primaryClassName,
	secondaryClassName,
}: Props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'
		className={className}
	>
		<path
			className={primaryClassName}
			d='M464 224H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h112V48c0-17.69 14.31-32 32-32s32 14.31 32 32V192C496 209.7 481.7 224 464 224z'
		/>
		<path
			className={secondaryClassName}
			d='M396.5 390.2c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V160h-48.61c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94C365.9 373.3 385.9 376.1 396.5 390.2z'
		/>
	</svg>
)

export default ArrowRotateRightIcon
