const Person = ({ person, deleteContact }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={deleteContact}>delete</button>
    </div>
  )
}

export default Person