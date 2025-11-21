import { useState } from 'react';
import Modal from './Modal';

interface CreateTestModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CreateTestModal({ isOpen, onClose }: CreateTestModalProps) {
	const [testName, setTestName] = useState('');
	const [isTimerEnabled, setIsTimerEnabled] = useState(false);
	const [timerDuration, setTimerDuration] = useState(10);
	const [isPublic, setIsPublic] = useState(false);

	const handleSave = () => {
		// TODO: Implement save functionality
		console.log({ testName, isTimerEnabled, timerDuration, isPublic });
		onClose();
	};

	const handleCancel = () => {
		setTestName('');
		setIsTimerEnabled(false);
		setTimerDuration(10);
		setIsPublic(false);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCancel} title="Create Custom Test">
			<div className="space-y-6">
				{/* Test Name */}
				<div>
					<label htmlFor="test-name" className="block text-sm font-medium text-gray-700 mb-2">
						Test Name
					</label>
					<input
						id="test-name"
						type="text"
						value={testName}
						onChange={(e) => setTestName(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Enter test name"
					/>
				</div>

				{/* Timer Toggle */}
				<div>
					<div className="flex items-center justify-between mb-2">
						<label htmlFor="timer-enabled" className="text-sm font-medium text-gray-700">
							Timer
						</label>
						<button
							id="timer-enabled"
							type="button"
							onClick={() => setIsTimerEnabled(!isTimerEnabled)}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								isTimerEnabled ? 'bg-indigo-600' : 'bg-gray-200'
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
									isTimerEnabled ? 'translate-x-6' : 'translate-x-1'
								}`}
							/>
						</button>
					</div>

					{/* Timer Duration */}
					{isTimerEnabled && (
						<div className="mt-3">
							<label htmlFor="timer-duration" className="block text-sm text-gray-600 mb-2">
								Duration (minutes)
							</label>
							<input
								id="timer-duration"
								type="number"
								min="1"
								max="120"
								value={timerDuration}
								onChange={(e) => setTimerDuration(parseInt(e.target.value) || 1)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
					)}
				</div>

				{/* Public/Private Toggle */}
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="is-public" className="text-sm font-medium text-gray-700">
							Public
						</label>
						<button
							id="is-public"
							type="button"
							onClick={() => setIsPublic(!isPublic)}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								isPublic ? 'bg-indigo-600' : 'bg-gray-200'
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
									isPublic ? 'translate-x-6' : 'translate-x-1'
								}`}
							/>
						</button>
					</div>
					<p className="text-xs text-gray-500 mt-1">
						{isPublic ? 'Anyone can view this test' : 'Only you can view this test'}
					</p>
				</div>

				{/* Buttons */}
				<div className="flex gap-3 justify-end pt-4">
					<button
						onClick={handleCancel}
						className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						disabled={!testName.trim()}
						className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
					>
						Save
					</button>
				</div>
			</div>
		</Modal>
	);
}
