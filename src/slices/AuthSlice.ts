import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ErrorService from '../services/ErrorService';
import {
  AppThunk,
  AuthState,
  AuthUserResponse,
  FacultyApplicationResponse,
  StudentApplicationsResponse,
  UserTypeEnum,
} from '../types';

export const initialState: AuthState = {
  authUserLoading: false,
  authUserResponse: undefined,
  studentApplications: [],
  facultyApplications: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuthUserLoading(state, action: PayloadAction<boolean>) {
      state.authUserLoading = action.payload;
    },
    saveAuthUserDetails(
      state,
      action: PayloadAction<AuthUserResponse | undefined>
    ) {
      state.authUserResponse = action.payload;
    },
    saveStudentApplications(
      state,
      action: PayloadAction<StudentApplicationsResponse[]>
    ) {
      state.studentApplications = action.payload;
    },
    saveFacultyApplications(
      state,
      action: PayloadAction<FacultyApplicationResponse[]>
    ) {
      state.facultyApplications = action.payload;
    },
  },
});

export const {
  saveAuthUserLoading,
  saveAuthUserDetails,
  saveStudentApplications,
  saveFacultyApplications,
} = authSlice.actions;

export const fetchUserDetails =
  (token: string): AppThunk =>
  async (dispatch) => {
    dispatch(saveAuthUserLoading(true));
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/getDetails',
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(saveAuthUserDetails(data));

      console.log('Data:', data);

      if (data.role === UserTypeEnum.FACULTY) {
        dispatch(getAllFacultyApplications(token));
      } else if (data.role === UserTypeEnum.STUDENT) {
        dispatch(getAllStudentApplications(token));
      }
    } catch (e: any) {
      ErrorService.notify('Unable to fetch applications', e);
    } finally {
      dispatch(saveAuthUserLoading(false));
    }
  };

export const getAllFacultyApplications =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/facultyaction/allapplication',
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(saveFacultyApplications(data.data));
    } catch (e: any) {
      ErrorService.notify('Unable to fetch applications', e);
    }
  };

export const getAllStudentApplications =
  (token: string, onFetch?: boolean, appLoading: boolean = true): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://leavemangement.onrender.com/apiv1/studentaction/applicationhistory',
        headers: { Authorization: 'Bearer ' + token },
      });
      dispatch(saveStudentApplications(data.data));
    } catch (e: any) {
      if (onFetch) {
        dispatch(getAllFacultyApplications(token));
      }
      ErrorService.notify('Unable to fetch applications', e);
    }
  };

export default authSlice.reducer;
