import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Layout from '../components/Layout';

const IntroScreen = () => {
  const navigation = useNavigate();
  return (
    <Layout>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='space-y-5 w-1/3 mt-24'>
          <Button
            label='Faculty'
            variant='secondary-outline'
            onClick={() => navigation('/login/faculty')}
            className='w-full'
          />
          <Button
            label='Student'
            variant='secondary-outline'
            onClick={() => navigation('/login/student')}
            className='w-full'
          />
        </div>
      </div>
    </Layout>
  );
};

export default IntroScreen;
