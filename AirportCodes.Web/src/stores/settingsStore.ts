import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
	theme: 'light' | 'dark' | 'system';
	soundEnabled: boolean;
	defaultTestQuestions: number;

	// Actions
	setTheme: (theme: 'light' | 'dark' | 'system') => void;
	toggleSound: () => void;
	setDefaultTestQuestions: (count: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: 'light',
			soundEnabled: false,
			defaultTestQuestions: 10,

			setTheme: (theme) => set({ theme }),
			toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
			setDefaultTestQuestions: (count) => set({ defaultTestQuestions: count }),
		}),
		{
			name: 'settings-storage',
		}
	)
);
