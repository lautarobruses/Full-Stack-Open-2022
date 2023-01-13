import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'


const CreateNew = (props) => {
    const content = useField("text")
    const author = useField("text")
    const info = useField("text")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate("/")
    }

    const handleReset = () => {
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    content: 
                    <input
                        name='content'
                        type={content.type} 
                        value={content.value} 
                        onChange={content.onChange}
                    />
                </div>
                <br/>
                <div>
                    author: 
                    <input
                        name='author' 
                        type={author.type}
                        value={author.value} 
                        onChange={author.onChange}
                    />
                </div>
                <br/>
                <div>
                    url for more info: 
                    <input 
                        name='info' 
                        type={info.type} 
                        value={info.value} 
                        onChange={info.onChange}
                    />
                </div>
                <br/>
                <button type='submit'>create</button>
                <button type='reset'>reset</button>
            </form>
        </div>
    )
}

export default CreateNew