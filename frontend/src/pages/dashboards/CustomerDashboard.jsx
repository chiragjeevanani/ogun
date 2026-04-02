import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { customerProducts } from '../../data/customerProducts';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('customerCart') || '[]');
    } catch {
      return [];
    }
  });
  const userName = useMemo(() => {
    const data = JSON.parse(localStorage.getItem('loginData') || '{}');
    return data.userName || 'Customer';
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', path: '/customer/home', icon: 'home' },
    { id: 'shop', label: 'Shop', path: '/customer/shop', icon: 'shop' },
    { id: 'orders', label: 'Orders', path: '/customer/orders', icon: 'orders' },
    { id: 'profile', label: 'Profile', path: '/customer/profile', icon: 'profile' },
  ];

  const categories = [
    { name: 'Mixer', slug: 'mixer', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop' },
    { name: 'Microwave', slug: 'microwave', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop' },
    { name: 'Air Fryer', slug: 'airfryer', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop' },
    { name: 'Refrigerator', slug: 'refrigerator', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop' },
  ];

  const featuredProducts = customerProducts.slice(0, 4).map((product) => ({
    ...product,
    price: `Rs ${product.price.toLocaleString('en-IN')}`,
  }));

  const shopProducts = customerProducts.map((product) => ({
    ...product,
    price: `Rs ${product.price.toLocaleString('en-IN')}`,
  }));

  const orders = [
    { id: 'ORD-1001', product: 'Mixer Grinder Pro', price: 'Rs 3,199', status: 'Delivered' },
    { id: 'ORD-1002', product: 'Microwave Oven', price: 'Rs 8,999', status: 'Pending' },
    { id: 'ORD-1003', product: 'Air Fryer Max', price: 'Rs 5,499', status: 'Cancelled' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleCategoryClick = (category) => {
    navigate(`/customer/category/${category}`);
  };

  useEffect(() => {
    localStorage.setItem('customerCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
    toast.success('Item added to cart');
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cart.reduce((total, item) => {
    const numericPrice = Number.parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
    return total + numericPrice * item.qty;
  }, 0);

  const updateCartQuantity = (id, type) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = type === 'increase' ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: nextQty };
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderIcon = (icon) => {
    switch (icon) {
      case 'home':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.25 12 3l9 7.25V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.75Z" />
          </svg>
        );
      case 'shop':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.5 7M17 13l1.5 7M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
        );
      case 'orders':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m20 7-8 4-8-4m16 0-8-4-8 4m16 0v10l-8 4m-8-14v10l8 4m0-10v10" />
          </svg>
        );
      case 'profile':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-8 14a4 4 0 0 1 8 0" />
          </svg>
        );
      case 'location':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" strokeWidth={2} />
          </svg>
        );
      case 'support':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 4v-4Z" />
          </svg>
        );
      case 'about':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v5m0-8h.01" />
          </svg>
        );
      case 'cart':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.5 7M17 13l1.5 7M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" strokeWidth={2} />
          </svg>
        );
    }
  };

  const path = location.pathname;

  const renderPage = () => {
    if (path === '/customer/shop') {
      return (
        <div className="space-y-4 md:space-y-6">
          <div className="sticky top-[72px] z-10 bg-gray-100 pb-2 md:top-[84px]">
            <input
              type="text"
              placeholder="Search appliances"
              className="w-full rounded-lg bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {shopProducts.map((product) => (
              <div key={product.id} className="rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md md:p-4">
                <img src={product.image} alt={product.name} className="h-28 w-full rounded-lg object-cover md:h-36 lg:h-40" />
                <p className="mt-3 text-sm font-medium text-gray-900 md:text-base">{product.name}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900 md:text-base">{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-md bg-black px-3 py-2 text-sm text-white transition-all duration-200 active:scale-[0.98]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (path === '/customer/orders') {
      return (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">My Orders</h2>
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.product}</p>
                  <p className="mt-1 text-sm text-gray-500">{order.price}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (path === '/customer/profile' || path === '/customer/more') {
      const accountItems = [
        { label: 'My Orders', icon: 'orders', action: () => navigate('/customer/orders') },
        { label: 'My Cart', icon: 'cart', action: () => setIsCartOpen(true) },
        { label: 'Address', icon: 'location', action: () => toast('Address section coming soon') },
      ];

      const supportItems = [
        { label: 'Support', icon: 'support', action: () => toast('Support section coming soon') },
        { label: 'About', icon: 'about', action: () => toast('KitchenHub customer app') },
      ];

      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl bg-white p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-base font-semibold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{userName}</p>
              <p className="text-sm text-gray-500">customer@kitchenhub.com</p>
            </div>
          </div>

          <div>
            <p className="mb-2 px-1 text-xs uppercase tracking-wide text-gray-400">Account</p>
            <div className="overflow-hidden rounded-xl bg-white">
              {accountItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left transition-all duration-200 last:border-b-0 hover:bg-gray-50 active:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-gray-500">{renderIcon(item.icon)}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-gray-300">›</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 px-1 text-xs uppercase tracking-wide text-gray-400">Support</p>
            <div className="overflow-hidden rounded-xl bg-white">
              {supportItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left transition-all duration-200 last:border-b-0 hover:bg-gray-50 active:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-gray-500">{renderIcon(item.icon)}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-gray-300">›</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full rounded-md bg-white py-3 text-center text-sm font-medium text-red-500 transition-all duration-200 hover:bg-gray-50 active:bg-gray-50"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-5 md:space-y-8">
        <div className="overflow-hidden rounded-2xl bg-white">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&h=520&fit=crop"
            alt="Kitchen appliances"
            className="h-40 w-full rounded-xl object-cover md:h-60 lg:h-72"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Categories</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className="rounded-xl bg-white p-3 text-left shadow-sm transition hover:shadow-md active:scale-[0.99] md:p-4"
              >
                <img src={category.image} alt={category.name} className="h-24 w-full rounded-lg object-cover md:h-32" />
                <p className="mt-3 text-sm font-medium text-gray-900 md:text-base">{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Featured Products</h2>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-[180px] rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md md:min-w-0 md:p-4">
                <img src={product.image} alt={product.name} className="h-28 w-full rounded-lg object-cover md:h-36 lg:h-40" />
                <p className="mt-3 text-sm font-medium text-gray-900 md:text-base">{product.name}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900 md:text-base">{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-md bg-black px-3 py-2 text-sm text-white transition-all duration-200 active:scale-[0.98]"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen max-w-6xl bg-gray-100">
        {isCartOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setIsCartOpen(false)}
          />
        )}

        <div
          className={`fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-lg transition-transform duration-300 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <h2 className="text-base font-semibold text-gray-900">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-md p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-lg border border-gray-200 p-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.price}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, 'decrease')}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="min-w-5 text-center text-sm text-gray-700">{item.qty}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 'increase')}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 transition-all duration-200 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-base font-semibold text-gray-900">
                  Rs {cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <button className="w-full rounded-md bg-black py-2 text-sm text-white transition-all duration-200 active:scale-[0.99]">
                Checkout
              </button>
            </div>
          </div>
        </div>

        <header className="sticky top-0 z-20 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4 lg:px-8">
            <div>
              <p className="text-lg font-semibold text-gray-900 md:text-xl">KitchenHub</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-gray-200"
              >
                {renderIcon('cart')}
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/customer/profile')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-all duration-200"
              >
                {userName.charAt(0).toUpperCase()}
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-24 pt-4 md:px-6 md:pb-8 md:pt-6 lg:px-8 lg:pt-8">
          <div className="p-0 md:p-0 lg:p-0">
            {renderPage()}
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center">
          <nav className="w-full border-t border-gray-200 bg-white md:hidden">
            <div className="flex justify-around py-2">
              {tabs.map((tab) => {
                const active = path === tab.path;
                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    className={`flex flex-col items-center gap-1 px-3 py-1 text-xs transition-all duration-200 ${
                      active ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    {renderIcon(tab.icon)}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
