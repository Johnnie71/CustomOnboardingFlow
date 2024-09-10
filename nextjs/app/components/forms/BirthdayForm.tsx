import React, {ChangeEvent, useEffect} from 'react'
import { useFormState } from '../FormContext'

interface IProps {
  gatherRequiredFields: (fields: string[], currStep: number) => void;
}

const BirthdayForm: React.FC<IProps> = ({ gatherRequiredFields }) => {
  const { formData, setFormData, step } = useFormState()
  const fields = ['birthday']

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  useEffect(() => {
    gatherRequiredFields(fields, step)
  }, [])

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
BirthdayForm.displayName = 'Birthday'

export default BirthdayForm