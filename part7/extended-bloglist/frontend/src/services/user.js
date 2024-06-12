import axios from 'axios'

let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const baseUrl = '/api/users'

const setUser = (user) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    token = user.token
}

const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        token = user.token
        return user
    }

    return null
}

const clearUser = () => {
    window.localStorage.clear()
    token = null
}

const getToken = () => token

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default {
    setUser,
    getUser,
    clearUser,
    getToken,
    getAll
}
