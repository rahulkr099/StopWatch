import Stopwatch from './Stopwatch.jsx'
import React from 'react';
function App() {
  

  return (
    <div className='w-screen h-screen bg-blue-500 flex justify-center items-center'>
      <div className='absolute top-24 text-5xl text-white font-medium shadow-2xl hover:text-orange-400 hover:cursor-pointer'>StopWatch</div>
      <Stopwatch></Stopwatch>
    </div>
  )
}

export default App
