import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
// import { toggleBrandFilter } from "../redux/cartSlice";
import React, { useEffect, useState } from "react";
import { setBrandFilters } from "../redux/features/product.slice";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products.api";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const data = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const dispatch = useDispatch();
  const selectedBrands = useSelector(
    (state: RootState) => state.cart.brandFilters
  );
  const [brands, setBrands] = useState<string[]>([]);

  
  const handleBrandChange = (brand: string) => {
    let updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      updatedBrands = updatedBrands.filter((b) => b !== brand);
    } else {
      updatedBrands.push(brand);
    }
    dispatch(setBrandFilters(updatedBrands));
  };

  useEffect(() => {
    if (data.data?.products) {
      const uniqueBrands = Array.from(
        new Set(data.data?.products.map((product) => product.brand))
      );
      setBrands(uniqueBrands);
    }
  }, [data.data?.products]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full text-black h-80 overflow-y-scroll">
        <h3 className="text-lg font-bold mb-2">Filter by Brand</h3>
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center mb-2 font-semibold">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className="mr-2"
            />
            <label>{brand}</label>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-900 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FilterModal;

