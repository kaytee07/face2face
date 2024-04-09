import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './ui/MobileNav'

const Navbar = () => {
  return (
    <nav className='flex-between x-50 w-full bg-dark-1
     px-6 py-1 lg:px-10'>
      <Link
        href="/"
        className='flex items-center gap-1'
      >
        <Image
           src="/icons/logo.svg"
           alt='F2F logo'
           height={32}
           width={32}
           className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'
        >Face2Face</p>
      </Link>
      <div className="flex-between">
        {/* clerk user management */}

        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar
