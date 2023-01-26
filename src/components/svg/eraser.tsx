type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const TextSlashIcon = ({
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
			d='M150.1 166.1L258.7 57.37C283.7 32.38 324.3 32.38 349.3 57.37L486.6 194.7C511.6 219.7 511.6 260.3 486.6 285.3L377.9 393.9L150.1 166.1z'
		/>
		<path
			className={secondaryClassName}
			d='M355.9 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H150.6C133.7 480 117.4 473.3 105.4 461.3L25.37 381.3C.3786 356.3 .3786 315.7 25.37 290.7L150.1 166.1L195.3 211.3L70.63 336L150.6 416H265.4L332.7 348.7L377.9 393.9L355.9 416z'
		/>
	</svg>
)

export default TextSlashIcon