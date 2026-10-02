import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  disabled = false,
  href,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold tracking-widest uppercase transition-all duration-300 ease-out focus:outline-none focus:ring-1 focus:ring-white/50 active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-4 py-2.5 space-x-2",
    md: "text-xs sm:text-sm px-6 py-3.5 space-x-2.5",
    lg: "text-sm sm:text-base px-8 py-4 space-x-3"
  };

  const variantStyles = {
    primary: "bg-white text-black hover:bg-neutral-200 border border-white shadow-lg hover:shadow-white/10",
    secondary: "bg-brand-card text-white hover:bg-brand-elevated border border-white/15 hover:border-white/40",
    outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent",
    metallic: "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 text-white border border-white/20 hover:border-white/50"
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group ${combinedClass}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group ${combinedClass}`}
      {...props}
    >
      {content}
    </button>
  );
}
