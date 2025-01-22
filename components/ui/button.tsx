export interface ButtonProps {
    className?: string;
    children: string;
    onClick?: () => void;
}

export default function Button({ className='', children, onClick } : ButtonProps) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}