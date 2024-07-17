import TableChartIcon from '@mui/icons-material/TableChart';

export interface DefaultEmptyProps {
  message: string;
  icon?: React.ReactElement;
}

const DefaultEmpty: React.FC<DefaultEmptyProps> = ({
  message,
  icon = <TableChartIcon fontSize='large' />,
}) => {
  return (
    <div className='w-full h-full p-5 flex flex-col items-center justify-center'>
      {icon}
      <p className='font-sans text-gray-400'>{message}</p>
    </div>
  );
};

export default DefaultEmpty;
