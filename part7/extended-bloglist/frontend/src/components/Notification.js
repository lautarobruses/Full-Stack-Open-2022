import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification === null) {
        return null
    }

    // const notificationStyle = {
    //     color: notification.type === 'alert' ? 'red' : 'green',
    //     background: 'lightgrey',
    //     fontSize: 20,
    //     borderStyle: 'solid',
    //     borderRadius: 5,
    //     padding: 10,
    //     marginBottom: 10,
    // }

    return (
        <div className="container" >
            {(notification &&
                <Alert variant={(notification.type === 'alert' ? 'danger' : 'success')}>
                    {notification.message}
                </Alert>
            )}
        </div>
    )
}

export default Notification
