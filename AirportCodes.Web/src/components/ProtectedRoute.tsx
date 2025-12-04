import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isLoading = useAuthStore((state) => state.isLoading);

	// Show nothing while checking authentication
	if (isLoading) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}
