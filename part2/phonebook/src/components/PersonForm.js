import Input from "./Input"

const PersonForm = ({onSubmit,value1,onChange1,value2,onChange2}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input text='Name:' value={value1} onChange={onChange1} /> 
            <Input text='Number:' value={value2} onChange={onChange2} /> 
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm