const Country = ({name,showInfo}) => {
    return (
        <li>
            {name} 
            <button onClick={showInfo}>show</button>
        </li>
    )
}

export default Country