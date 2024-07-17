import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ErrorService from '../../services/ErrorService';
import { BranchesEnum, FacultyListResponse } from '../../types';
import Logger from '../../utils/Logger';
import { getSpecializationValues } from '../../utils/RegisterUtils';
import { capitalizeEnum } from '../../utils/StringUtils';
import {
  EMAIL_VALIDATIONS,
  PASSWORD_VALIDATIONS,
  PHONE_NUMBER_VALIDATIONS,
} from '../../utils/validations';
import Button from '../Button';
import ControlledHTMLSelectInput from '../controlled-inputs/ControlledHTMLSelectInput';
import ControlledTextInput from '../controlled-inputs/ControlledTextInput';

interface StudentRegisterScreenProps {}

interface FormData {
  studentId: string;
  studentName: string;
  mobileNumber: string;
  email: string;
  department: string;
  facultyId: string;
  degree: string;
  specialization: string;
  entrance: string;
  password: string;
  cPassword: string;
  submit: string;
}

const StudentRegisterScreen: React.FC<StudentRegisterScreenProps> = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, watch, setValue } =
    useForm<FormData>();

  const spyDepartment = watch('department');

  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [faculty, setFaculty] = useState<FacultyListResponse[]>([]);

  console.log('Faculty:', faculty);

  const onSubmit = async (formData: FormData) => {
    const {
      degree,
      department,
      email,
      entrance,
      facultyId,
      mobileNumber,
      password,
      specialization,
      studentId,
      studentName,
    } = formData;

    setIsSubmitting(true);
    await axios({
      method: 'post',
      url: 'https://leavemangement.onrender.com/apiv1/student/signup',
      data: {
        roll_no: studentId,
        name: studentName,
        mobile_no: mobileNumber,
        email: email,
        password: password,
        department: department,
        faculty_id: facultyId,
        degree: degree,
        specialization: specialization,
        entrance: entrance,
      },
    })
      .then(async (res) => {
        Logger.debug('Status:', res.data);
        navigate('/');
      })
      .catch((e) => {
        setValue('submit', e);
        ErrorService.notify('Problem in registering the user', e);
      })
      .finally(() => setIsSubmitting(false));
  };

  const getFacultyDetails = useCallback(async () => {
    await axios({
      method: 'get',
      url: 'https://leavemangement.onrender.com/apiv1/student/facultylist',
    })
      .then(async (res) => {
        setFaculty(res.data.data);
      })
      .catch((e) => {
        ErrorService.notify('Problem in fetching faculty response', e);
      });
  }, []);

  useEffect(() => {
    getFacultyDetails();
  }, [getFacultyDetails]);

  return (
    <div className='px-4 py-6 flex items-center justify-center'>
      <div className='bg-white flex flex-col items-start justify-center md:w-1/2 w-full md:shadow-xl rounded-2xl py-6'>
        <h1 className='text-xl font-bold text-primary my-3 self-center'>
          Register
        </h1>
        <div className='overflow-y-scroll w-full md:px-12 px-4'>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'studentId'>
              name='studentId'
              label='NITC Roll Number'
              control={control}
              placeholder='Please enter Id'
              shouldUnregister={false}
              rules={{
                required: 'Please enter your Id',
              }}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledTextInput<FormData, 'studentName'>
              label='Student Full Name'
              name='studentName'
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
            <ControlledTextInput<FormData, 'email'>
              label='Email'
              name='email'
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
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'facultyId'>
              name='facultyId'
              control={control}
              label='Faculty'
              placeholder='Select'
              rules={{ required: 'Please select your faculty' }}
              options={[
                { label: 'Select', value: '' },
                ...(faculty || []).map((fac) => ({
                  label: capitalizeEnum(fac.name)!,
                  value: fac.id,
                })),
              ]}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'degree'>
              name='degree'
              control={control}
              label='Degree'
              placeholder='Select'
              defaultValue='MTech'
              rules={{ required: 'Please select your degree' }}
              options={[{ label: 'Master of Technology', value: 'MTech' }]}
              isRequired
              readOnly
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'specialization'>
              name='specialization'
              control={control}
              label='Specialization'
              placeholder='Select'
              rules={{ required: 'Please select your Specialization' }}
              options={[
                { label: 'Select', value: '' },
                ...getSpecializationValues[
                  (spyDepartment as unknown as BranchesEnum) ?? BranchesEnum.CSE
                ].map((spe) => ({
                  label: spe.label,
                  value: spe.value,
                })),
              ]}
              isRequired
            />
          </div>
          <div className='mt-5'>
            <ControlledHTMLSelectInput<FormData, 'entrance'>
              name='entrance'
              control={control}
              label='Entrance'
              placeholder='Select'
              rules={{ required: 'Please select your entrance' }}
              options={[
                { label: 'Select', value: '' },
                { label: 'GATE', value: 'GATE' },
                { label: 'QIP', value: 'QIP' },
                { label: 'QIP(Poly)', value: 'QIP(Poly)' },
                { label: 'SELF-SPONSORED', value: 'SELF_SPONSORED' },
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
              onClick={() => navigate('/login/student')}
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

export default StudentRegisterScreen;
