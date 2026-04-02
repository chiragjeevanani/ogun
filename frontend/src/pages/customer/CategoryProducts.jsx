import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerProducts } from '../../data/customerProducts';

const CategoryProducts = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const filteredProducts = customerProducts.filter((item) => item.category === category);
  const title = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}` : 'Category';

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen max-w-md bg-gray-100">
        <div className="sticky top-0 z-20 bg-white">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-gray-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
              </svg>
            </button>
            <div>
              <p className="text-lg font-semibold text-gray-900">{title} Products</p>
              <p className="text-sm text-gray-500">{filteredProducts.length} items found</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {filteredProducts.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-400">
              No products found in this category
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((item) => (
                <div key={item.id} className="rounded-lg bg-white p-3 shadow-sm">
                  <img src={item.image} alt={item.name} className="mb-2 h-28 w-full rounded-md object-cover" />
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">Rs {item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
