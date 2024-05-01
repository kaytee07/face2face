
import StreamVideoProvider from '@/providers/streamClientProvider';
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Webmeet",
  description: "video calling application",
  icons: {
    icon: "/icons/logo.svg"
  }
};

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </div>
  )
}

export default RootLayout
