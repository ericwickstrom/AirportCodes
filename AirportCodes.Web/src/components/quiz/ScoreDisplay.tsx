interface ScoreDisplayProps {
	label: string;
	correct: number;
	total?: number;
}

export default function ScoreDisplay({ label, correct, total }: ScoreDisplayProps) {
	return (
		<div className="text-right">
			<p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
			<p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
				{total !== undefined ? `${correct}/${total}` : correct}
			</p>
		</div>
	);
}
