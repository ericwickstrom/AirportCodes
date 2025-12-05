import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface QuizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	children: ReactNode;
}

export default function QuizButton({
	variant = 'primary',
	children,
	disabled,
	className = '',
	...props
}: QuizButtonProps) {
	const baseClass = 'flex-1 font-semibold py-3 px-6 rounded-lg transition-colors';
	const variantClass =
		variant === 'primary'
			? 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:bg-gray-300 text-white'
			: 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100';
	const disabledClass = disabled ? 'disabled:cursor-not-allowed' : '';

	return (
		<button className={`${baseClass} ${variantClass} ${disabledClass} ${className}`} disabled={disabled} {...props}>
			{children}
		</button>
	);
}
