'use client'
import React from 'react'
import SignUpForm from './forms/SignupForm'

const Step1 = () => {
  return (
    <div className='w-[80%] md:w-[30%] rounded-lg shadow-xl border border-gray-400 text-black flex flex-col justify-center items-center'>
      <SignUpForm />
    </div>
  )
}

export default Step1