export default function Die({value, isHeld, hold, id}) {
    return (
        <button 
        className={isHeld ? "isHeld" : "notHeld"} 
        onClick={() => hold(id)} 
        aria-pressed={isHeld}
        aria-label={`Die with a value of ${value}`}
        >{value}</button>
    )
}