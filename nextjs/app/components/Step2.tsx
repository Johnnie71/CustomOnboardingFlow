'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { User, useFormState } from '@/app/components/FormContext'
import AboutMeForm from './forms/AboutMeForm'
import apiClient from '../lib/apiClient'

const Step2 = () => {
  const { user, handleUpdateUser, onHandleNext} = useFormState()
  const [formData, setFormData] = useState(user || {})
  const [errors, setErrors] = useState<string[] | []>([])
  const [requiredFields, setRequiredFields] = useState<string[] | []>([]) 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setErrors([])

    const newErrors: string[] = []
    for (const field of requiredFields) {
      const value = (formData as any)[field]
      if (!value || (typeof value == 'string' && !value.trim())){ // if value is null or whitespace create an error
        newErrors.push(`Enter something for ${field} field`)
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    try{
      const response = await apiClient.patch<User>(`/users/${user?.id}`, {
        ...formData
      })

      handleUpdateUser(response.data)
      console.log(`User user updated: ${Object.entries(response.data)}`)
      onHandleNext()
    } catch (err) {
      setErrors((prevError) => [...prevError, 'Failed to update user'])
      console.error(`API error: ${err}`)
    }
  }

  return (
    <div className='w-full text-black flex flex-col justify-center items-center'>
      <div>
        <AboutMeForm handleChange={handleChange} formData={formData} setRequiredFields={setRequiredFields} />
        {errors.length > 0 && (
          <div className='text-center text-red-600 font-mono'>
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
        )}
        <div className='flex justify-end items-center p-4'>
          <button 
            className='w-24 h-12 bg-green-950 hover:bg-green-800 text-white rounded'
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step2