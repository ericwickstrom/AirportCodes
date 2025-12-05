interface QuestionDisplayProps {
	airportName: string;
	city: string;
	country: string;
	prompt?: string;
}

export default function QuestionDisplay({
	airportName,
	city,
	country,
	prompt = 'What is the IATA code for:',
}: QuestionDisplayProps) {
	return (
		<div className="space-y-2">
			<p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{prompt}</p>
			<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{airportName}</h2>
			<p className="text-lg text-gray-600 dark:text-gray-300">
				{city}, {country}
			</p>
		</div>
	);
}
