import { useState } from 'react';
import { useAuth } from './provider/authProvider';
import api from './api/axiosConfig';

function MagazineForm({ onMagazineAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);
    const [orderQty, setOrderQty] = useState(1);
    const [currentIssue, setCurrentIssue] = useState('');
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <p style={{ color: 'red' }}>Access Denied</p>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMagazine = {
            title,
            price: parseFloat(price),
            copies: parseInt(copies),
            orderQty: parseInt(orderQty),
            currentIssue: currentIssue ? currentIssue + ":00" : null
        };

        api.post('/api/rest/magazines', newMagazine)
            .then(response => {
                alert("Magazine Saved!");
                onMagazineAdded(response.data);
                setTitle('');
                setPrice(0);
                setCopies(1);
                setOrderQty(1);
                setCurrentIssue('');
            })
            .catch(err => {
                console.error("Error saving magazine:", err);
                alert("Failed to save magazine");
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{
            border: '2px solid #17a2b8',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: '#e3f2fd'
        }}>
            <h3 style={{ color: '#0b5e7e', marginTop: 0 }}>📰 Add New Magazine</h3>

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
                    type="number"
                    placeholder="Copies"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                    required
                    min="1"
                    style={{ width: '80px', padding: '8px' }}
                />
                <input
                    type="number"
                    placeholder="Order Quantity"
                    value={orderQty}
                    onChange={(e) => setOrderQty(e.target.value)}
                    required
                    min="1"
                    style={{ width: '100px', padding: '8px' }}
                />
                <input
                    type="datetime-local"
                    value={currentIssue}
                    onChange={(e) => setCurrentIssue(e.target.value)}
                    style={{ width: '200px', padding: '8px' }}
                />
                <button type="submit" style={{
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Save Magazine
                </button>
            </div>
        </form>
    );
}

export default MagazineForm;