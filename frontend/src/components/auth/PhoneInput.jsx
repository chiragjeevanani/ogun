import React from 'react';
import Input from '../common/Input';

const PhoneInput = ({ value, onChange, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <div className="flex items-center">
        <span className="text-gray-600 mr-2">+91</span>
        <Input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="Enter your phone number"
          maxLength="10"
          {...props}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
