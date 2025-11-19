import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LearningMode from './pages/LearningMode';
import TestMode from './pages/TestMode';
import ConfirmationPending from './pages/ConfirmationPending';
import ConfirmEmail from './pages/ConfirmEmail';
import NotFound from './pages/NotFound';

function App() {
	const initializeAuth = useAuthStore((state) => state.initializeAuth);

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/confirmation-pending" element={<ConfirmationPending />} />
					<Route path="/confirm-email" element={<ConfirmEmail />} />
					<Route path="/learning" element={<LearningMode />} />
					<Route path="/test" element={<TestMode />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
