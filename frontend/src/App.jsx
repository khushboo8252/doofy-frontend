import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const apiUrl = 'http://localhost:5000/items'; // Replace with your backend API URL

function App() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(apiUrl);
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    };

    const addItem = async (item) => {
        try {
            const response = await axios.post(apiUrl, item);
            setItems([...items, response.data]);
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const editItem = (item) => {
        setSelectedItem(item); // Pass selected item to the form
    };

    const updateItem = async (id, updatedItem) => {
        try {
            const response = await axios.put(`${apiUrl}/${id}`, updatedItem);
            setItems(items.map(item => (item.id === id ? response.data : item)));
            setSelectedItem(null); // Clear the form after updating
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className='text-center'>Shopify Inventory</h1>
            <ItemForm
                addItem={addItem}
                updateItem={updateItem}
                selectedItem={selectedItem}
            />
            <ItemList items={items} deleteItem={deleteItem} editItem={editItem} />
        </div>
    );
}

export default App;
