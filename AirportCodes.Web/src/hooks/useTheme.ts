import { useEffect } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

/**
 * Hook that applies the current theme to the document
 * Handles light, dark, and system theme preferences
 */
export function useTheme() {
	const theme = useSettingsStore((state) => state.theme);

	useEffect(() => {
		const root = document.documentElement;

		// Handle system theme preference
		if (theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

			// Apply initial theme based on system preference
			if (mediaQuery.matches) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}

			// Listen for system theme changes
			const handleChange = (e: MediaQueryListEvent) => {
				if (e.matches) {
					root.classList.add('dark');
				} else {
					root.classList.remove('dark');
				}
			};

			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}

		// Handle explicit light/dark theme
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [theme]);

	return theme;
}
