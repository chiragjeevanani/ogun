import React from 'react';

const AuthCard = ({ children, title }) => {
  return (
    <div className="w-full">
      {title && <h1 className="text-2xl font-bold text-center mb-6 text-white">{title}</h1>}
      {children}
    </div>
  );
};

export default AuthCard;
