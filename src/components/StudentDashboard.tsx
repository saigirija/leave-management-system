import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorService from '../services/ErrorService';
import { getAllStudentApplications } from '../slices/AuthSlice';
import { AppDispatch, RootState } from '../types';
import { getAuthCookie } from '../utils/ApiUtils';
import { capitalizeEnum } from '../utils/StringUtils';
import Button from './Button';
import Layout from './Layout';

const StudentDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token = getAuthCookie();

  const { studentApplications } = useSelector((state: RootState) => state.auth);

  const handleDelete = async (id: number) => {
    await axios({
      method: 'post',
      url: 'https://leavemangement.onrender.com/apiv1/studentaction/deleteapplication',
      data: { leave_application_id: id },
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(async (res) => {
        dispatch(getAllStudentApplications(token!, false, false));
      })
      .catch((e) => {
        ErrorService.notify('problem in deleting leave application', e);
      });
  };

  return (
    <Layout>
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-start w-5/6'>
          <div className='w-full flex flex-row justify-between items-center py-3'>
            <h1 className='font-sans font-semibold text-dark-9 text-lg'>
              My Leaves
            </h1>
            <Button
              label='Apply for Leave'
              onClick={() => navigate('/dashboard/apply')}
            />
          </div>
          <table className='w-full'>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Leave From</th>
              <th>Leave To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {(studentApplications || []).map((leave) => {
              return (
                <tr>
                  <td>{capitalizeEnum(leave.leave_type)}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {DateTime.fromISO(leave.starting_date).toFormat(
                      'yyyy LLL dd'
                    )}
                  </td>
                  <td>
                    {DateTime.fromISO(leave.ending_date).toFormat(
                      'yyyy LLL dd'
                    )}
                  </td>
                  <td
                    className={classNames(
                      'font-mono font-semibold text-base',
                      leave.status === 'pending'
                        ? 'text-warning-dark'
                        : leave.status === 'rejected'
                        ? 'text-danger'
                        : 'text-success-dark'
                    )}
                  >
                    {capitalizeEnum(leave.status)}
                  </td>
                  <td className='flex items-center justify-center'>
                    <DeleteIcon
                      className='text-danger cursor-pointer'
                      fontSize='medium'
                      onClick={() => handleDelete(leave.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
