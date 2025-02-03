
// import Image from "next/image";
import React from 'react'

const Home = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl'>Bucket list ✨</h1>
      <p className='text-xl'>Things to do before you die 💀 </p>
      <p className='text-xs'>Hurry up</p>
    </div>

    <div>
        <p>See what&apos;s on My List</p>
        <p>Start a New Adventure</p>
        <p>Get inspired by Others</p>
        <p>Track My Progress</p>
    </div>
    
    </>
  );
}

export default Home