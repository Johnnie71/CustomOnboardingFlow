'use client'
import React, { ChangeEvent, useEffect } from 'react'
import { useFormState } from '../FormContext'

interface IProps {
  gatherRequiredFields: (fields: string[]) => void;
}

const AboutMeForm: React.FC<IProps> = ({ gatherRequiredFields }) => {
  const { formData, setFormData } = useFormState()
  const fields = ['about']
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement >) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  useEffect(() => {
    console.log('Component mounted. Gathering required fields.');
    gatherRequiredFields(fields)
  }, [])

  return (
    <form className='text-black flex flex-col rounded-lg w-full'>
      <label htmlFor='about' className='font-bold'>About Me</label>
      <textarea 
        name='about'
        rows={4} 
        cols={40} 
        className='border border-gray-500 rounded bg-gray-100' 
        placeholder='Tell us about yourself!' 
        onChange={handleChange}
        value={formData?.about || ''}
        required
      />
    </form>
  )
}

AboutMeForm.displayName = 'About'

export default AboutMeForm
