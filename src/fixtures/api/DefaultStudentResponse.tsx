import {
  BranchesEnum,
  LeaveStatusEnum,
  StudentResponse,
  UserTypeEnum,
} from '../../types';

export const DefaultStudentResponse: Required<StudentResponse> = {
  student_id: '0001',
  student_name: 'John Depp',
  mobile_number: '9876543210',
  email_id: 'test@example.com',
  department: BranchesEnum.CSE,
  faculty_id: '001',
  degree: 'Mtech',
  specialization: 'CSV',
  entrance: 'GATE',
  user_type: UserTypeEnum.STUDENT,
  leaves: [
    {
      title: "Sister's Marriage",
      desc: 'Sister is getting married, I must attend the marriage I need a leave for 2 days',
      from: '26-03-2022',
      status: LeaveStatusEnum.PENDING,
      to: '27-03-2022',
    },
    {
      title: 'Family Vacation',
      desc: 'I am going vacation with my family for 5 days, I must attend the vacation I need a leave for 2 days',
      from: '26-03-2022',
      status: LeaveStatusEnum.REJECTED,
      to: '31-03-2022',
    },
  ],
};
