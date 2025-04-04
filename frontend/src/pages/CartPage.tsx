import { useNavigate } from 'react-router-dom';
import { cartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';
import { useEffect } from 'react';
// bootstrap import

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2 className="mb-3">Your Cart</h2>
        <div className="table-responsive">
          {cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: cartItem) => (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <h3 className="mt-3">Total:</h3>
        <button className="btn btn-primary me-2">Checkout</button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/books')}
        >
          Continue Browsing
        </button>
      </div>
    </>
  );
}

export default CartPage;
