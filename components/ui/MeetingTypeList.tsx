"use client"

import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"

const MeetingTypeList = () => {

    const router = useRouter()
    const [meetingState, setMeetingState] = 
    useState<'isScheduleMeeting' | 'isJoiningMeeting' |
    'isInstantMeeting' | undefined>(); 
    const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 gap-5 
     md:grid-cols-2 lg:grid-cols-4">
       <HomeCard 
            icon="/icons/add-meeting.svg"
            title="New Meeting"
            description="start an instant meeting"
            bgColor="bg-orange-1"
            handleClick={() => setMeetingState('isInstantMeeting')}
        />
       <HomeCard 
            icon="/icons/join-meeting.svg"
            title="Join Meeting"
            description="start an instant meeting"
            bgColor="bg-blue-1"
            handleClick={() => setMeetingState('isJoiningMeeting')}
        />
       <HomeCard 
            icon="/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            bgColor="bg-purple-1"
            handleClick={() => setMeetingState('isScheduleMeeting')}
        />
       <HomeCard 
            icon="/icons/recordings.svg"
            title="View Recordings"
            description="Meeting Recordings"
            bgColor="bg-yellow-1"
            handleClick = {() => router.push('/recordings')}
        />

        <MeetingModal
            isOpen = {meetingState === "isInstantMeeting"}
            onClose={() => setMeetingState(undefined)}
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
            title="Start an instant Meeting"
        />

    </section>
  )
}

export default MeetingTypeList
