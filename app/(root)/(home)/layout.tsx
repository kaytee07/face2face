import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='relative'>
        <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-6 
        max-md:pb-14 sm:px-14'>
            <div className="w-full">
                {children}
            </div>
        </section>
      </div>
      Footer
    </div>
  )
}

export default HomeLayout