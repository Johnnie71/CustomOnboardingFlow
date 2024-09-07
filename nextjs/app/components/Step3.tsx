'use client'
import React, { FormEvent } from 'react'
import { useFormState } from '@/app/components/FormContext'

interface IProps {
  forms: React.ReactElement[],
  errors: string[]
  handleSubmit: (lastStep: boolean) => void
}

const Step3: React.FC<IProps> = ({forms, errors, handleSubmit}) => {
  const { onHandleBack } = useFormState()

  return (
    <div className='w-full text-black flex flex-col justify-center items-center'>
      <h1 className='font-extrabold mb-2 text-center'>Step 3</h1>
        {forms.map((form, idx) => (
            <div key={idx} className="w-full px-2"> {/* Unique key and some spacing between forms */}
              {form}
            </div>
          ))}
        {errors.length > 0 && (
          <div className='text-center text-red-600 font-mono'>
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
        )}
        <div className='flex justify-around items-center py-2 w-full'>
          <button 
            className='w-28 h-12 bg-green-950 hover:bg-green-800 text-white rounded-xl'
            onClick={onHandleBack}
          >
            Back
          </button>
          <button 
            className='w-28 h-12 bg-green-950 hover:bg-green-800 text-white rounded-xl'
            onClick={() => handleSubmit(true)}
          >
            Submit
          </button>
      </div>
    </div>
  )
}

export default Step3