'use client'
import React, {useState, useEffect } from 'react'
import { User } from '../components/FormContext'
import apiClient from '../lib/apiClient'
import Loader from '../components/Loader'

const Data = () => {
  const [usersData, setUsersData] = useState<User[] | []>([])
  const [loadState, setLoadState] = useState({
    loading: false,
    error: false
  })

  useEffect(() => {

    const fetchUsers = async () => {
      setLoadState({ loading: true, error: false });
      try{
        const response = await apiClient.get<User[]>('/users')
        setUsersData(response.data)
      } catch(e) {
        console.error(`Failed to load forms: ${e}`)
        setLoadState({ loading: false, error: true });
      }

      setLoadState({ loading: false, error: false });
    }

    fetchUsers()
  }, [])

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
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-serif font-bold mb-6">Users</h1>
      <div className="w-[80%] overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b border-gray-300 border-r">Email</th>
              <th className="px-4 py-2 text-left border-b border-gray-300 border-r">About</th>
              <th className="px-4 py-2 text-left border-b border-gray-300 border-r">Birth Date</th>
              <th className="px-4 py-2 text-left border-b border-gray-300 border-r">Street Address</th>
              <th className="px-4 py-2 text-left border-b border-gray-300 border-r">City</th>
              <th className="px-4 py-2 text-left border-b border-gray-300 border-r">State</th>
              <th className="px-4 py-2 text-left border-b border-gray-300">Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {usersData &&
              usersData.map((user) => {
                const { id, email, about, birthday, street_address, state, city, zip_code } = user;
                return (
                  <tr key={id} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{email}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{about}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{birthday}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{street_address}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{city}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{state}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{zip_code}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Data