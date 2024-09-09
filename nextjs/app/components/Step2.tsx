'use client'
import React from 'react'

interface IProps {
  forms: React.ReactElement[],
  errors: string[]
  handleSubmit: () => void
}

const Step2: React.FC<IProps> = ({ forms, errors, handleSubmit }) => {
  return (
    <div className='w-[80%] md:w-[30%] rounded-lg shadow-xl border border-gray-400 text-black flex flex-col justify-center items-center p-4'>
      <div>
        {forms.map((form, idx) => (
          <div key={idx} className="mb-4">
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
        <div className='flex justify-end items-center'>
          <button 
            className='w-24 h-12 bg-green-950 hover:bg-green-800 text-white rounded-xl'
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