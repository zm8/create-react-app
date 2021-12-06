export default function Input({ onChange, value }) {
	return (
		<input
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		/>
	);
}

Input.displayName = 'input';
