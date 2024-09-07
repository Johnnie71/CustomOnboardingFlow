import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-screen gap-x-2 flex justify-center items-center">
      <div className="w-5 h-5 bg-green-700 rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-green-800 rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-green-900 rounded-full animate-bounce"></div>
    </div>
  )
}

export default Loader