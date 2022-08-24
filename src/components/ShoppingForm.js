import React, { useState, useEffect } from 'react';
import './ShoppingForm.css';
import List from './List';
import Alert from './Alert';

// get list item from local storage
const getLocalStorage = () => {
	let list = localStorage.getItem('list');
	if (list) {
		return (list = JSON.parse(localStorage.getItem('list')));
	} else {
		return [];
	}
};
const ShoppingForm = () => {
	const [items, setItems] = useState('');
	const [list, setList] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!items) {
			showAlert(true, 'danger', 'Please enter value');
		} else if (items && isEditing) {
			setList(
				list.map((item) => {
					if (item.id === editID) {
						return { ...item, title: items };
					}
					return item;
				})
			);
			setItems('');
			setEditID(null);
			setIsEditing(false);
			showAlert(true, 'success', 'Value changed');
		} else {
			showAlert(true, 'success', 'Item added to the list');
			const newItem = {
				id: new Date().getTime().toString(),
				title: items,
			};

			setList([...list, newItem]);
			setItems('');
		}
	};

	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg });
	};
	const clearList = () => {
		showAlert(true, 'danger', 'Empty list');
		setList([]);
	};
	const removeItem = (id) => {
		showAlert(true, 'danger', 'Item removed');
		setList(list.filter((item) => item.id !== id));
	};
	const editItem = (id) => {
		const specificItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setItems(specificItem.title);
	};
	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	}, [list]);
	return (
		<section className='section-center'>
			<form className='shopping-form' onSubmit={handleSubmit}>
				{alert.show && (
					<Alert {...alert} removeAlert={showAlert} list={list} />
				)}

				<h2>Add Shopping List</h2>
				<div className='form-control'>
					<input
						type='text'
						className='shopping'
						placeholder='Add item'
						value={items}
						onChange={(e) => setItems(e.target.value)}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit item'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='shopping-container'>
					<List
						items={list}
						removeItem={removeItem}
						editItem={editItem}
					/>
					<button className='clear-btn' onClick={clearList}>
						Clear all items
					</button>
				</div>
			)}
		</section>
	);
};

export default ShoppingForm;
