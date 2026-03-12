import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#222',
            color: 'white',
            marginBottom: '20px',
            display: 'flex',
            gap: '20px',
            borderRadius: '8px',
            flexWrap: 'wrap'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</Link>
            <Link to="/inventory" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📚 Books</Link>
            <Link to="/add" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>➕ Add Book</Link>
            <Link to="/lipsticks" style={{ color: '#ff99cc', textDecoration: 'none', fontWeight: 'bold' }}>💄 Lipsticks</Link>
            <Link to="/add-lipstick" style={{ color: '#ff99cc', textDecoration: 'none', fontWeight: 'bold' }}>➕ Add Lipstick</Link>
        </nav>
    );
}

export default Navbar;