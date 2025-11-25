import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { airportApi, customTestApi } from '../services/api';
import type { Airport } from '../types';

interface CreateTestModalProps {
	isOpen: boolean;
	onClose: () => void;
	onTestCreated?: () => void;
}

export default function CreateTestModal({ isOpen, onClose, onTestCreated }: CreateTestModalProps) {
	const [testName, setTestName] = useState('');
	const [isTimerEnabled, setIsTimerEnabled] = useState(false);
	const [timerDuration, setTimerDuration] = useState(10);
	const [isPublic, setIsPublic] = useState(false);
	const [isAnonymous, setIsAnonymous] = useState(false);

	// Airport selection state
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<Airport[]>([]);
	const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [duplicateMessage, setDuplicateMessage] = useState('');
	const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// Save state
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Debounced search
	useEffect(() => {
		if (searchTimeoutRef.current !== undefined) {
			clearTimeout(searchTimeoutRef.current);
		}

		if (searchQuery.trim().length < 2) {
			setSearchResults([]);
			setShowDropdown(false);
			return;
		}

		setIsSearching(true);
		searchTimeoutRef.current = setTimeout(async () => {
			try {
				const results = await airportApi.search(searchQuery, 10);
				setSearchResults(results);
				setShowDropdown(true);
			} catch (error) {
				console.error('Search error:', error);
				setSearchResults([]);
			} finally {
				setIsSearching(false);
			}
		}, 300);

		return () => {
			if (searchTimeoutRef.current !== undefined) {
				clearTimeout(searchTimeoutRef.current);
			}
		};
	}, [searchQuery]);

	const handleAddAirport = (airport: Airport) => {
		if (selectedAirports.some(a => a.id === airport.id)) {
			setDuplicateMessage('Already added');
			setTimeout(() => setDuplicateMessage(''), 2000);
			return;
		}

		setSelectedAirports([...selectedAirports, airport]);
		setSearchQuery('');
		setShowDropdown(false);
	};

	const handleRemoveAirport = (airportId: string) => {
		setSelectedAirports(selectedAirports.filter(a => a.id !== airportId));
	};

	const handleSave = async () => {
		setIsSaving(true);
		setSaveError(null);

		try {
			await customTestApi.create({
				name: testName.trim(),
				airportIds: selectedAirports.map(a => a.id),
				isPublic,
				isAnonymous,
				timerEnabled: isTimerEnabled,
				timerDurationSeconds: isTimerEnabled ? timerDuration * 60 : undefined,
			});

			// Reset form
			handleCancel();

			// Notify parent component
			if (onTestCreated) {
				onTestCreated();
			}
		} catch (error) {
			console.error('Failed to create custom test:', error);
			setSaveError(error instanceof Error ? error.message : 'Failed to create custom test');
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setTestName('');
		setIsTimerEnabled(false);
		setTimerDuration(10);
		setIsPublic(false);
		setIsAnonymous(false);
		setSelectedAirports([]);
		setSearchQuery('');
		setSaveError(null);
		onClose();
	};

	const minAirports = 5;
	const isValid = testName.trim() && selectedAirports.length >= minAirports;

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCancel}
			title="Create Custom Test"
			headerActions={
				<>
					<button
						onClick={handleCancel}
						disabled={isSaving}
						className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						disabled={!isValid || isSaving}
						className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
					>
						{isSaving ? 'Saving...' : 'Save'}
					</button>
				</>
			}
		>
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

				{/* Anonymous Toggle (only shown when public) */}
				{isPublic && (
					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="is-anonymous" className="text-sm font-medium text-gray-700">
								Anonymous
							</label>
							<button
								id="is-anonymous"
								type="button"
								onClick={() => setIsAnonymous(!isAnonymous)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
									isAnonymous ? 'bg-indigo-600' : 'bg-gray-200'
								}`}
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
										isAnonymous ? 'translate-x-6' : 'translate-x-1'
									}`}
								/>
							</button>
						</div>
						<p className="text-xs text-gray-500 mt-1">
							{isAnonymous ? 'Your name will not be shown' : 'Your name will be shown as the creator'}
						</p>
					</div>
				)}

				{/* Airport Selection */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-3">
						Select Airports
					</label>

					{/* Search Box */}
					<div className="relative">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search by code, city, or name..."
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
						{isSearching && (
							<div className="absolute right-3 top-3 text-gray-400">
								Searching...
							</div>
						)}
						{duplicateMessage && (
							<div className="absolute right-3 top-3 text-orange-600 text-sm">
								{duplicateMessage}
							</div>
						)}

						{/* Search Results Dropdown */}
						{showDropdown && (
							<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
								{searchResults.length === 0 ? (
									<div className="px-3 py-2 text-gray-500 text-sm">No results found</div>
								) : (
									searchResults.map((airport) => (
										<button
											key={airport.id}
											onClick={() => handleAddAirport(airport)}
											className="w-full px-3 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
										>
											<div className="font-medium text-gray-900">
												{airport.iataCode} - {airport.airportName}
											</div>
											<div className="text-sm text-gray-600">
												{airport.city}, {airport.country}
											</div>
										</button>
									))
								)}
							</div>
						)}
					</div>

					{/* Selected Airports List */}
					<div className="mt-3 border border-gray-300 rounded-lg p-3">
						<div className={`text-sm font-medium mb-2 ${selectedAirports.length < minAirports ? 'text-red-600' : 'text-green-600'}`}>
							{selectedAirports.length} airport{selectedAirports.length !== 1 ? 's' : ''} selected
							{selectedAirports.length < minAirports && ` (need ${minAirports - selectedAirports.length} more)`}
						</div>
						<div className="h-40 overflow-y-auto">
							{selectedAirports.length === 0 ? (
								<div className="text-gray-500 text-sm">No airports selected</div>
							) : (
								<div className="space-y-1">
									{selectedAirports.map((airport) => (
										<div
											key={airport.id}
											className="flex items-center justify-between px-2 py-1 bg-gray-50 rounded hover:bg-gray-100"
										>
											<div className="text-sm">
												<span className="font-medium">{airport.iataCode}</span> - {airport.city}, {airport.country}
											</div>
											<button
												onClick={() => handleRemoveAirport(airport.id)}
												className="text-red-600 hover:text-red-800 font-bold"
											>
												×
											</button>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
					{selectedAirports.length < minAirports && (
						<p className="text-xs text-red-600 mt-2">Select at least {minAirports} airports to create a test</p>
					)}
				</div>

				{/* Error Message */}
				{saveError && (
					<div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
						{saveError}
					</div>
				)}
			</div>
		</Modal>
	);
}
