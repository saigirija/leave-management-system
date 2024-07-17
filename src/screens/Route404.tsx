import React from 'react';
import { Link } from 'react-router-dom';
import NotFound404Img from '../assets/icons/404.svg';

interface Route404Props {}

const Route404: React.FC<Route404Props> = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center -mt-10'>
      <div>
        <img src={NotFound404Img} alt='404' />
        <p className='text-center font-primary-medium text-dark text-lg'>
          Hmm...we can't seem to find that.
        </p>
      </div>
      <Link
        to='/'
        className='bg-primary rounded text-white items-center p-2 my-4 mx-auto'
      >
        Go Home
      </Link>
    </div>
  );
};

export default Route404;
