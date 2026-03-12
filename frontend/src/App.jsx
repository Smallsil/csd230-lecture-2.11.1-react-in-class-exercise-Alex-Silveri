import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Lipstick from './Lipstick'
import LipstickForm from './LipstickForm'
import './App.css'

function App() {
    // Books state
    const [books, setBooks] = useState([]);
    const [booksLoading, setBooksLoading] = useState(true);

    // Lipsticks state
    const [lipsticks, setLipsticks] = useState([]);
    const [lipsticksLoading, setLipsticksLoading] = useState(true);

    // Fetch books
    useEffect(() => {
        fetch('/api/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setBooksLoading(false);
            });
    }, []);

    // Fetch lipsticks
    useEffect(() => {
        fetch('/api/lipsticks')
            .then(res => res.json())
            .then(data => {
                setLipsticks(data);
                setLipsticksLoading(false);
            });
    }, []);

    // Book CRUD
    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    const handleDeleteBook = (id) => {
        if (!window.confirm("Delete this book?")) return;
        fetch(`/api/books/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setBooks(books.filter(b => b.id !== id));
            });
    };

    const handleUpdateBook = (id, updatedData) => {
        fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedBook => {
                setBooks(books.map(b => (b.id === id ? savedBook : b)));
            });
    };

    // Lipstick CRUD
    const handleAddLipstick = (newLipstick) => {
        setLipsticks([...lipsticks, newLipstick]);
    };

    const handleDeleteLipstick = (id) => {
        if (!window.confirm("Delete this lipstick?")) return;
        fetch(`/api/lipsticks/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setLipsticks(lipsticks.filter(l => l.id !== id));
            });
    };

    const handleUpdateLipstick = (id, updatedData) => {
        fetch(`/api/lipsticks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedLipstick => {
                setLipsticks(lipsticks.map(l => (l.id === id ? savedLipstick : l)));
            });
    };

    if (booksLoading || lipsticksLoading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <Navbar />

            <Routes>
                {/* Home Page */}
                <Route path="/" element={<Home />} />

                {/* Books Inventory */}
                <Route path="/inventory" element={
                    <div className="book-list">
                        <h1>📚 Book Inventory</h1>
                        {books.length === 0 ? (
                            <p>No books found. Add some!</p>
                        ) : (
                            books.map((b) => (
                                <Book
                                    key={b.id}
                                    {...b}
                                    onDelete={handleDeleteBook}
                                    onUpdate={handleUpdateBook}
                                />
                            ))
                        )}
                    </div>
                } />

                {/* Add Book */}
                <Route path="/add" element={
                    <div>
                        <h1>📚 Add New Book</h1>
                        <BookForm onBookAdded={handleAddBook} />
                    </div>
                } />

                {/* Lipsticks Inventory */}
                <Route path="/lipsticks" element={
                    <div className="lipstick-list">
                        <h1 style={{ color: '#d43f7a' }}>💄 Lipstick Inventory</h1>
                        {lipsticks.length === 0 ? (
                            <p>No lipsticks found. Add some!</p>
                        ) : (
                            lipsticks.map((l) => (
                                <Lipstick
                                    key={l.id}
                                    {...l}
                                    onDelete={handleDeleteLipstick}
                                    onUpdate={handleUpdateLipstick}
                                />
                            ))
                        )}
                    </div>
                } />

                {/* Add Lipstick */}
                <Route path="/add-lipstick" element={
                    <div>
                        <h1 style={{ color: '#d43f7a' }}>💄 Add New Lipstick</h1>
                        <LipstickForm onLipstickAdded={handleAddLipstick} />
                    </div>
                } />
            </Routes>
        </div>
    )
}

export default App;