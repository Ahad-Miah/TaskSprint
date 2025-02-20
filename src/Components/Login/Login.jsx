import React from 'react';

const Login = () => {
    return (
        <div className='h-48 border p-7 text-center border-gray-400 mx-auto w-80 rounded-lg flex flex-col items-center justify-center gap-4 mt-20'>
            <h3 className='text-2xl font-bold text-center'>Login</h3>
           <button className='bg-blue-700 text-white font-semibold p-3 rounded-lg hover:bg-blue-800'>Login With Google</button>
        </div>
    );
};

export default Login;