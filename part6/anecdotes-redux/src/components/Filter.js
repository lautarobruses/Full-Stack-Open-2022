import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch({ type: "filter/filterChange", filter:content })
    }
    const style = {
        marginBottom: 10
    }
  
    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}
  
export default Filter