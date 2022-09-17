import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import { Link } from 'react-router-dom';
const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    if (user || gUser) {
        console.log(user);
    }
    if(loading || gLoading){
        return <Loading></Loading>
    }
    let errorMessage;
    if(error || gError){
        errorMessage = <p className='text-red-500 font-bold'>{error?.message || gError?.message}</p>
    }
    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    }
    return (
        <div className='flex justify-center h-screen  items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Fill Required Field'
                                    },
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
                                        message: 'Please Give a Valid Email' // JS only: <p>error message</p> TS only support string
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className='text-red-500'>{error.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className='text-red-500'>{error.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Fill Required Field'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'error message' // JS only: <p>error message</p> TS only support string
                                      }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className='text-red-500'>{error.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>{error.password.message}</span>}
                            </label>
                        </div>
                        {errorMessage}
                        <input className="btn btn-accent w-full" type="submit" value="Login" />
                    </form>
                    <div className="divider">OR</div>
                    <p><small>New to Doctors Portal? <Link to='/signup' className='text-primary'>Create a New Account</Link></small></p>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-primary">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;