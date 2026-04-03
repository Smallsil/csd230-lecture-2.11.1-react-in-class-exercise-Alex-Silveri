import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Magazine({ id, title, price, copies, orderQty, currentIssue, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();

    const formatIssueDate = (issue) => {
        if (!issue) return '';
        return typeof issue === 'string' ? issue.slice(0, 16) : '';
    };

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title || '');
    const [tempPrice, setTempPrice] = useState(price || 0);
    const [tempCopies, setTempCopies] = useState(copies || 0);  // Ensure default is 0
    const [tempOrder, setTempOrder] = useState(orderQty || 0);
    const [tempIssue, setTempIssue] = useState(formatIssueDate(currentIssue));

    const handleSave = () => {
        const updatedData = {
            id: id,
            title: tempTitle,
            price: parseFloat(tempPrice) || 0,
            copies: Number(tempCopies) || 0,  // Force to number
            orderQty: parseInt(tempOrder) || 0,
            currentIssue: tempIssue && tempIssue.length === 16 ? tempIssue + ":00" : tempIssue
        };
        console.log("Saving magazine with copies:", updatedData.copies);
        onUpdate(id, updatedData);
        setIsEditing(false);
    };

    // EDIT MODE
    if (isEditing) {
        return (
            <div className="magazine-row editing" style={{
                border: '2px solid #17a2b8',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                backgroundColor: '#e3f2fd'
            }}>
                <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    style={{ flex: 2, padding: '5px' }}
                    placeholder="Title"
                />
                <input
                    type="number"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    style={{ width: '80px', padding: '5px' }}
                    placeholder="Price"
                    step="0.01"
                />
                <input
                    type="number"
                    value={tempCopies}
                    onChange={(e) => setTempCopies(e.target.value)}
                    style={{ width: '80px', padding: '5px' }}
                    placeholder="Copies"
                />
                <input
                    type="number"
                    value={tempOrder}
                    onChange={(e) => setTempOrder(e.target.value)}
                    style={{ width: '100px', padding: '5px' }}
                    placeholder="Order Qty"
                />
                <input
                    type="datetime-local"
                    value={tempIssue}
                    onChange={(e) => setTempIssue(e.target.value)}
                    style={{ width: '200px', padding: '5px' }}
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

    // VIEW MODE
    return (
        <div className="magazine-row" style={{
            border: '1px solid #17a2b8',
            margin: '10px 0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f8ff'
        }}>
            <div className="magazine-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>📰 {title}</h3>
                <p style={{ margin: '3px 0', color: '#555' }}>
                    <strong>Price:</strong> ${Number(price).toFixed(2)} |
                    <strong> Copies:</strong> {copies !== undefined ? copies : 0} |
                    <strong> Order Qty:</strong> {orderQty} |
                    <strong> Issue:</strong> {formatIssueDate(currentIssue).replace('T', ' ')}
                </p>
            </div>

            <div className="magazine-actions">
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

export default Magazine;
