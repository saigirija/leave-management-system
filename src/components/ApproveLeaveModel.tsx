import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ErrorService from '../services/ErrorService';
import { getAllFacultyApplications } from '../slices/AuthSlice';
import {
  AppDispatch,
  FacultyApplicationResponse,
  LeaveStatusEnum,
} from '../types';
import { getAuthCookie } from '../utils/ApiUtils';
import Logger from '../utils/Logger';
import { capitalizeEnum } from '../utils/StringUtils';
import ControlledHTMLSelectInput from './controlled-inputs/ControlledHTMLSelectInput';
import ControlledTextInput from './controlled-inputs/ControlledTextInput';
import SimpleConfirmationModal from './SimpleConfirmationModal';

interface Props {
  application: FacultyApplicationResponse;
  onClose(): void;
}

interface FormData {
  status: string;
  status_comment: string;
}

const ApproveLeaveModel: React.FC<Props> = ({ onClose, application }) => {
  const dispatch: AppDispatch = useDispatch();
  const token = getAuthCookie();
  const { control, handleSubmit } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRequest = async (values: FormData) => {
    setIsSubmitting(true);
    await axios({
      method: 'post',
      url: 'https://leavemangement.onrender.com/apiv1/facultyaction/updatestatus',
      data: { leave_application_id: application.id, ...values },
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(async (res) => {
        Logger.debug('Toast:', res.data);
        dispatch(getAllFacultyApplications(token!));
      })
      .catch((e) => {
        ErrorService.notify('Problem in updating status', e);
      })
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  };

  return (
    <SimpleConfirmationModal
      isOpen
      isSubmitting={isSubmitting}
      onClose={onClose}
      variant='info'
      size='medium'
      title='Approve Leave'
      onConfirm={handleSubmit(handleRequest)}
      hideIcon
    >
      <div className='px-4'>
        <div className='mt-5'>
          <ControlledHTMLSelectInput<FormData, 'status'>
            name='status'
            options={Object.values(LeaveStatusEnum).map((status) => ({
              label: capitalizeEnum(status),
              value: status.toLowerCase(),
            }))}
            control={control}
            defaultValue={LeaveStatusEnum.PENDING}
            label='Status'
          />
        </div>
        <div className='mt-5'>
          <ControlledTextInput<FormData, 'status_comment'>
            name='status_comment'
            control={control}
            label='Comment'
            placeholder='please write a short comment'
          />
        </div>
      </div>
    </SimpleConfirmationModal>
  );
};

export default ApproveLeaveModel;
