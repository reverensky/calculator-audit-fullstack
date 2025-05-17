export function Button({ onClick, children, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full h-16 w-16 text-2xl font-medium ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
