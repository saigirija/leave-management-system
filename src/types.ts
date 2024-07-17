import { Action, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from './slices/rootReducer';
import store from './slices/store';

export type EnumMap<E extends string, T> = {
  [key in E]: T;
};

export interface ISelectOption<T extends string = string> {
  value: T;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}

export enum BranchesEnum {
  CSE = 'CSE',
  ECE = 'ECE',
  MECHANICAL = 'MECHANICAL',
  EEE = 'EEE',
  CIVIL = 'CIVIL',
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export enum UserTypeEnum {
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT',
}

export enum LeaveStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface AsyncResponse<T, P extends Record<string, any> = {}> {
  data?: T;
  error?: ErrorCode | null;
  loading: boolean;
  name: string;
  additionalProps?: P;
}

export interface LeaveRequest {
  title: string;
  desc: string;
  from: string;
  to: string;
  status: LeaveStatusEnum;
}

export interface StudentResponse {
  student_id: string;
  student_name: string;
  mobile_number: string;
  email_id: string;
  department: BranchesEnum;
  faculty_id: string;
  degree: string;
  specialization: string;
  entrance: 'GATE' | 'SELF_SPONSORED';
  user_type: UserTypeEnum.STUDENT;
  leaves: LeaveRequest[];
}

export interface FacultyRequestResponse {
  student: Omit<StudentResponse, 'faculty_id' | 'leaves' | 'user_type'>;
  request: LeaveRequest;
}

export interface FacultyResponse {
  faculty_id: string;
  faculty_name: string;
  mobile_number: string;
  email_id: string;
  user_type: UserTypeEnum.FACULTY;
  request: FacultyRequestResponse[];
}



export interface AuthState {
  authUserLoading: boolean;
  authUserResponse?: AuthUserResponse;
  studentApplications: StudentApplicationsResponse[];
  facultyApplications: FacultyApplicationResponse[];
}

export interface FacultyListResponse {
  id: string;
  name: string;
}

export interface StudentApplicationsResponse {
  created_on: string;
  document?: File;
  document_attached?: number;
  ending_date: string;
  f_id: number;
  id: number;
  isdeleted: number;
  leave_type: string;
  no_of_leaves: number;
  reason: string;
  s_id: number;
  starting_date: string;
  status: string;
  status_comment: string | null;
}

export interface FacultyApplicationResponse {
  created_on: string;
  document: File | null;
  document_attached: number | null;
  ending_date: string;
  f_id: number;
  id: number;
  isdeleted: number;
  leave_type: string;
  no_of_leaves: number;
  reason: string;
  s_id: number;
  starting_date: string;
  status: string;
  status_comment: string | null;
}

export interface StudentApiResponse {
  degree: string;
  department: string;
  email_id: string;
  entrance: string;
  mobile_no: string;
  name: string;
  remaining_casual_leave: number;
  remaining_medical_leave: number;
  roll_no: string;
  specialization: string;
}

export interface AuthUserResponse {
  role: UserTypeEnum;
  data: {
    id: number;
    name: string;
    mobile_no: string;
    email_id: string;
    password: string;
    department: BranchesEnum;
    created_on: string;
    isdeleted: 0;
  };
}