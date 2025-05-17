export function Card({ children, className = "" }) {
  return (
    <div className={`primary-bg primary-text rounded-2xl p-4 ${className}`}>
        <div className="p-2">
            {children}
        </div>
    </div>
  );
}
