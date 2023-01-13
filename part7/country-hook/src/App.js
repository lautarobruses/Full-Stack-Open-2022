import { useState } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks'

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
        <form onSubmit={fetch}>
            <input {...nameInput} />
            <button type='submit'>find</button>
        </form>
        <br/>
        <Country country={country} />
        </div>
    )
}

export default App
