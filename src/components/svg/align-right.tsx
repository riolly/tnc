type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const AlignRightIcon = ({
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
			d='M32 480C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480H32zM32 224C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32z'
		/>
		<path
			className={secondaryClassName}
			d='M192 352C174.3 352 160 337.7 160 320C160 302.3 174.3 288 192 288H416C433.7 288 448 302.3 448 320C448 337.7 433.7 352 416 352H192zM192 96C174.3 96 160 81.67 160 64C160 46.33 174.3 32 192 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H192z'
		/>
	</svg>
)

export default AlignRightIcon
