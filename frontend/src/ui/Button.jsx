export function Button({ onClick, children, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full font-medium flex items-center justify-center ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
