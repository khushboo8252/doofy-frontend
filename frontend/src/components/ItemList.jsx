import React from 'react';

function ItemList({ items, deleteItem, editItem }) {
    return (
        <div className="mb-4">
            <h2 className='text-center'>Inventory List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-primary btn-sm "
                                    onClick={() => editItem(item)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ItemList;
