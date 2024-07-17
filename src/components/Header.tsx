import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveAuthUserDetails } from '../slices/AuthSlice';
import { deleteAuthCookie, getAuthCookie } from '../utils/ApiUtils';
import Button from './Button';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getAuthCookie();

  return (
    <header className='relative w-full flex justify-center items-center bg-transparent px-4 py-5'>
      <h1 className='font-sans font-bold text-lg leading-5 text-dark-9'>
        Leave Management System
      </h1>
      {token && (
        <Button
          label='Logout'
          variant='danger-outline'
          onClick={() => {
            deleteAuthCookie();
            dispatch(saveAuthUserDetails(undefined));
            navigate('/');
          }}
          className='absolute right-[8.5%]'
        />
      )}
    </header>
  );
};

export default Header;
