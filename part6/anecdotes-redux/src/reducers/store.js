import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import anecdoteServices from '../services/anecdotes'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notificationReducer,
      filter: filterReducer
    }
})

console.log(store.getState())

anecdoteServices.getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes))
  )

export default store