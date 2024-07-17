import classNames from 'classnames';
import CachedIcon from '@mui/icons-material/Cached';

export interface DefaultLoaderProps {
  className?: string | undefined;
}

const DefaultLoader: React.FC<DefaultLoaderProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        'w-full h-full flex items-center justify-center p-5',
        className
      )}
      title='Loading...'
    >
      <CachedIcon className='animate-spin text-primary' />
    </div>
  );
};

export default DefaultLoader;
