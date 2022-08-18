import AcademyReducer from '@Features/academy/slices/AcademyListPageSlice';
import CommonReducer from '@Features/common/slices/CommonSlice';
import AdminRegistReducer from '@Features/admin/slices/RegistPageSlice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    academy: AcademyReducer,
    common: CommonReducer,
    adminRegist: AdminRegistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
