import { ITodoItem } from './interfaces';

export const loadPersistentData = async (): Promise<ITodoItem[]> => {
	const value = localStorage.getItem('todos');
	if (!value) {
		return [];
	}

	try {
		return (JSON.parse(value) as any[]).map(e => ({
			...e,
			createdAt: new Date(e.createdAt),
			updatedAt: new Date(e.updatedAt),
		}));
	} catch (e) {}

	return [];
};

export const savePersistentData = (todos: ITodoItem[]) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};
