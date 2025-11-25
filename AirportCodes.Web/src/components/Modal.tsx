import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	headerActions?: ReactNode;
}

export default function Modal({ isOpen, onClose, children, title, headerActions }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
			/>
			<div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
					{title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
					{headerActions && <div className="flex gap-3">{headerActions}</div>}
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
						aria-label="Close modal"
					>
						×
					</button>
				</div>
				<div className="p-6">
					{children}
				</div>
			</div>
		</div>
	);
}
