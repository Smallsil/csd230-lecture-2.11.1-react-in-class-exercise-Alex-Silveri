import { useState, useEffect } from 'react';

function Cart({ api, onCartChange }) {
    const [cart, setCart] = useState({ products: [], total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const response = await api.get('/api/cart');
            setCart(response.data);
            if (onCartChange) {
                onCartChange(response.data.products.length);
            }
        } catch (err) {
            console.error("Error loading cart:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await api.delete(`/api/cart/remove/${productId}`);
            await loadCart();
            alert("Item removed from cart!");
        } catch (err) {
            alert("Error removing item");
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm("Clear entire cart?")) return;
        try {
            await api.delete('/api/cart/clear');
            await loadCart();
            alert("Cart cleared!");
        } catch (err) {
            alert("Error clearing cart");
        }
    };

    if (loading) return <h2>Loading cart...</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>🛒 Shopping Cart</h1>
            {cart.products.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.products.map((product, index) => (
                        <div key={index} style={{
                            border: '1px solid #ddd',
                            margin: '10px 0',
                            padding: '15px',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h3>{product.title || product.name || 'Product'}</h3>
                                <p>Price: ${(product.price || 0).toFixed(2)}</p>
                                <p>Type: {product.productType || 'General'}</p>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(product.id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <h3>Total: ${cart.total.toFixed(2)}</h3>
                        <button
                            onClick={handleClearCart}
                            style={{
                                backgroundColor: '#ffc107',
                                color: '#333',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;