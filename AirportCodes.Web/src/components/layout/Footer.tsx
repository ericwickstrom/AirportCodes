export default function Footer() {
	return (
		<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 mt-auto">
			<div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
				<p>&copy; {new Date().getFullYear()} AirportCodes. All rights reserved.</p>
			</div>
		</footer>
	);
}
