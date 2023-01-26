type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const H4Icon = ({
	className = 'h-5 w-5',
	primaryClassName,
	secondaryClassName,
}: Props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 640 512'
		className={className}
	>
		<path
			className={primaryClassName}
			d='M608 64.01c-17.67 0-32 14.31-32 32v159.1h-135l38.06-152.2c4.281-17.12-6.141-34.5-23.28-38.78c-17.05-4.25-34.52 6.094-38.81 23.28l-48 191.1c-2.391 9.562-.2344 19.69 5.828 27.44C380.8 315.5 390.1 320 400 320H576v96c0 17.69 14.33 32 32 32s32-14.31 32-32v-320C640 78.33 625.7 64.01 608 64.01z'
		/>
		<path
			className={secondaryClassName}
			d='M288 64.01c-17.67 0-32 14.31-32 32v128H64v-128c0-17.69-14.33-32-32-32s-32 14.31-32 32v320c0 17.69 14.33 32 32 32s32-14.31 32-32v-128h192v128c0 17.69 14.33 32 32 32s32-14.31 32-32v-320C320 78.33 305.7 64.01 288 64.01z'
		/>
	</svg>
)

export default H4Icon