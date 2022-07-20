import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './List.css';
const List = ({ items, removeItem, editItem }) => {
	return (
		<div className='shopping-list'>
			{items.map((item) => {
				const { id, title } = item;
				return (
					<article className='shopping-item' key={id}>
						<p className='title'>{title}</p>
						<div className='btn-container'>
							<button
								type='button'
								className='edit-btn'
								onClick={() => editItem(id)}
							>
								<FaEdit />
							</button>
							<button
								type='button'
								className='delete-btn'
								onClick={() => removeItem(id)}
							>
								<FaTrash />
								ya
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default List;
