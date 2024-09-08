'use client'
import React from 'react'
import SignUpForm from './forms/SignupForm'
import { useFormState } from './FormContext'

const Step1 = () => {
  const {step} = useFormState()
  return (
    <div className='w-[30%] rounded-lg shadow-xl border border-gray-400 text-black flex flex-col justify-center items-center'>
      <h1 className='font-extrabold mb-2 text-center'>Step {step}</h1>
      <SignUpForm />
    </div>
  )
}

export default Step1