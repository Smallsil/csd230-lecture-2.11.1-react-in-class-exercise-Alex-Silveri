import { useState } from 'react';

function Lipstick({ id, title, price, finishType, skinType, copies, onDelete, onUpdate }) {
    // Local state for "Edit Mode"
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempFinishType, setTempFinishType] = useState(finishType);
    const [tempSkinType, setTempSkinType] = useState(skinType);
    const [tempCopies, setTempCopies] = useState(copies);

    // Handle Save
    const handleSave = () => {
        const updatedLipstick = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            finishType: tempFinishType,
            skinType: tempSkinType,
            copies: parseInt(tempCopies) || 1
        };

        onUpdate(id, updatedLipstick);
        setIsEditing(false);
    };

    // EDIT MODE
    if (isEditing) {
        return (
            <div className="lipstick-row editing" style={{
                border: '2px solid #ff69b4',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                backgroundColor: '#fff0f5'
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
                    type="text"
                    value={tempFinishType}
                    onChange={(e) => setTempFinishType(e.target.value)}
                    style={{ flex: 1, padding: '5px' }}
                    placeholder="Finish Type (matte, gloss, etc.)"
                />
                <input
                    type="text"
                    value={tempSkinType}
                    onChange={(e) => setTempSkinType(e.target.value)}
                    style={{ flex: 1, padding: '5px' }}
                    placeholder="Skin Type"
                />
                <input
                    type="number"
                    value={tempCopies}
                    onChange={(e) => setTempCopies(e.target.value)}
                    style={{ width: '60px', padding: '5px' }}
                    placeholder="Copies"
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
        <div className="lipstick-row" style={{
            border: '1px solid #ffb6c1',
            margin: '10px 0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff9f9'
        }}>
            <div className="lipstick-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>💄 {title}</h3>
                <p style={{ margin: '3px 0', color: '#555' }}>
                    <strong>Price:</strong> ${price?.toFixed(2)} |
                    <strong> Finish:</strong> {finishType} |
                    <strong> Skin:</strong> {skinType} |
                    <strong> Copies:</strong> {copies}
                </p>
            </div>

            <div className="lipstick-actions">
                <button onClick={() => setIsEditing(true)} style={{
                    backgroundColor: '#ffc107',
                    border: 'none',
                    padding: '8px 16px',
                    marginRight: '5px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: '#333',
                    fontWeight: 'bold'
                }}>
                    Edit
                </button>
                <button onClick={() => onDelete(id)} style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Lipstick;