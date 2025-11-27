import { useState, useEffect } from 'react';

interface TimerDisplayProps {
	timerExpiresAt: string; // ISO datetime from server
	onExpire: () => void; // Callback when timer hits 0
}

export default function TimerDisplay({ timerExpiresAt, onExpire }: TimerDisplayProps) {
	const [remainingSeconds, setRemainingSeconds] = useState(0);
	const [hasExpired, setHasExpired] = useState(false);

	useEffect(() => {
		const calculateRemaining = () => {
			const now = new Date().getTime();
			const expires = new Date(timerExpiresAt).getTime();
			const diffMs = expires - now;
			const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));
			return diffSeconds;
		};

		// Initial calculation
		const initial = calculateRemaining();
		setRemainingSeconds(initial);

		if (initial === 0 && !hasExpired) {
			setHasExpired(true);
			onExpire();
		}

		// Update every second
		const interval = setInterval(() => {
			const remaining = calculateRemaining();
			setRemainingSeconds(remaining);

			if (remaining === 0 && !hasExpired) {
				setHasExpired(true);
				onExpire();
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [timerExpiresAt, onExpire, hasExpired]);

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const getTimerClass = (): string => {
		if (remainingSeconds === 0) {
			return 'text-red-600 font-bold';
		} else if (remainingSeconds < 30) {
			return 'text-red-500 animate-pulse';
		} else if (remainingSeconds < 60) {
			return 'text-yellow-500';
		}
		return 'text-gray-700';
	};

	return (
		<div className="text-right">
			<p className="text-sm text-gray-600">Time Remaining</p>
			<p className={`text-2xl font-bold ${getTimerClass()}`}>
				{remainingSeconds === 0 ? "Time's Up!" : formatTime(remainingSeconds)}
			</p>
		</div>
	);
}
