import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
import Route404 from '../screens/Route404';

const GuestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<IntroScreen />} />
      <Route path='/login/:user' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='*' element={<Route404 />} />
    </Routes>
  );
};

export default GuestRoutes;
