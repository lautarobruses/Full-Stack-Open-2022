const Error = ({ message }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRaius: 5,
        padding: 10,
        marginBottom: 10
    }

    return message === null 
        ? null 
        : <div className="error" style={errorStyle}>{message}</div>
}

export default Error