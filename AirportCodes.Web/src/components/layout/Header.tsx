import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function Header() {
	const { isAuthenticated, user, logout } = useAuthStore();

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link to={isAuthenticated ? "/dashboard" : "/"} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
					AirportCodes
				</Link>

				<nav className="flex items-center gap-6">
					{isAuthenticated ? (
						<div className="flex items-center gap-3">
							<Link to="/settings" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
								{user?.email}
							</Link>
							<button
								onClick={logout}
								className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium cursor-pointer"
							>
								Logout
							</button>
						</div>
					) : (
						<>
							<Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
								Login
							</Link>
							<Link
								to="/register"
								className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium"
							>
								Sign Up
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
