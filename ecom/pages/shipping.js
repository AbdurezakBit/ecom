import React from 'react'
import { useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'

function shipping() {
    const {
        hundelSubmit,
        register,
        formState: {error},
        setValue,
        getValue,
    } = useForm();

    submitHandler = () =>{}
  return (
   <Layout title="Shipping Address">
    <CheckoutWizard activeStep = {1}/>
    <form className='mx-auto max-w-screen-md'
      onSubmit = {hundelSubmit(submitHandler)}
    >
     <h1 className='mb-4 text-xl'>Shipping Address</h1>
     <div className='mb-4'>
        <label htmlFor='fullName'>Full Name</label>
        <input className='w-full'
        autoFocus {...register('fullName',{required: 'Please enter full name',})}/>
        {errors.fullName &&(<div className='text-red-500'>{errors.fullName.message}</div>)}
     </div>
    </form>
   </Layout>
  )
}

export default shipping