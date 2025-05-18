export function Card({ children, id, className = "" }) {
  return (
    <div className={`primary-bg primary-text rounded-2xl p-4 ${className}`} id={id}>
        <div className="p-2 flex flex-col items-center justify-center w-full h-full">
            {children}
        </div>
    </div>
  );
}
