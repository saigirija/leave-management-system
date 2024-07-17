import WarningRounded from '@mui/icons-material/WarningRounded';

export interface DefaultErrorProps {
  message: string;
}

const DefaultError: React.FC<DefaultErrorProps> = ({ message }) => {
  return (
    <div className='w-full h-full p-5 flex flex-col items-center justify-center'>
      <WarningRounded className='text-danger' fontSize='large' />
      <p className='font-sans font-medium'>{message}</p>
    </div>
  );
};

export default DefaultError;
