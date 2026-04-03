import { useState } from 'react';
import { useAuth } from "./provider/authProvider.jsx";
import api from "./api/axiosConfig.js";

function LipstickForm({ onLipstickAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [finishType, setFinishType] = useState('');
    const [skinType, setSkinType] = useState('');
    const [copies, setCopies] = useState(1);
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <p style={{ color: 'red' }}>Access Denied</p>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLipstick = {
            title,
            price: parseFloat(price),
            finishType,
            skinType,
            copies: parseInt(copies)
        };

        api.post('/api/rest/lipsticks', newLipstick)
            .then(response => {
                console.log("Lipstick saved:", response.data);
                alert("Lipstick Saved!");
                onLipstickAdded(response.data);
                // Clear the form
                setTitle('');
                setPrice(0);
                setFinishType('');
                setSkinType('');
                setCopies(1);
            })
            .catch(err => {
                console.error("Error saving lipstick:", err);
                console.error("Error response:", err.response?.data);
                alert("Failed to save lipstick: " + (err.response?.data?.message || err.message));
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{
            border: '2px solid #ff69b4',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: '#fff0f5'
        }}>
            <h3 style={{ color: '#d43f7a', marginTop: 0 }}>Add New Lipstick</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ flex: 2, padding: '8px' }}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    step="0.01"
                    style={{ width: '100px', padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Finish Type (matte, gloss, satin)"
                    value={finishType}
                    onChange={(e) => setFinishType(e.target.value)}
                    required
                    style={{ flex: 1, padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Skin Type (dry, oily, combination)"
                    value={skinType}
                    onChange={(e) => setSkinType(e.target.value)}
                    required
                    style={{ flex: 1, padding: '8px' }}
                />
                <input
                    type="number"
                    placeholder="Copies"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                    required
                    min="1"
                    style={{ width: '80px', padding: '8px' }}
                />
                <button type="submit" style={{
                    backgroundColor: '#d43f7a',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Save to Database
                </button>
            </div>
        </form>
    );
}

export default LipstickForm;