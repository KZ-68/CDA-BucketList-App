'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import React from 'react';

const LoginPage = () => {

  return (
    <>
        <div className='flex flex-row justify-center items-center gap-56'>
            <hgroup>
                <h1 className='text-6xl'>
                    <span className='bg-thirdColor'>MY</span><br/>
                    <span className='font-secondary'>BUCKET</span>
                    <span className='text-4xl'>List</span>
                </h1>
            </hgroup>
            <div className='flex flex-col gap-10'>
                <div className='text-3xl bg-accentColor py-3 px-9 rounded-lg text-center'>
                    <SignInButton />
                </div>
                <div className='text-3xl border-[2px] border-black py-3 px-4 rounded-lg text-center'>
                    <SignUpButton />
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage