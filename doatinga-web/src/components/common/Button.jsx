
function Button({ children, disabled, onClick, className, type = "button" }) {
    return (
        <button
            type = {type}
            className = {className}
            onClick = {onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button; 