import { useState, useEffect } from 'react';
import Modal from './Modal';
import { customTestApi } from '../services/api';
import type { CustomTest } from '../types';

interface ViewCustomTestsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ViewCustomTestsModal({ isOpen, onClose }: ViewCustomTestsModalProps) {
	const [tests, setTests] = useState<CustomTest[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen) {
			loadTests();
		}
	}, [isOpen]);

	const loadTests = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const userTests = await customTestApi.getUserTests();
			setTests(userTests);
		} catch (err) {
			console.error('Failed to load custom tests:', err);
			setError('Failed to load custom tests');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Custom Tests">
			<div className="space-y-4">
				{isLoading ? (
					<p className="text-gray-500 text-center py-8">Loading...</p>
				) : error ? (
					<p className="text-red-600 text-center py-8">{error}</p>
				) : tests.length === 0 ? (
					<p className="text-gray-500 text-center py-8">No custom tests yet</p>
				) : (
					<div className="space-y-2">
						{tests.map((test) => (
							<div
								key={test.id}
								className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
							>
								<div className="flex justify-between items-center">
									<h3 className="font-semibold text-gray-900">{test.name}</h3>
									<span className="text-sm text-gray-500">
										{test.airportCount} {test.airportCount === 1 ? 'airport' : 'airports'}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Modal>
	);
}
