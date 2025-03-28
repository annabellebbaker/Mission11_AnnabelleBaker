import { useNavigate } from 'react-router-dom'; // this is used to navigate between pages
import { useCart } from '../context/CartContext'; // import the useCart hook

const CartSummary = () => {
  const navigate = useNavigate(); // this is used to navigate between pages
  const { cart } = useCart(); // useCart hook to get the cart items
  const totalAmount = cart.reduce((sum, item) => sum + item.donationAmount, 0);

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
        boxShadow: '0 2p 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
