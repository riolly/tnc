type Props = {
	className?: string
	primaryClassName?: string
	secondaryClassName?: string
}

const H2Icon = ({
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
			d='M608 384h-126l100.4-92.5c51.84-47.75 56.81-127.3 11.3-181.2c-22.75-26.94-54.64-43.28-89.8-46.09c-35.09-2.938-69.25 8.344-95.97 31.38l-25.09 21.59c-13.39 11.53-14.91 31.72-3.375 45.13c11.55 13.38 31.72 14.94 45.13 3.375l25.09-21.59c13.69-11.78 31.05-17.66 49.16-16.06c18 1.438 34.33 9.812 45.98 23.59c23.31 27.56 20.77 68.34-5.781 92.81l-160.7 148c-9.703 8.938-12.94 22.88-8.141 35.16S386.8 448 400 448H608c17.67 0 32-14.31 32-32S625.7 384 608 384z'
		/>
		<path
			className={secondaryClassName}
			d='M288 64.01c-17.67 0-32 14.31-32 32v128H64v-128c0-17.69-14.33-32-32-32s-32 14.31-32 32v320c0 17.69 14.33 32 32 32s32-14.31 32-32v-128h192v128c0 17.69 14.33 32 32 32s32-14.31 32-32v-320C320 78.33 305.7 64.01 288 64.01z'
		/>
	</svg>
)

export default H2Icon
