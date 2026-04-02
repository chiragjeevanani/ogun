import React, { useRef, useState } from 'react';

const OtpInput = ({ length = 6, value, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    onChange?.(newOtp.join(''));

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength="1"
          className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 text-lg sm:text-xl md:text-2xl font-bold border-2 border-slate-700 bg-slate-900 text-white rounded-lg focus:outline-none focus:border-orange-500 focus:bg-slate-800 transition-all text-center"
        />
      ))}
    </div>
  );
};

export default OtpInput;
