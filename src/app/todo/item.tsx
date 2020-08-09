import React, { useState, useCallback } from 'react';
import { ITodoItem } from './interfaces';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBox from '@material-ui/core/Checkbox';

export interface ITodoItemProps extends ITodoItem {
	onCompletedStatusChange: (id: string, isCompleted: boolean) => void;
	onDelete: (id: string) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = React.memo(props => {
	const [isHovering, setHovering] = useState(false);

	const handleMouseEnter = useCallback(() => {
		setHovering(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHovering(false);
	}, []);

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<ListItem>
				<ListItemAvatar>
					<CheckBox
						checked={props.isCompleted}
						onChange={event =>
							props.onCompletedStatusChange(props.id, event.target.checked)
						}
					/>
				</ListItemAvatar>

				<ListItemText
					primary={props.title}
					secondary={props.createdAt.toLocaleString()}
					style={
						props.isCompleted ? { textDecorationLine: 'line-through' } : {}
					}
				/>

				{isHovering && (
					<ListItemSecondaryAction>
						<IconButton
							onClick={() => props.onDelete(props.id)}
							edge="end"
							aria-label="delete"
						>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				)}
			</ListItem>
		</div>
	);
});
