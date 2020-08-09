import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import { ITodoItem } from './interfaces';
import { TodoItem } from './item';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import { AddTodoItem } from './add';

export interface ITodoListProps {
	items: ITodoItem[];
	onItemCompletedStatusChange: (id: string, isCompleted: boolean) => void;
	onItemDelete: (id: string) => void;
	onItemAdd: (item: ITodoItem) => void;
}

export const TodoList: React.FC<ITodoListProps> = props => {
	const { onItemAdd } = props;

	const items = props.items.sort(
		(a, b) =>
			+a.isCompleted - +b.isCompleted ||
			a.createdAt.getTime() - b.createdAt.getTime()
	);

	const [isAdding, setAdding] = useState(false);

	const handleAddButtonClick = useCallback(() => {
		setAdding(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setAdding(false);
	}, []);

	const handleNewItem = useCallback(
		(newItem: ITodoItem) => {
			setAdding(false);
			onItemAdd(newItem);
		},
		[onItemAdd]
	);

	const handleNewItemCancel = useCallback(() => {
		setAdding(false);
	}, []);

	return (
		<>
			<List dense={false}>
				{items.map(todo => (
					<TodoItem
						key={todo.id}
						{...todo}
						onCompletedStatusChange={props.onItemCompletedStatusChange}
						onDelete={props.onItemDelete}
					/>
				))}
			</List>
			<IconButton onClick={handleAddButtonClick} edge="end" aria-label="delete">
				<AddIcon />
			</IconButton>
			<Modal
				open={isAdding}
				onClose={handleModalClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<AddTodoItem onSubmit={handleNewItem} onCancel={handleNewItemCancel} />
			</Modal>
		</>
	);
};
