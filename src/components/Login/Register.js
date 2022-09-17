import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    if (user || gUser) {
        console.log(user);
    }
    if(loading || gLoading || updating){
        return <Loading></Loading>
    }
    let errorMessage;
    if(error || gError || updateError){
        errorMessage = <p className='text-red-500 font-bold'>{error?.message || gError?.message || updateError?.message}</p>
    }
    const onSubmit = async(data) => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName:data.name });
        alert('Updated profile');
        navigate('/')
    }
    return (
        <div className='flex justify-center h-screen  items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Write your name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Fill Required Field'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className='text-red-500'>{error.name.message}</span>}
                            </label>
                        </div>
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
                        <input className="btn btn-accent w-full" type="submit" value="SignUp" />
                    </form>
                    <div className="divider">OR</div>
                    <p><small>Already Have an Account? <Link to='/login' className='text-primary'>Please Login</Link></small></p>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-primary">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;