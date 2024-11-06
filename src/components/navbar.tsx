import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartModal from './modal';
import { RootState } from '../redux/store';
import FilterModal from './filterModal';

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);


  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    setIsCartModalOpen(true);
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <div className="p-4 px-6 bg-gray-800 text-white flex justify-between">
      <h1>Shop</h1>
      <div className="flex items-center space-x-4">
        <button onClick={handleFilterClick} className="w-7">
          <img src="./filter.png" alt="" />
        </button>
        <button onClick={handleCartClick} className="w-7">
        <img src="./sh.png" alt="" />
          <span className="absolute top-9 right-9 bg-red-500 text-white rounded-full text-sm w-4 h-4 flex items-center justify-center">
            {totalQuantity}
          </span>
        </button>
      </div>
      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
    </div>
  );
};

export default Header;
