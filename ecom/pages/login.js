import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import {appendErrors, useForm} from 'react-hook-form'

function login() {

    const {handleSubmit,
           register,
           formState: {errors}      
    } = useForm()

    const submitHandler = ({email,password}) => {

    }
  return (
    <Layout title='Login'>
        <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl'>Login</h1>
            <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input type='email'  {...register('email', {required: 'Please enter an email', 
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter a valid email'
                }})}className='w-full' id='email' autoFocus></input>
                {errors.email && (<div className='text-red-800'>{errors.email.message}</div>)}
            </div>

            <div className='mb-4'>
                <label htmlFor='password'>Password</label>
                <input type='password' {...register('password',{
                    required: 'Please enter password',
                    minLength: {value: 3, message: 'password must be more than 5 chars'}
                })} className='w-full' id='password' autoFocus></input>
                {errors.password && (<div className='text-red-800'>{errors.password.message}</div>)}
            </div>
            <div className='mb-4'>
                <button className='primary-button'>Login</button>
            </div>

            <div className='mb-4'>
                Don&apos;t have an account? &nbsp;
                <Link href='#'>Rgister</Link>
            </div>

        </form>
    </Layout>
  )
}

export default login