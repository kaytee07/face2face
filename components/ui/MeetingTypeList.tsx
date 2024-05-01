"use client"

import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"
import { Toast } from "./toast"
import { Textarea } from "./textarea"
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
    const { toast } = useToast();
    const router = useRouter()
    const [meetingState, setMeetingState] = 
    useState<'isScheduleMeeting' | 'isJoiningMeeting' |
    'isInstantMeeting' | undefined>(); 
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [callValues, setCallValues] = useState({
      dateTime: new Date(),
      description: '',
      link: ""
    });
    const [callDetails, setCallDetails] = useState<Call>()

    const createMeeting = async () => {
      if(!user || !client) return
      try {
        if(!callValues.dateTime){
          toast({ title: "Please select a date and time" });
        }

        const id = crypto.randomUUID();
        const call = client.call('default', id);

        if(!call) throw new Error('Failed to create call');

        const startsAt = callValues.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
        const description = callValues.description || 'Instant Meeting';
        
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description
            }
          }
        })

        setCallDetails(call)

        if(!callValues.description){
          router.push(`/meeting/${call.id}`)
        }

        toast({title: "Meeting created"});
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to create meeting",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    };

    const meetingLink = `${process.env.
      NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

      {!callDetails ? (
        <MeetingModal
            isOpen = {meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            handleClick={createMeeting}
            title="Create Meeting"
            className="flex justify-center"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal
            leading-[22px]">Add a description</label>
            <Textarea className="border-none bg-dark-3
            focus-visible:ring-0
            focus-visible:ring-offset-0"
            onChange={(e) => {
              setCallValues({...callValues, description: e.target.value})
            }}/>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal
            leading-[22px]">Add a description</label>
            <ReactDatePicker
              selected={callValues.dateTime}
              onChange={(date: any) => setCallValues({
                ...callValues, dateTime:date
              })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:m aa"
              className="w-full rounded bg-dark-3 p-2
              focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
            isOpen = {meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({ description: "Link copied"})
            }}
            title="Meeeting Created"
            className="text-center"
            buttonText="Copy link"
            image="/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
        />
      )}
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
