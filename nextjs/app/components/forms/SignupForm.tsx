'use client'
import React, { useState, ChangeEvent } from 'react'
import { validateEmail } from '@/app/lib/helpers'
import apiClient from '@/app/lib/apiClient'
import { User, useFormState } from '../FormContext'

const SignUpForm: React.FC = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    reEnterPassword: ''
  })
  const [error, setError] = useState<string[] | []>([])
  const { handleSetUser, onHandleNext } = useFormState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password, reEnterPassword } = formData

    if (error) {
      setError([])
    }

    if (!validateEmail(email)) {
      setError((prevErrors) => [...prevErrors, "Unable to validate email address: Invalid format"])
      return
    }

    // Validate password and reEnterPassword (empty or whitespace)
    if (!password.trim()) {
      setError((prevErrors) => [...prevErrors, "Please enter a password"])
      return
    }

    if (!reEnterPassword.trim()){
      setError((prevErrors) => [...prevErrors, "Please re-enter the password"])
      return
    }

    // Checking if they match
    if (password !== reEnterPassword) {
      setError((prevErrors) => [...prevErrors, "Passwords must match"])
      return
    }

    try{
      const response = await apiClient.post<User>('/users', {
        email,
        password
      })

      handleSetUser(response.data)
      console.log(`User created: ${Object.entries(response.data)}`)
      onHandleNext()
    } catch (err) {
      setError((prevError) => [...prevError, 'Failed to create user'])
      console.error(`API error: ${err}`)
    }
   
  }
  
  return (
  <form onSubmit={handleSubmit} className='text-black w-full'>
    <div className='flex flex-col px-4 py-2'>
      <label htmlFor='email' className='font-bold'>Email</label>
      <input 
        type='email' 
        name='email' 
        placeholder='Email' 
        value={formData.email} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
    <div className='flex flex-col w-full px-4 py-2'>
      <label htmlFor='password' className='font-bold'>Password</label>
      <input 
        type='password' 
        name='password' 
        placeholder='Password' 
        value={formData.password} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
    <div className='flex flex-col w-full px-4 py-2'>
      <label htmlFor='reEnterPassword' className='font-bold'>Re-enter password</label>
      <input 
        type='password' 
        name='reEnterPassword' 
        placeholder='Re-enter Password' 
        value={formData.reEnterPassword} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
    {error.length > 0 && (
      <div className='text-center text-red-600 font-mono'>
        {error.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
    )}
    <div className='flex justify-center items-center px-4 py-2'>
      <button 
        type='submit'
        className='w-[60%] h-12 bg-green-950 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'
      > 
        Get Started
      </button>
    </div>
  </form>
)
}

export default SignUpForm