"use client";

import React, { useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onChange,
  onComplete,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    const input = inputsRef.current[index];
    input?.focus();
    input?.select();
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only digits
    const otpCopy = [...otp];
    otpCopy[index] = value.slice(-1);
    setOtp(otpCopy);

    if (value && index < length - 1) {
      focusInput(index + 1);
    }

    const fullOtp = otpCopy.join("");
    onChange?.(fullOtp);
    if (fullOtp.length === length && !otpCopy.includes("")) {
      onComplete?.(fullOtp);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, length);
    const chars = pasted.split("");
    const otpCopy = [...otp];
    for (let i = 0; i < length; i++) {
      otpCopy[i] = chars[i] || "";
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = chars[i] || "";
      }
    }
    setOtp(otpCopy);
    onChange?.(otpCopy.join(""));
    if (pasted.length === length) {
      onComplete?.(otpCopy.join(""));
    }
    e.preventDefault();
  };

  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          name="otp"
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
