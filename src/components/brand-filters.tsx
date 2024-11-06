import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandFilters } from '../redux/features/product.slice';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '../redux/store';
import { fetchProducts } from '../api/products.api';

const BrandFilter: React.FC = () => {
  const data = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
  
  const dispatch = useDispatch();
  const selectedBrands = useSelector((state: RootState) => state.cart.brandFilters);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (data.data?.products) {
      const uniqueBrands = Array.from(new Set(data.data?.products.map(product => product.brand)));
      setBrands(uniqueBrands);
    }
  }, [data.data?.products]);

  const handleBrandChange = (brand: string) => {
    let updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      updatedBrands = updatedBrands.filter(b => b !== brand);
    } else {
      updatedBrands.push(brand);
    }
    dispatch(setBrandFilters(updatedBrands));
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Filter by Brand</h3>
      {brands.map((brand, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
            className="mr-2"
          />
          <label>{brand}</label>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;
