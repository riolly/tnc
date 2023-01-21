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
		viewBox='0 0 640 512'
		className={className}
	>
		<path
			className={primaryClassName}
			d='M630.8 469.1L38.81 5.13c-10.47-8.219-25.53-6.37-33.7 4.068s-6.349 25.54 4.073 33.69l591.1 463.1c4.406 3.469 9.61 5.127 14.8 5.127c7.125 0 14.17-3.164 18.9-9.195C643.1 492.4 641.2 477.3 630.8 469.1z'
		/>
		<path
			className={secondaryClassName}
			d='M351.1 416H306.7l18.96-64.1L271.4 308.5l-31.36 107.5h-48c-17.67 0-32 14.31-32 32s14.33 31.99 32 31.99h160c17.67 0 32-14.31 32-31.99S369.7 416 351.1 416zM544 32.01H191.1c-17.67 0-32 14.31-32 32V100.1l58.03 45.48C221.5 140.5 223.1 134.7 223.1 128v-32h109.3l-33.22 113.9l54.26 42.53L400 96.01H512v32c0 17.69 14.33 32 32 32s32-14.31 32-32v-64C576 46.33 561.7 32.01 544 32.01z'
		/>
	</svg>
)

export default TextSlashIcon
