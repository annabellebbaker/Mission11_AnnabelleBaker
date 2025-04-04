import { useNavigate } from 'react-router-dom';
import { cartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';
import { useEffect } from 'react';
// bootstrap import

function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    console.log("Cart updated:", cart);
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
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: cartItem) => (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary btn-sm me-1"
                        onClick={() => updateQuantity(item.bookID, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-outline-secondary btn-sm ms-1"
                        onClick={() => updateQuantity(item.bookID, item.quantity + 1)}
                      >
                        +
                      </button>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
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

        {cart.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <div>
              <button className="btn btn-primary me-2">Checkout</button>
              <button className="btn btn-secondary" onClick={() => navigate("/books")}>
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;