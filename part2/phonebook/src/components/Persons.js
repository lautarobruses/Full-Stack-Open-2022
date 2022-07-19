import Person from "./Person"

const Persons = ({contacts, deleteContactOf}) => {
    return (
        <>
            {contacts.map(person =>
                <Person 
                    key={person.name} 
                    person={person} 
                    deleteContact={() => deleteContactOf(person.id)} 
                />
            )}
        </>
    )
}

export default Persons