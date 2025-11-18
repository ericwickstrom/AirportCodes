import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function Header() {
	const { isAuthenticated, user, logout } = useAuthStore();

	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="text-2xl font-bold text-indigo-600">
					AirportCodes
				</Link>

				<nav className="flex items-center gap-6">
					<Link to="/learning" className="text-gray-700 hover:text-indigo-600 font-medium">
						Learning
					</Link>
					<Link to="/test" className="text-gray-700 hover:text-indigo-600 font-medium">
						Test
					</Link>

					{isAuthenticated ? (
						<>
							<Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">
								Dashboard
							</Link>
							<div className="flex items-center gap-3">
								<span className="text-sm text-gray-600">{user?.email}</span>
								<button
									onClick={logout}
									className="text-sm text-gray-700 hover:text-indigo-600 font-medium"
								>
									Logout
								</button>
							</div>
						</>
					) : (
						<>
							<Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
								Login
							</Link>
							<Link
								to="/register"
								className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
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
