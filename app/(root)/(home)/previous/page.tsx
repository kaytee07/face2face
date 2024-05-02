import CallList from '@/components/ui/CallList';
import React from 'react'

const Previous = () => {
  return (
    <section className='flex flex-col size-full text-white gap-10'>
        <h1 className='text-3xl font-bold'>
            Previous
        </h1>
        <CallList type="ended" />
    </section>
  )
}

export default Previous;
