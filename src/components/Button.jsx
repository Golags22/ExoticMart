import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-white hover:bg-gray-800 focus:ring-black",
    outline:
      "border border-black text-black hover:bg-black hover:text-white focus:ring-black",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}

      {!loading && Icon && <Icon size={18} />}

      {children}
    </button>
  );
};

export default Button;
