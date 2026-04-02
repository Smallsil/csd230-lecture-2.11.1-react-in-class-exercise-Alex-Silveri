import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Book({ id, title, author, price, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempAuthor, setTempAuthor] = useState(author);
    const [tempPrice, setTempPrice] = useState(price);

    const handleSave = () => {
        const updatedBook = {
            id,
            title: tempTitle,
            author: tempAuthor,
            price: parseFloat(tempPrice),
            copies: 10
        };
        onUpdate(id, updatedBook);
        setIsEditing(false);
    };

    // EDIT MODE - Styled like Lipstick and Magazine edit mode
    if (isEditing) {
        return (
            <div className="book-row editing" style={{
                border: '2px solid #007bff',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                backgroundColor: '#e7f1ff'
            }}>
                <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    style={{ flex: 2, padding: '5px' }}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={tempAuthor}
                    onChange={(e) => setTempAuthor(e.target.value)}
                    style={{ flex: 1, padding: '5px' }}
                    placeholder="Author"
                />
                <input
                    type="number"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    style={{ width: '100px', padding: '5px' }}
                    placeholder="Price"
                    step="0.01"
                />
                <button onClick={handleSave} style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Save
                </button>
                <button onClick={() => setIsEditing(false)} style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Cancel
                </button>
            </div>
        );
    }

    // VIEW MODE - Styled like Lipstick and Magazine view mode
    return (
        <div className="book-row" style={{
            border: '1px solid #007bff',
            margin: '10px 0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f9fa'
        }}>
            <div className="book-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>📚 {title}</h3>
                <p style={{ margin: '3px 0', color: '#555' }}>
                    <strong>Author:</strong> {author} |
                    <strong> Price:</strong> ${Number(price).toFixed(2)}
                </p>
            </div>

            <div className="book-actions">
                <button
                    onClick={() => onAddToCart(id)}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        marginRight: '5px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    🛒 Add to Cart
                </button>
                {isAdmin && (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            style={{
                                backgroundColor: '#ffc107',
                                border: 'none',
                                padding: '8px 16px',
                                marginRight: '5px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: '#333',
                                fontWeight: 'bold'
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(id)}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Book;