import React, {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react'
import { User, useFormState } from '../FormContext'

interface IProps {
  requiredFields: string[],
  setRequiredFields: Dispatch<SetStateAction<string[]>>,
}

const BirthdayForm: React.FC<IProps> = ({ requiredFields, setRequiredFields }) => {
  const { formData, setFormData } = useFormState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  useEffect(() => {
    if (requiredFields.length > 0) {
      setRequiredFields([])
    }

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
        className='border border-gray-500 rounded bg-gray-100' 
        placeholder='Tell us about yourself!' 
        onChange={handleChange}
        value={formData?.birthday || ''}
        required
      />
    </form>
  )
}

export default BirthdayForm