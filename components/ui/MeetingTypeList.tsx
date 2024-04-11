"use client"

import Image from "next/image"
import HomeCard from "./HomeCard"

const MeetingTypeList = () => {
  return (
    <section className="grid grid-cols-1 gap-5 
     md:grid-cols-2 lg:grid-cols-4">
       <HomeCard 
            icon="/icon/add-meeting.svg"
            title="New Meeting"
            description="start an instant meeting"
            bgColor="bg-orange-1"
        />
       <HomeCard 
            icon="/icon/join-meeting.svg"
            title="Join Meeting"
            description="start an instant meeting"
            bgColor="bg-blue-1"
        />
       <HomeCard 
            icon="/icon/join-meeting.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            bgColor="bg-purple-1"
        />
       <HomeCard 
            icon="/icon/add-meeting.svg"
            title="View Recordings"
            description="Meeting Recordings"
            bgColor="bg-yellow-1"
        />
    </section>
  )
}

export default MeetingTypeList
