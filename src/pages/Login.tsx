import React from 'react';
import LoginForm from '../features/LoginForm';

const Login : React.FC = () => {
    return (
        <main className="h-[100vh] w-[100vw] flex items-center justify-center styled-bg">
            <LoginForm/>
        </main>
    );
};

export default Login;