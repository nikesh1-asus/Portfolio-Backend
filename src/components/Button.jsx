export const Button = ({ children, onClick, className }) => {
    return (
        <button onClick={onClick} className={`bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full text-sm font-medium ${className}`}>
            {children}
        </button>
    );
}