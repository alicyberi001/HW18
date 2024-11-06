import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/features/product.slice';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full text-black">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <span className='w-28 truncate'>{item.title}</span>
                <span className='w-12'>${item.price}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="w-7 h-7 text-white flex items-center justify-center font-bold bg-gray-900 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="w-7 h-7 text-white flex items-center justify-center font-bold bg-gray-900 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
