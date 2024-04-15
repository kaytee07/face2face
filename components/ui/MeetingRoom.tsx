import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStats, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'


type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
  const [layout, setLayOut] = useState<CallLayoutType>()
  const [showParticipant, setShowParticipant] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout/>
      case "speaker-left":
        return <SpeakerLayout
        participantsBarPosition="left"/>
      default:
        return <SpeakerLayout
        participantsBarPosition="right"/>
    }
  }

  return (
    <section className="relative h-screen w-full text-white
     overflow-hidden pt-4">
      <div className="relative flex size-full
       items-center justify-center">
        <div className="flex size-full max-w-[1000px]
         items-center">
          <CallLayout/>
        </div>
        <div className={cn("h-[calc(100vh-86px)] hidden ml-2",
        { 'show-block': showParticipant})}>
          <CallParticipantsList onClose={() => setShowParticipant(false)}/>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full
       items-center justify-center gap-5">
        <CallControls/>
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer
             rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white"/>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            <DropdownMenuLabel>Layouts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[ 'grid', 'speaker-left', 'speaker-right' ].map((layout, index) => {
              return (<div key={index}>
                <DropdownMenuItem className="cursor-pointer"
                 onClick={() => {
                  setLayOut(layout.toLowerCase() as CallLayoutType)
                 }}
                >
                  {layout}
                </DropdownMenuItem>
              </div>)
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={() => setShowParticipant((prev) => !prev)}>
            <div className="cursor-pointer
             rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white"/>
            </div>
        </button>
      </div>
    </section>
  )
}

export default MeetingRoom
