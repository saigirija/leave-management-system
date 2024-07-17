import {
  BranchesEnum,
  FacultyResponse,
  LeaveStatusEnum,
  UserTypeEnum,
} from '../../types';

export const DefaultFacultyResponse: Required<FacultyResponse> = {
  faculty_id: '001',
  faculty_name: 'Raghavendra Mantrakoti',
  mobile_number: '9989008812',
  email_id: 'user@example.com',
  user_type: UserTypeEnum.FACULTY,
  request: [
    {
      request: {
        title: "Sister's Marriage",
        desc: 'Sister is getting married, I must attend the marriage I need a leave for 2 days',
        from: '26-03-2022',
        status: LeaveStatusEnum.PENDING,
        to: '27-03-2022',
      },
      student: {
        student_id: '0001',
        degree: 'Mtech',
        department: BranchesEnum.CSE,
        email_id: 'test@example.com',
        student_name: 'Michel Dox',
        entrance: 'GATE',
        mobile_number: '9875312345',
        specialization: 'CSV',
      },
    },
    {
      request: {
        title: 'Family Vacation',
        desc: 'I am going vacation with my family for 5 days, I must attend the vacation I need a leave for 2 days',
        from: '26-03-2022',
        status: LeaveStatusEnum.REJECTED,
        to: '31-03-2022',
      },
      student: {
        student_id: '0002',
        degree: 'Mtech',
        department: BranchesEnum.ECE,
        email_id: 'test@example.com',
        student_name: 'John Doe',
        entrance: 'GATE',
        mobile_number: '9875312345',
        specialization: 'Electrical Engineering',
      },
    },
  ],
};
