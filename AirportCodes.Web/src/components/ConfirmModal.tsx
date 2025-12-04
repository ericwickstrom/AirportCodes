import Modal from './Modal';

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	variant?: 'danger' | 'warning';
	isLoading?: boolean;
}

export default function ConfirmModal({
	isOpen,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	onCancel,
	variant = 'danger',
	isLoading = false,
}: ConfirmModalProps) {
	const confirmButtonClass = variant === 'danger'
		? 'px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-medium transition-colors'
		: 'px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-medium transition-colors';

	return (
		<Modal
			isOpen={isOpen}
			onClose={onCancel}
			title={title}
			headerActions={
				<>
					<button
						onClick={onCancel}
						disabled={isLoading}
						className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
					>
						{cancelText}
					</button>
					<button
						onClick={onConfirm}
						disabled={isLoading}
						className={confirmButtonClass}
					>
						{isLoading ? 'Processing...' : confirmText}
					</button>
				</>
			}
		>
			<div className="py-4">
				<p className="text-gray-700">{message}</p>
			</div>
		</Modal>
	);
}
