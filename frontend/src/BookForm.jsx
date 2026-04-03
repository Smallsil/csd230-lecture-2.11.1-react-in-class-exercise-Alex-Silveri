import { useState } from 'react';
import api from './api/axiosConfig';

function BookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = { title, author, price, copies };

        api.post('/api/rest/books', newBook)  // FIXED: Added /rest/
            .then(response => {
                alert("Book Saved!");
                onBookAdded(response.data);
                setTitle('');
                setAuthor('');
                setPrice(0);
                setCopies(1);
            })
            .catch(err => {
                console.error("Error saving book:", err);
                alert("Failed to save book");
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Book</h3>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <button type="submit">Save to Database</button>
        </form>
    );
}

export default BookForm;