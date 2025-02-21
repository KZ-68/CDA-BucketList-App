import React from 'react'

interface GoalHighlightsItemProps {
    text: string;
    variable: string;
  }
  

const GoalHighlightsItem = ({ text, variable }: GoalHighlightsItemProps) => {
  return (
    <div className='translate-x-[-6px] mb-6'>
        <div className='flex items-center gap-3'>
            <div className='bg-accentColor w-3 h-3 rounded-full'></div>
            <p className='text-xl'>{text}</p>
        </div>
        <div className='flex items-center gap-3'>
            <div className='w-3 h-3 rounded-full'></div>
            <p className='text-lg opacity-50'>{variable}</p>
        </div>
    </div>
  )
}

export default GoalHighlightsItem