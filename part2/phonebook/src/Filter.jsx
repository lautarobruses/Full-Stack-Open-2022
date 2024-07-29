const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      Filter shown with: 
      <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter