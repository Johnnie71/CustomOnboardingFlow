'use client'
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from '../FormContext'

interface IProps {
  requiredFields: string[],
  setRequiredFields: Dispatch<SetStateAction<string[]>>
}

const AboutMeForm: React.FC<IProps> = ({ requiredFields, setRequiredFields }) => {
  const {formData, setFormData } = useFormState()
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement >) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  useEffect(() => {
    if (requiredFields.length > 0) {
      setRequiredFields([])
    }
    
    setRequiredFields(prevFields => {
        if(!prevFields.includes('about')) {
          return [...prevFields, 'about']
        }

        return prevFields
      })
  }, [setRequiredFields])

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

export default AboutMeForm