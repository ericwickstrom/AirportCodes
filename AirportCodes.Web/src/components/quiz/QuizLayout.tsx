import type { ReactNode } from 'react';

interface QuizLayoutProps {
	title: string;
	headerRight?: ReactNode;
	children: ReactNode;
}

export default function QuizLayout({ title, headerRight, children }: QuizLayoutProps) {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-4xl font-bold text-gray-900">{title}</h1>
					{headerRight}
				</div>
				{children}
			</div>
		</div>
	);
}
