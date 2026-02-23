import type { ReactNode } from 'react';

interface QuizLayoutProps {
	title: string;
	subtitle?: string;
	headerRight?: ReactNode;
	children: ReactNode;
}

export default function QuizLayout({ title, subtitle, headerRight, children }: QuizLayoutProps) {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 min-h-full">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
						{subtitle && <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
					</div>
					{headerRight}
				</div>
				{children}
			</div>
		</div>
	);
}
