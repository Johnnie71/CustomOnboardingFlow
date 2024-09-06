'use client'
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { User } from '../FormContext'

interface IProps {
  formData: User
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  setRequiredFields: Dispatch<SetStateAction<string[]>>
}

const AboutMeForm: React.FC<IProps> = ({ handleChange, setRequiredFields, formData }) => {

  useEffect(() => {
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
        className='border-2 rounded' 
        placeholder='Tell us about yourself!' 
        onChange={handleChange}
        value={formData.about || ''}
        required
      />
    </form>
  )
}

export default AboutMeForm