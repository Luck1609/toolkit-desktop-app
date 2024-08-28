import { configureStore } from '@reduxjs/toolkit'
import notice from './slice/notice'
import user from './slice/user'
import session from './slice/session'
// ...

export const store = configureStore({
  reducer: {
    notice,
    user,
    session,
  }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']