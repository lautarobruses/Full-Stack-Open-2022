import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const notificationStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    return (notification === null) ? 
        null : 
        <div className="notification" style={ notificationStyle }>{ notification.message }</div>
}

export default Notification