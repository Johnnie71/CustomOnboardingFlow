'use client'
import React, { ChangeEvent, useEffect } from 'react'
import { useFormState } from '../FormContext'

interface IProps {
  gatherRequiredFields: (fields: string[]) => void;
} 

const AddressForm: React.FC<IProps> = ({ gatherRequiredFields }) => {
  const { formData, setFormData } = useFormState()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const fields = ['street_address', 'city', 'state', 'zip_code']

  useEffect(() => {
    console.log('Component mounted. Gathering required fields.');
    gatherRequiredFields(fields)
  }, [])
  
  return (
  <form className='text-black w-full'>
    <div className='flex flex-col py-2'>
      <label htmlFor='street_address' className='font-bold'>Street Address</label>
      <input 
        type='text' 
        name='street_address' 
        placeholder='Street Address' 
        value={formData?.street_address || ''} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
    <div className='flex flex-col w-full py-2'>
      <label htmlFor='city' className='font-bold'>City</label>
      <input 
        type='text' 
        name='city' 
        placeholder='City' 
        value={formData?.city || ''} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
    <div className='flex flex-col w-full py-2'>
      <label htmlFor='state' className='font-bold'>State</label>
      <input 
        type='text' 
        name='state' 
        placeholder='State' 
        value={formData?.state || ''} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
    <div className='flex flex-col w-full py-2'>
      <label htmlFor='zip_code' className='font-bold'>Zip Code</label>
      <input 
        type='text' 
        name='zip_code' 
        placeholder='Zip Code'
        pattern="[0-9]{5}"
        maxLength={5}
        value={formData?.zip_code || ''} 
        onChange={handleChange}
        required
        className='border border-gray-500 rounded-md p-2 bg-gray-100'
      />
    </div>
  </form>
)
}

AddressForm.displayName = 'Address'

export default AddressForm