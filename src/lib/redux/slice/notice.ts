import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { ReactNode } from 'react';

// Define a type for the slice state
type Notice = {
  show: boolean;
  title: string;
  message: string;
  action?: () => void | undefined;
  mutations: string;
  payload: any,
  method: 'delete' | 'patch',
  url: string;
}

type Modal = {
  show: boolean;
  title: string;
  data?: any;
  content: ReactNode | null;
  className?: string;
  wrap?: boolean;
  url: string;
}

type FormModal = {
  show: boolean;
  title: string;
  data?: any;
  content: ReactNode | null;
  className?: string;
  wrap?: boolean;
  url: string;
  value: Record<string, any> | null
}

interface NoticeState {
  notice: Notice;
  modal: Modal;
  formModal: FormModal;
  logout: boolean;
}

// Define the initial state using that type
const initialState: NoticeState = {
  notice: {
    show: false,
    title: "",
    message: "",
    action: undefined,
    mutations: "",
    payload: "",
    method: "delete",
  },
  modal: {
    show: false,
    title: '',
    data: null,
    url: '',
    content: null,
    className: '',
    wrap: false
  },
  formModal: {
    show: false,
    title: '',
    value: null,
    url: '',
    content: null,
    className: ''
  },
  logout: false
}

export const noticeSlice = createSlice({
  name: 'notice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleNotice: (state, { payload }: { payload: Notice }) => {
      console.log("Notice payload", payload);
      state.notice = !payload
        ? initialState.notice
        : { ...initialState.notice, ...payload }
    },

    
    toggleModal: (state, { payload }: { payload: Modal | undefined }) => {
      console.log("Modal payload", payload);
      state.modal = !payload
        ? initialState.modal
        : payload
    },
    
    toggleFormModal: (state, { payload }: { payload: FormModal | undefined }) => {
      state.formModal = !payload
        ? initialState.formModal
        : payload
    },

    

    toggleLogoutNotice: (state, {payload}) => {
      state.logout = payload !== "close"
    }
  }
})

export const { toggleNotice, toggleLogoutNotice, toggleModal, toggleFormModal } = noticeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.notice

export default noticeSlice.reducer