import { useNavigate } from 'react-router-dom'; // this is used to navigate between pages
import { useCart } from '../context/CartContext'; // import the useCart hook

const CartSummary = () => {
  const navigate = useNavigate(); // this is used to navigate between pages
  const { cart } = useCart(); // useCart hook to get the cart items
  
  // this calculates the total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); // reduce squishes everything together

  // // this calculates total items in the cart
  // const totalNumBooks = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
        marginBottom: '20px',
      }}
    >
      <button
        style={{
          background: '#007bff',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/cart')}
      >
        🛒 <strong>${totalAmount.toFixed(2)}</strong>
      </button>
    </div>
  );
};

export default CartSummary;
