"use client"
import MeetingRoom from "@/components/ui/MeetingRoom";
import MeetingSetup from "@/components/ui/MeetingSetup";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";


const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [ isSetUpComplete, setIsSetupComplete ] = useState(false);


  return (
    <main className="h-screen w-full">
      <StreamCall>
        <StreamTheme>
          {
            !isSetUpComplete ? ( 
              <MeetingSetup/> 
            ):(
              <MeetingRoom/>
            )
          }
        </StreamTheme>
      </StreamCall>
        Meeting Room: #{params.id}
    </main>
  )
}

export default Meeting
