import { useState } from 'react'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-bold text-gray-900">AirportCodes</h1>
					<p className="text-gray-600">Vite + React + TypeScript + Tailwind CSS v4</p>
				</div>

				<div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 space-y-3">
					<div className="flex items-center gap-2">
						<svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
						<h2 className="text-xl font-semibold text-green-800">Tailwind CSS is working!</h2>
					</div>
					<p className="text-green-700 text-sm">
						If you can see this styled card with colors, gradients, spacing, and shadows, Tailwind CSS v4 is correctly installed.
					</p>
				</div>

				<div className="space-y-4">
					<div className="flex gap-4">
						<div className="flex-1 bg-blue-500 text-white p-4 rounded-lg text-center font-semibold">
							Primary
						</div>
						<div className="flex-1 bg-purple-500 text-white p-4 rounded-lg text-center font-semibold">
							Secondary
						</div>
						<div className="flex-1 bg-amber-500 text-white p-4 rounded-lg text-center font-semibold">
							Accent
						</div>
					</div>

					<button
						onClick={() => setCount((count) => count + 1)}
						className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
					>
						Counter: {count}
					</button>

					<div className="grid grid-cols-2 gap-3 text-sm">
						<div className="bg-gray-100 p-3 rounded">
							<div className="font-semibold text-gray-700">Responsive</div>
							<div className="text-gray-500">✓ Working</div>
						</div>
						<div className="bg-gray-100 p-3 rounded">
							<div className="font-semibold text-gray-700">Flexbox</div>
							<div className="text-gray-500">✓ Working</div>
						</div>
						<div className="bg-gray-100 p-3 rounded">
							<div className="font-semibold text-gray-700">Grid</div>
							<div className="text-gray-500">✓ Working</div>
						</div>
						<div className="bg-gray-100 p-3 rounded">
							<div className="font-semibold text-gray-700">Transitions</div>
							<div className="text-gray-500">✓ Working</div>
						</div>
					</div>
				</div>

				<div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
					Ready to build the airport codes learning app
				</div>
			</div>
		</div>
	)
}

export default App
