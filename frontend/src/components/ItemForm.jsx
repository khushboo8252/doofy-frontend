import React, { useState, useEffect } from 'react';

function ItemForm({ addItem, updateItem, selectedItem }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setDescription(selectedItem.description);
            setPrice(selectedItem.price);
            setIsEditing(true);
        } else {
            clearForm();
        }
    }, [selectedItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { name, description, price: parseFloat(price) };

        if (isEditing) {
            updateItem(selectedItem.id, item);
        } else {
            addItem(item);
        }

        clearForm();
    };

    const clearForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setIsEditing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="itemName">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="itemDescription">Description</label>
                <textarea
                    className="form-control"
                    id="itemDescription"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="itemPrice">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="itemPrice"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                {isEditing ? 'Update Item' : 'Add Item'}
            </button>
            {isEditing && (
                <button
                    type="button"
                    className="btn btn-secondary mt-3 ms-3"
                    onClick={clearForm}
                >
                    Cancel Edit
                </button>
            )}
        </form>
    );
}

export default ItemForm;
