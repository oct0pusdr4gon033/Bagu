import React from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    className?: string;
}

export default function Button({
    variant = 'primary',
    icon,
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = ''
}: ButtonProps) {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
        primary: "bg-[#742f37] text-white hover:bg-[#5a242b] active:bg-[#4a1e25]",
        secondary: "bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 active:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {icon && <span className="flex items-center">{icon}</span>}
            {children}
        </button>
    );
}
