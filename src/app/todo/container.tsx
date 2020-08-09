import React, { useState, useEffect, useCallback } from 'react';
import { ITodoItem } from './interfaces';
import { fetchData } from './fetch-data';
import { TodoList } from './list';

export const TodoListContainer: React.FC = () => {
	const [isLoaded, setLoaded] = useState(false);
	const [todos, setTodos] = useState([] as ITodoItem[]);

	useEffect(() => {
		fetchData().then(data => {
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

	return (
		<TodoList
			items={todos}
			onItemDelete={handleItemDelete}
			onItemCompletedStatusChange={handleItemCompletedStatusChange}
			onItemAdd={handleItemAdd}
		/>
	);
};
