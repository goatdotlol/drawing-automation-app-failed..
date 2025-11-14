import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const baseClasses = "w-full bg-discord-secondary rounded-lg px-4 py-3 border-2 border-gray-600 focus:border-discord-accent focus:ring-2 focus:ring-discord-accent/20 transition-all outline-none text-white placeholder-gray-500";
    
    const errorClasses = error ? "border-discord-error focus:border-discord-error focus:ring-discord-error/20" : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-discord-text-secondary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-discord-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

