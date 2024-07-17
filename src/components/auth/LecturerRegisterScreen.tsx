import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ErrorService from '../../services/ErrorService';
import { BranchesEnum } from '../../types';
import Logger from '../../utils/Logger';
import { capitalizeEnum } from '../../utils/StringUtils';
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
  PHONE_NUMBER_VALIDATIONS,
} from '../../utils/validations';
import Button from '../Button';
import ControlledHTMLSelectInput from '../controlled-inputs/ControlledHTMLSelectInput';
import ControlledTextInput from '../controlled-inputs/ControlledTextInput';

interface LecturerRegisterScreenProps {}

interface FormData {
  facultyName: string;
  mobileNumber: string;
  emailId: string;
  department: string;
  password: string;
  cPassword: string;
  submit: string;
}

const LecturerRegisterScreen: React.FC<LecturerRegisterScreenProps> = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, setValue } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const onSubmit = async (formData: FormData) => {
    const { facultyName, emailId, mobileNumber, password, department } =
      formData;
    setIsSubmitting(true);
    await axios({
      method: 'post',
      url: 'https://leavemangement.onrender.com/apiv1/faculty/signup',
      data: {
        name: facultyName,
        mobile_no: mobileNumber,
        email: emailId,
        password: password,
        department: department,
      },
    })
      .then(async (res) => {
        Logger.debug('Status:', res.data);
        navigate('/');
      })
      .catch((e) => {
        setValue('submit', e);
        ErrorService.notify('Problem in registering user', e);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className='px-4 py-6 flex items-center justify-center'>
      <div className='bg-white flex flex-col items-start justify-center md:w-1/2 w-full md:shadow-xl rounded-2xl py-6'>
        <h1 className='text-xl font-bold text-primary my-3 self-center'>
          Register
        </h1>
        <div className='overflow-y-scroll w-full md:px-12 px-4'>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'facultyName'>
              label='Faculty Full Name'
              name='facultyName'
              control={control}
              placeholder='Eg:John Doe'
              shouldUnregister={false}
              rules={{
                required: 'Please enter your fullName',
              }}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'mobileNumber'>
              label='Mobile Number'
              name='mobileNumber'
              control={control}
              placeholder='+91 9092929292'
              shouldUnregister={false}
              rules={{
                maxLength: {
                  value: 10,
                  message: 'Length should not exceed 10 digits',
                },
                minLength: { value: 10, message: 'Mobile must be 10 digits' },
                required: 'Please enter your mobile number',
                ...PHONE_NUMBER_VALIDATIONS,
              }}
              inputMode='numeric'
              type='number'
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'emailId'>
              label='Email'
              name='emailId'
              control={control}
              placeholder='Eg: test@example.com'
              shouldUnregister={false}
              rules={{
                required: 'Please enter your email',
                ...EMAIL_VALIDATIONS,
              }}
              type='email'
              inputMode='email'
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'department'>
              name='department'
              control={control}
              label='Department'
              placeholder='Select Department'
              rules={{ required: 'Please select department' }}
              options={[
                { label: 'Select', value: '' },
                ...Object.values(BranchesEnum).map((b) => ({
                  label: capitalizeEnum(b),
                  value: b,
                })),
              ]}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'password'>
              label='Password'
              name='password'
              control={control}
              shouldUnregister={false}
              rules={{
                required: 'Please enter password',
                ...PASSWORD_VALIDATIONS,
              }}
              type='password'
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'cPassword'>
              label='Confirm Password'
              name='cPassword'
              control={control}
              shouldUnregister={false}
              rules={{
                required: 'Please re-enter your password',
                validate: (value) =>
                  getValues().password !== value
                    ? 'Passwords do not match'
                    : undefined,
              }}
              type='password'
              isRequired
            />
          </div>
        </div>

        <div className='mt-5 w-full flex flex-col items-end md:px-12 px-4 py-3 space-y-3'>
          <span>
            Already User?{' '}
            <button
              onClick={() => navigate('/login/faculty')}
              className='font-sans text-primary text-base leading-5 font-medium'
            >
              Login
            </button>
          </span>
          <Button
            label='Register'
            onClick={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default LecturerRegisterScreen;
