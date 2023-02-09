import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import commentReducer from './reducers/commentReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        logedUser: loginReducer,
        blogs: blogReducer,
        users: userReducer,
        comments: commentReducer,
        notification: notificationReducer
    },
})

export default store
