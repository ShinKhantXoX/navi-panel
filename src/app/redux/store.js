import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './notificationSlice'
import drawerSlice from './drawerSlice'
import tokenSlice from './tokenSlice'
import selectImageSlice from "./selectImage"

export const store = configureStore({
    reducer: {
        notificaiton: notificationSlice,
        drawer: drawerSlice,
        token : tokenSlice,
        imageSelect : selectImageSlice
    },
})