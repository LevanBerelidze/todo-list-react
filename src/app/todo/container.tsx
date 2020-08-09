import React, { useState, useEffect, useCallback } from 'react';
import { ITodoItem } from './interfaces';
import { loadPersistentData, savePersistentData } from './data-persistance';
import { TodoList } from './list';

export const TodoListContainer: React.FC = () => {
	const [isLoaded, setLoaded] = useState(false);
	const [todos, setTodos] = useState([] as ITodoItem[]);

	useEffect(() => {
		loadPersistentData().then(data => {
			setTodos(data);
			setLoaded(true);
		});
	}, []);

	const handleItemCompletedStatusChange = useCallback(
		(id: string, isCompleted: boolean) => {
			setTodos(todos =>
				todos.map(todo => (todo.id === id ? { ...todo, isCompleted } : todo))
			);
		},
		[]
	);

	const handleItemDelete = useCallback((id: string) => {
		setTodos(todos => todos.filter(todo => todo.id !== id));
	}, []);

	const handleItemAdd = useCallback((item: ITodoItem) => {
		setTodos(todos => [...todos, item]);
	}, []);

	if (!isLoaded) {
		return <p>Loading...</p>;
	}
	savePersistentData(todos);

	return (
		<TodoList
			items={todos}
			onItemDelete={handleItemDelete}
			onItemCompletedStatusChange={handleItemCompletedStatusChange}
			onItemAdd={handleItemAdd}
		/>
	);
};
