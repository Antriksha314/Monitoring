import { Controller, useFormContext } from 'react-hook-form'
import Select, { Props } from 'react-select'

interface RSelectProps extends Props {
	name: string
	options: Array<{
		label: string
		value: string | number
	}>
	label?: string
	className?: string
}

export const ReactSelect: React.FC<RSelectProps> = ({
	name,
	options,
	label,
	className,
	...rest
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()
	return (
		<div className={`mb-10 ${className}`}>
			{label ? (
				<label className="block text-black text-xs font-bold mb-2">
					{label}
				</label>
			) : null}
			<Controller
				control={control}
				name={name}
				render={({ field: { name, onBlur, onChange, ref, value } }) => {
					return (
						<Select
							name={name}
							options={options}
							// @ts-ignore
							inputRef={ref}
							onBlur={onBlur}
							value={options?.filter((c) =>
								value ? value?.includes(c?.value) : null
							)}
							onChange={(val: any) => onChange(val?.value)}
							{...rest}
						/>
					)
				}}
			/>
			{errors?.[name]?.message ? (
				<p className="text-red-400 mt-1">{errors?.[name]?.message as string}</p>
			) : null}
		</div>
	)
}
