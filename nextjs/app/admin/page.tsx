'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import apiClient from '../lib/apiClient'
import { Form } from '../components/FormContext'
import Loader from '../components/Loader'

const AdminPage = () => {
  const [forms, setForms] = useState<Form[] | []>([])
  const [error, setError] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [loadState, setLoadState] = useState({
    loading: false,
    error: false
  })

  const sortedByName = (data: Form[]) => {
    return data.sort((a, b) => a.name.localeCompare(b.name))
  }

  useEffect(() => {
    const fetchForms = async () => {
      setLoadState({ loading: true, error: false });
      try {
        const response = await apiClient.get<Form[]>('/forms');
        const sortedData = sortedByName(response.data);
        setForms(sortedData);
        setLoadState({ loading: false, error: false });
      } catch (e) {
        console.error(`Failed to load forms: ${e}`);
        setLoadState({ loading: false, error: true });
      }
    };
  
    fetchForms();
  }, []);

  const checkUniquePages = (newPage: number) => {
    let count = 0
    for (const form of forms) {
      if (form.page == newPage) count++
    }

    return count == forms.length - 1
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, id: number) => {
    const newPage = Number(e.target.value)


    if (checkUniquePages(newPage)) {
      setError('Cannot set all forms to the same page.')
      return
    }
    
    setForms((prevForms) => 
      prevForms.map((form) => 
        form.id == id ? {...form, page: newPage } : form
      )
    )
    setHasChanges(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(error) {
      setError('')
    }

    try {
      const response = await apiClient.put(`/forms`, forms)
      const sortedData = sortedByName(response.data)
      setForms(sortedData)
      alert('Forms updated successfully!')
      setHasChanges(false)
    } catch (e) {
      setError(`Failed to update forms!`)
      console.error(`Failed to update forms: ${e}`)
    }
  }

  if (loadState.loading) {
    return <Loader />
  }

  if (loadState.error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <p className='text-red-500 text-center h-scree'>An error occurred while loading the data. Please try again later...</p>
      </div>
    );
  }
  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[30%] rounded-lg border border-gray-400 text-black flex flex-col justify-center items-center p-4'>
        <h1 className='font-extrabold mb-2 text-center'>Instructions:</h1>
        <p className='text-lg'>Select the page you would like each form to be located</p>
        <span className='font-bold mb-2'>Note: All forms can&#39;t be on one page, leaving another page empty.</span>
        <form className='w-full' onSubmit={handleSubmit}>
          {forms.map((form) => {
            const { id, name, page } = form

            return (
              <div key={id} className='mb-4'>
                <label htmlFor={name} className='block mb-1 font-bold'>
                  {name}
                </label>
                <select
                  id={name}
                  value={page}
                  onChange={(e) => handleChange(e, id)}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  <option value={2}>Page 2</option>
                  <option value={3}>Page 3</option>
                </select>
              </div>
            )
          })}

          {error && <p className='text-red-500 text-center'>{error}</p>}
          <div className='w-full flex justify-center items-center'>
            <button
              type='submit'
              disabled={!hasChanges}
              className={`w-[85%] mt-4 h-12 bg-green-950 hover:bg-green-800 text-white rounded ${hasChanges ? "" : 'pointer-events-none'}`}
            >
              Save Changes
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default AdminPage