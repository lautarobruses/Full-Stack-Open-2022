const Notification = ({ message, error }) => {
  const color = error ? "red" : "green"

  const notificationStyle = {
    color: `${color}`,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRaius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) 
    return null;
  else 
    return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
