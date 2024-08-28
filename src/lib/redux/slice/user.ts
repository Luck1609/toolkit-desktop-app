import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'

// Define a type for the slice state
type User = {
    name: string;
    contact: string;
    email: string
  }


interface AuthState {
  user: User
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {
    name: '',
    contact: '',
    email: ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, { payload }: { payload: User }) => {
      state.user = !payload
        ? initialState.user
        : payload
    }
  }
})

export const { authUser } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default authSlice.reducer