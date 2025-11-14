import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined";
}

export default function Card({ children, variant = "default", className = "", ...props }: CardProps) {
  const baseClasses = "rounded-2xl p-6";
  
  const variantClasses = {
    default: "bg-discord-dark border border-gray-700",
    elevated: "bg-discord-dark border border-gray-700 shadow-2xl backdrop-blur-sm",
    outlined: "bg-transparent border-2 border-gray-700",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

