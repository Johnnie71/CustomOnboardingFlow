import React, {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react'
import { User } from '../FormContext'

interface IProps {
  formData: User
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  setRequiredFields: Dispatch<SetStateAction<string[]>>
}

const BirthdayForm: React.FC<IProps> = ({handleChange, setRequiredFields, formData }) => {

  useEffect(() => {
    setRequiredFields(prevFields => {
        if(!prevFields.includes('birthday')) {
          return [...prevFields, 'birthday']
        }

        return prevFields
      })
  }, [setRequiredFields])

  return (
    <form className='text-black flex flex-col rounded-lg w-full'>
      <label htmlFor='about' className='font-bold'>Birth Date</label>
      <input 
        type='date'
        name='birthday' 
        className='border-2 rounded' 
        placeholder='Tell us about yourself!' 
        onChange={handleChange}
        value={formData.birthday || ''}
        required
      />
    </form>
  )
}

export default BirthdayForm