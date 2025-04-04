import { useNavigate } from 'react-router-dom';
import { cartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';
import { useEffect, useState } from 'react';
// ONE of the two different things using bootstrap (bootstrap BILL)
// Bootstrap Grid: Used the grid system to structure the cart page layout for better responsiveness
// Bootstrap Modal: Implemented a modal to confirm item removal ("Are you sure you want to remove this item from the cart?")

function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<cartItem | null>(null);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (item: cartItem) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.bookID);
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2 className="mb-3">Your Cart</h2>

        {/* Bootstrap Grid System for the Cart Table */}
        <div className="row">
          <div className="col-12">
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
                            onClick={() =>
                              updateQuantity(item.bookID, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          {item.quantity}
                          <button
                            className="btn btn-outline-secondary btn-sm ms-1"
                            onClick={() =>
                              updateQuantity(item.bookID, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveItem(item)}
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
          </div>
        </div>

        {cart.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <div>
              <button className="btn btn-primary me-2">Checkout</button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/books')}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bootstrap Modal for Confirmation Before Removing Item */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex={-1}
        style={{ display: showModal ? 'block' : 'none' }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Removal</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {itemToRemove && (
                <p>
                  Are you sure you want to remove{' '}
                  <strong>{itemToRemove.title}</strong> from your cart?
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmRemove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
