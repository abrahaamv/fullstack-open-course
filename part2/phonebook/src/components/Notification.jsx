const Notification = ({ message, type }) => {

    if(!message|| !type) { return null }
        else { return <div className={type}>{message}</div> }
}
export default Notification