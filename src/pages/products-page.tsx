import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/product.slice";
import { RootState } from "../redux/store";
import { fetchProducts } from "../api/products.api";
import Rating from '@mui/material/Rating';

const ProductList: React.FC = () => {
  const data = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const brandFilters = useSelector(
    (state: RootState) => state.cart.brandFilters
  );

  const getProductQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleIncreaseQuantity = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      dispatch(increaseQuantity(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      dispatch(decreaseQuantity(productId));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const filteredProducts = data.data?.products?.filter(
    (product) =>
      brandFilters.length === 0 || brandFilters.includes(product.brand)
  );

  
  if (data.isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center">
      {filteredProducts?.map((product) => (
        <>
          <div
            key={product.id}
            className="p-4 w-56 h-72 border flex flex-col items-center justify-between rounded-2xl shadow-md bg-white"
          >
          <img src="./box.png" alt="" className="w-28"/>
            <h2 className="text-lg w-28 font-bold mb-2 truncate">{product.title}</h2>
            <p className="text-gray-700 mb-4 font-semibold">${product.price}</p>
            <Rating name="read-only" value={product.rating} readOnly />
            <div className="flex items-center">
              <button
                onClick={() => handleDecreaseQuantity(product.id)}
                className="bg-gray-800 rounded-l-md text-white font-bold text-lg w-7"
                disabled={getProductQuantity(product.id) === 0}
              >
                -
              </button>
              <span className="mx-3 text-lg font-semibold">
                {getProductQuantity(product.id)}
              </span>
              <button
                onClick={() => handleIncreaseQuantity(product)}
                className="bg-gray-800 rounded-r-md text-white font-bold text-lg w-7"
              >
                +
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ProductList;
