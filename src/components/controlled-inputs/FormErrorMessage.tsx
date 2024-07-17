interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  return <p className='text-danger text-sm'>{message}</p>;
};

export default FormErrorMessage;
