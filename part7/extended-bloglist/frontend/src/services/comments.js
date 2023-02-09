import axios from 'axios'

const getAll = async (id) => {
    const response = await axios.get(`/api/blogs/${id}/comments`)
    return response.data
}

const create = async (id, newComment) => {
    const comment = {
        content: newComment
    }
    const response = await axios.post(`/api/blogs/${id}/comments`, comment)
    return response.data
}

export default { getAll, create }