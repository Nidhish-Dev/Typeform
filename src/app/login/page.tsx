// src/app/login/page.tsx
import AuthForm from '@/components/AuthForm';

const LoginPage = () => {
    return (
        <div className='flex justify-around items-center'>
  
            <AuthForm isLogin />
            <img className='registerimg mt-3' src="/loginPage.png" alt="" />
        </div>
    );
};

export default LoginPage;
