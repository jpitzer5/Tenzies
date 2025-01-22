export default function Die({value, isHeld, hold, id}) {
    return (
        <button className={isHeld ? "isHeld" : "notHeld"} onClick={() => hold(id)} >{value}</button>
    )
}