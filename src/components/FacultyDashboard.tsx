import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorService from '../services/ErrorService';
import {
  FacultyApplicationResponse,
  RootState,
  StudentApiResponse,
} from '../types';
import { getAuthCookie } from '../utils/ApiUtils';
import ApproveLeaveModel from './ApproveLeaveModel';
import Button from './Button';
import Layout from './Layout';
import ResourceContainer from './ResourceContainer';

const StudentDashboard = () => {
  const token = getAuthCookie();
  const [userRequest, setUserRequest] = useState<StudentApiResponse>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userReference, setUserReference] =
    useState<FacultyApplicationResponse>();
  const [isModelOpen, setIsModalOpen] = useState<FacultyApplicationResponse>();

  const { s_id: studentId, id: applicationId } = userReference || {};

  const { facultyApplications } = useSelector((state: RootState) => state.auth);

  const fetchStudentDetails = useCallback(async (id: number, token: string) => {
    setIsFetching(true);
    await axios({
      method: 'get',
      url: `https://leavemangement.onrender.com/apiv1/facultyaction/getstudent/${id}`,
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(async (res) => {
        setUserRequest(res.data.data[0]);
      })
      .catch((e) => {
        ErrorService.notify('Problem in fetching request token', e);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    if (!!studentId && !!token) {
      fetchStudentDetails(studentId, token);
    }
  }, [fetchStudentDetails, studentId, token]);

  return (
    <Layout>
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-start w-5/6'>
          <div className='flex flex-row justify-between items-center px-4 py-6'>
            <h1 className='font-sans font-semibold text-dark-9 text-lg'>
              My Student
            </h1>
          </div>
          <div className='w-full'>
            <div className='grid grid-cols-6 font-sans font-bold text-base uppercase p-4 bg-primary bg-opacity-20'>
              <span>Title</span>
              <span className='col-span-2'>Description</span>
              <span>Leave From</span>
              <span>Leave To</span>
              <span>Status</span>
            </div>
            {facultyApplications.map((application) => {
              return (
                <React.Fragment>
                  <div className='w-full cursor-pointer grid grid-cols-6 items-center justify-center p-4 font-sans font-normal text-base bg-dark-3 bg-opacity-20'>
                    <span
                      className='flex items-center relative'
                      onClick={() => {
                        if (applicationId && applicationId === application.id) {
                          setUserReference(undefined);
                        } else {
                          setUserReference(application);
                        }
                      }}
                    >
                      {applicationId && applicationId === application.id ? (
                        <ArrowDropUpIcon
                          className='text-primary'
                          fontSize='large'
                        />
                      ) : (
                        <ArrowDropDownIcon
                          className='text-primary'
                          fontSize='large'
                        />
                      )}
                      {application.leave_type}
                    </span>
                    <span className='col-span-2'>{application.reason}</span>
                    <span>
                      {DateTime.fromISO(application.starting_date).toFormat(
                        'yyyy LLL dd'
                      )}
                    </span>
                    <span>
                      {DateTime.fromISO(application.ending_date).toFormat(
                        'yyyy LLL dd'
                      )}
                    </span>
                    {application.status === 'approved' ? (
                      <span className='text-success font-extrabold'>
                        Accepted
                      </span>
                    ) : application.status === 'rejected' ? (
                      <span className='text-danger font-extrabold'>
                        Rejected
                      </span>
                    ) : (
                      <Button
                        label={application.status}
                        onClick={() => setIsModalOpen(application)}
                      />
                    )}
                  </div>
                  {applicationId && applicationId === application.id && (
                    <ResourceContainer
                      isEmpty={!userRequest}
                      loading={isFetching}
                      resourceName='user'
                    >
                      <tr>
                        <th>Student Name</th>
                        <th>Roll No</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Degree</th>
                        <th>Department</th>
                        <th>Specialization</th>
                        <th>Entrance</th>
                        <th>Remaining Casual Leaves</th>
                        <th>Remaining Medical Leaves</th>
                      </tr>
                      <tr>
                        <td>{userRequest?.name}</td>
                        <td>{userRequest?.roll_no}</td>
                        <td>{userRequest?.email_id}</td>
                        <td>{userRequest?.mobile_no}</td>
                        <td>{userRequest?.degree}</td>
                        <td>{userRequest?.department}</td>
                        <td>{userRequest?.specialization}</td>
                        <td>{userRequest?.entrance}</td>
                        <td>{userRequest?.remaining_casual_leave}</td>
                        <td>{userRequest?.remaining_medical_leave}</td>
                      </tr>
                    </ResourceContainer>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      {isModelOpen && (
        <ApproveLeaveModel
          application={isModelOpen}
          onClose={() => setIsModalOpen(undefined)}
        />
      )}
    </Layout>
  );
};

export default StudentDashboard;
