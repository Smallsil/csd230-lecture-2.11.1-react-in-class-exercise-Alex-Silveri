import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './NavBar';
import Home from './Home';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Lipstick from './Lipstick';
import LipstickForm from './LipstickForm';
import Cart from './Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuth } from './provider/authProvider';
import api from './api/axiosConfig';
import './App.css';

function App() {
    const { token } = useAuth();

    // State for all inventories
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [lipsticks, setLipsticks] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Load all data when token is available
    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const loadInitialData = async () => {
            try {
                const [booksRes, magazinesRes, lipsticksRes, cartRes] = await Promise.all([
                    api.get('/api/books'),
                    api.get('/api/magazines'),
                    api.get('/api/lipsticks'),
                    api.get('/api/cart')
                ]);
                setBooks(booksRes.data);
                setMagazines(magazinesRes.data);
                setLipsticks(lipsticksRes.data);
                setCartCount(cartRes.data.products?.length || 0);
            } catch (err) {
                console.error("Failed to load data", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [token]);

    // Add to cart function
    const handleAddToCart = async (productId, productType) => {
        try {
            const res = await api.post(`/api/cart/add/${productId}?type=${productType}`);
            setCartCount(res.data.products.length);
            alert("Added to cart!");
        } catch (err) {
            console.error("Cart error:", err);
            alert("Error adding to cart");
        }
    };

    // ========== BOOK CRUD ==========
    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    const handleDeleteBook = async (id) => {
        if (!window.confirm("Delete this book?")) return;
        try {
            await api.delete(`/api/books/${id}`);
            setBooks(books.filter(b => b.id !== id));
            alert("Book deleted!");
        } catch (err) {
            console.error("Error deleting book:", err);
            alert("Failed to delete book");
        }
    };

    const handleUpdateBook = async (id, updatedData) => {
        try {
            const res = await api.put(`/api/books/${id}`, updatedData);
            setBooks(books.map(b => (b.id === id ? res.data : b)));
            alert("Book updated!");
        } catch (err) {
            console.error("Error updating book:", err);
            alert("Failed to update book");
        }
    };

    // ========== MAGAZINE CRUD ==========
    const handleAddMagazine = (newMagazine) => {
        setMagazines([...magazines, newMagazine]);
    };

    const handleDeleteMagazine = async (id) => {
        if (!window.confirm("Delete this magazine?")) return;
        try {
            await api.delete(`/api/magazines/${id}`);
            setMagazines(magazines.filter(m => m.id !== id));
            alert("Magazine deleted!");
        } catch (err) {
            console.error("Error deleting magazine:", err);
            alert("Failed to delete magazine");
        }
    };

    const handleUpdateMagazine = async (id, updatedData) => {
        try {
            const res = await api.put(`/api/magazines/${id}`, updatedData);
            setMagazines(magazines.map(m => (m.id === id ? res.data : m)));
            alert("Magazine updated!");
        } catch (err) {
            console.error("Error updating magazine:", err);
            alert("Failed to update magazine");
        }
    };

    // ========== LIPSTICK CRUD ==========
    const handleAddLipstick = (newLipstick) => {
        setLipsticks([...lipsticks, newLipstick]);
    };

    const handleDeleteLipstick = async (id) => {
        if (!window.confirm("Delete this lipstick?")) return;
        try {
            await api.delete(`/api/lipsticks/${id}`);
            setLipsticks(lipsticks.filter(l => l.id !== id));
            alert("Lipstick deleted!");
        } catch (err) {
            console.error("Error deleting lipstick:", err);
            alert("Failed to delete lipstick");
        }
    };

    const handleUpdateLipstick = async (id, updatedData) => {
        try {
            const res = await api.put(`/api/lipsticks/${id}`, updatedData);
            setLipsticks(lipsticks.map(l => (l.id === id ? res.data : l)));
            alert("Lipstick updated!");
        } catch (err) {
            console.error("Error updating lipstick:", err);
            alert("Failed to update lipstick");
        }
    };

    if (loading) return <h2>Loading Bookstore...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            {token && <Navbar cartCount={cartCount} />}

            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
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
                                        onAddToCart={(id) => handleAddToCart(id, 'book')}
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

                    {/* Magazines Inventory */}
                    <Route path="/magazines" element={
                        <div className="magazine-list">
                            <h1 style={{ color: '#17a2b8' }}>📰 Magazine Inventory</h1>
                            {magazines.length === 0 ? (
                                <p>No magazines found. Add some!</p>
                            ) : (
                                magazines.map((m) => (
                                    <Magazine
                                        key={m.id}
                                        {...m}
                                        onDelete={handleDeleteMagazine}
                                        onUpdate={handleUpdateMagazine}
                                        onAddToCart={(id) => handleAddToCart(id, 'magazine')}
                                    />
                                ))
                            )}
                        </div>
                    } />

                    {/* Add Magazine */}
                    <Route path="/add-magazine" element={
                        <div>
                            <h1 style={{ color: '#17a2b8' }}>📰 Add New Magazine</h1>
                            <MagazineForm onMagazineAdded={handleAddMagazine} />
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
                                        onAddToCart={(id) => handleAddToCart(id, 'lipstick')}
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

                    {/* Cart */}
                    <Route path="/cart" element={
                        <Cart api={api} onCartChange={(count) => setCartCount(count)} />
                    } />

                    {/* Logout */}
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;