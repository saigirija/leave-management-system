import { useSelector } from 'react-redux';
import FacultyDashboard from '../components/FacultyDashboard';
import StudentDashboard from '../components/StudentDashboard';
import { RootState, UserTypeEnum } from '../types';
import Route404 from './Route404';

const HomeScreen = () => {
  const { authUserResponse } = useSelector((state: RootState) => state.auth);

  if (authUserResponse?.role === UserTypeEnum.STUDENT) {
    return <StudentDashboard />;
  }

  if (authUserResponse?.role === UserTypeEnum.FACULTY) {
    return <FacultyDashboard />;
  }

  return <Route404 />;
};

export default HomeScreen;
