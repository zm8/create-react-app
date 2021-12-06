import create from 'zustand';
import createContext from 'zustand/context';
import React from 'react';

const { Provider, useStore } = createContext();

const createStore = (initialBears) => () =>
	create((set) => ({
		bears: initialBears,
		increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
		removeAllBears: () => set({ bears: 0 }),
	}));

const Button = () => {
	return (
		<Provider createStore={createStore}>
			<ButtonChild />
		</Provider>
	);
};

const ButtonChild = () => {
	const state = useStore();
	return (
		<div>
			{state.bears}
			<button
				onClick={() => {
					state.increasePopulation();
				}}
			>
				+
			</button>
		</div>
	);
};

export default Button;
