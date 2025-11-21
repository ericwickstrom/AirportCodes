import Modal from './Modal';

interface ViewCustomTestsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface CustomTest {
	id: number;
	name: string;
	airportCount: number;
}

// Temporary mock data
const mockTests: CustomTest[] = [
	{ id: 1, name: 'US Major Hubs', airportCount: 25 },
	{ id: 2, name: 'European Capitals', airportCount: 30 },
	{ id: 3, name: 'Asian Megacities', airportCount: 18 },
	{ id: 4, name: 'Caribbean Islands', airportCount: 15 },
	{ id: 5, name: 'Australian & NZ Airports', airportCount: 12 },
];

export default function ViewCustomTestsModal({ isOpen, onClose }: ViewCustomTestsModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Custom Tests">
			<div className="space-y-4">
				{mockTests.length === 0 ? (
					<p className="text-gray-500 text-center py-8">No custom tests yet</p>
				) : (
					<div className="space-y-2">
						{mockTests.map((test) => (
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
