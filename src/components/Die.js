export default function Die(props) {

    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" 
    }

    return (
        <div className="die" style={styles} onClick={props.hold}>
            <p>{props.value}</p>
        </div>
    )
}