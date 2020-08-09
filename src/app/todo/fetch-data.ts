import { ITodoItem } from './interfaces';
import { v4 as generateUuid } from 'uuid';

export const fetchData = async (): Promise<ITodoItem[]> => {
	await new Promise(resolve => setTimeout(resolve, 500));
	return [
		{
			id: generateUuid(),
			title: 'React',
			isCompleted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: generateUuid(),
			title: 'Android',
			isCompleted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: generateUuid(),
			title: 'Spring',
			isCompleted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: generateUuid(),
			title: 'Node.js',
			isCompleted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];
};
