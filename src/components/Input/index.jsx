export default function Input(props) {
	const { onChange, value } = props;
	return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

Input.displayName = 'input';
