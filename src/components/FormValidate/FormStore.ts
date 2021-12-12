import createContext from 'zustand/context';
import { produce } from 'immer';
import type { Draft } from 'immer';
import create, {
	GetState,
	SetState,
	State,
	StateCreator,
	StoreApi,
} from 'zustand';
import _ from 'lodash';

const immer =
	<
		T extends State,
		CustomSetState extends SetState<T>,
		CustomGetState extends GetState<T>,
		CustomStoreApi extends StoreApi<T>
	>(
		config: StateCreator<
			T,
			(
				partial: ((draft: Draft<T>) => void) | T,
				replace?: boolean
			) => void,
			CustomGetState,
			CustomStoreApi
		>
	): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
	(set, get, api) =>
		config(
			(partial, replace) => {
				const nextState =
					typeof partial === 'function'
						? produce(partial as (state: Draft<T>) => T)
						: (partial as T);
				return set(nextState, replace);
			},
			get,
			api
		);

interface Model {
	name: string;
	value?: string;
	errorMsg?: string;
	status?: string;
	rule?: (value?: string) => string | undefined;
}

interface FormState {
	models: Model[];
	register: (arr: Model[]) => void;
	getModel: (name: string) => Model | undefined;
	setValue: (name: string, value: string) => void;
	triggerValid: (name: string) => void;
	setModelValue: (name: string, value: Omit<Model, 'name'>) => void;
	resetOtherModel: (name: string) => void;
}

const { Provider, useStore } = createContext<FormState>();

const findModel = (state: FormState, name: string) =>
	_.find(state.models, { name });

const createStore = () => {
	const store = create<FormState>(
		immer((set, get) => ({
			models: [],
			register: (arr = []) => {
				set((state) => {
					arr.forEach((item) => {
						state.models.push({
							value: '',
							errorMsg: '', // 错误信息
							status: '', // '', 'loading', 'success', 'error'
							rule: () => undefined,
							...item,
						});
					});
				});
			},
			getModel: (name) => {
				return findModel(get(), name);
			},
			setValue: (name, value) => {
				set((state) => {
					const model = findModel(state, name);
					model && (model.value = value);
				});
			},
			setModelValue: (name, obj) => {
				set((state) => {
					const model = findModel(state, name);
					model && _.assign(model, obj);
				});
			},
			resetOtherModel: (curName: string) => {
				const { setModelValue } = store.getState();
				get().models.forEach(({ name }) => {
					if (curName === name) return;
					setModelValue(name, {
						status: '',
						errorMsg: '',
					});
				});
			},
			triggerValid: async (name) => {
				const { setModelValue, resetOtherModel } = store.getState();
				try {
					const model = findModel(get(), name);
					if (!model) return;
					// rule 是 Promise 函数才进行设置 loading
					// setModelValue(name, {
					// 	status: 'loading',
					// 	errorMsg: '',
					// });
					const { rule, value } = model;
					const errorMsg = await rule!(value);
					setModelValue(name, {
						status: errorMsg ? 'error' : 'success',
						errorMsg,
					});
					if (errorMsg) {
						resetOtherModel(name);
						return false;
					}
					return true;
				} catch (err: any) {
					setModelValue(name, {
						status: 'error',
						errorMsg: err.message || '网络错误',
					});
					return false;
				}
			},
		}))
	);
	return store;
};

export { Provider, useStore, createStore };
