interface ButtonProps{
    label: string, 
    onClick: () => void,
    color: string
}


export function Button({label, onClick, color}: ButtonProps)  {
    return(
        <button
        onClick={onClick}
        style={{backgroundColor: color, color: 'white', padding: '10px 20px', borderRadius: '5px'}}
        >{label}</button>
    )
}