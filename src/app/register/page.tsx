import AuthForm from '@/components/AuthForm';

const RegisterPage = () => {
    return (
        <div className='flex justify-around items-center'>
            <img className='registerimg mt-3' src="/registerPage.png" alt="" />
            <AuthForm />
        </div>
    );
};

export default RegisterPage;
