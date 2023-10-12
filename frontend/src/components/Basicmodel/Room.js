import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const Room = () => {
    const { roomId } = useParams();
    const Meetings = async(element) => {
        const appID = 519288262;
        const serverSecret = "6ba0f95aec34138c33ae5a6d54a88ae7";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,Date.now().toString(), "Aditya Bharti");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks: [
                {
                  name: 'Copy link',
                  url:`http://localhost:3001/dashboard/chatpannel/room/${roomId}`
                },
              ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true        })
    }
  return (
    <div className='flex justify-center items-center h-screen radial-green'>
        <div ref={Meetings}/>
    </div>
  )
}

export default Room