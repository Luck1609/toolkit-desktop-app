import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { Session } from '@/pages/sessions/resource/types';


interface SessionState {
  session: Session | null,
}

// Define the initial state using that type
const initialState: SessionState = {
  session: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSession: (state, { payload }: { payload: Session }) => {
      console.log("Session updated", payload);
      state.session = !payload
        ? initialState.session
        : payload
    },
  }
})

export const { updateSession } = sessionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.session

export default sessionSlice.reducer