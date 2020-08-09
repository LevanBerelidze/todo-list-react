import React, { useState, useCallback } from 'react';
import { ITodoItem } from './interfaces';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { v4 as generateUuid } from 'uuid';

export interface IAddTodoItemProps {
	onSubmit: (item: ITodoItem) => void;
	onCancel: () => void;
}

const modalStyle = {
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	outline: 0,
};

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export const AddTodoItem: React.FC<IAddTodoItemProps> = props => {
	const { onSubmit } = props;

	const classes = useStyles();
	const [title, setTitle] = useState('');

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			setTitle(event.target.value);
		},
		[]
	);

	const handleAdd = useCallback(() => {
		onSubmit({
			id: generateUuid(),
			title,
			isCompleted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}, [title, onSubmit]);

	return (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Create new task</h2>

			<TextField
				style={{ marginBottom: '24px', width: '100%' }}
				id="standard-basic"
				label="Title"
				value={title}
				onChange={handleTitleChange}
			/>

			<div style={{ display: 'block' }}>
				<Button
					style={{ display: 'inline', marginInlineEnd: '4px' }}
					variant="contained"
					onClick={props.onCancel}
				>
					Cancel
				</Button>
				<Button
					style={{ display: 'inline' }}
					variant="contained"
					color="primary"
					onClick={handleAdd}
				>
					Save
				</Button>
			</div>
		</div>
	);
};
