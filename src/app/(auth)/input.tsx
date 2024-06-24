'use client'
import React, { useState, ChangeEvent, FocusEvent, InputHTMLAttributes, ReactElement, JSXElementConstructor } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string | ReactElement<any, string | JSXElementConstructor<any>>;
  error?: string;
}

const Input: React.FC<InputProps> = ({ onChange, placeholder, label, icon, error, ...props }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setValue(e.currentTarget.value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      setFocused(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className={clsx("flex gap-4 w-full py-3 px-4 opacity-0 transition-opacity", (focused || value) && "opacity-100", error && "text-feedback-failed")}>
        {typeof icon === "string" ? (
          <Image width={16} height={16} src={icon} alt="User icon" />
        ) : React.isValidElement(icon) ? (
          React.cloneElement(icon)
        ) : null}
        <label htmlFor={props.id} className={clsx({ "text-feedback-failed": error })}>
          {label}
        </label>
      </div>
      <input
        {...props}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(
          "w-full py-3 px-4 bg-transparent transition-all placeholder:text-white-50 border border-white-50 rounded outline-0",
          focused ? "bg-white-0 text-black" : ""
        )}
        placeholder={placeholder}
      />
      {error && (
        <span className="text-xs font-light text-feedback-failed">{error}</span>
      )}
    </div>
  );
};

export default Input;
