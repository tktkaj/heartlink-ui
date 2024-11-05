import React from 'react'

export default function MessageApplyModal({handleMessageAgree, handleMessageReject}) {
    return (
        <div>
            <div className="fixed bg-slate-500 top-0 left-0 bottom-0 right-0 opacity-96" >
            </div>
            <div className="absolute top-1/2 right-1/4 transform -translate-x-1/4 -translate-y-1/2 border-solid border-2 border-slate-300 w-96 rounded-3xl pt-2 bg-white">
                <div className='flex justify-center items-center p-10'>
                    <p className='text-xl'>메시지를 수락하시겠습니까?</p>
                </div>
                <div className='flex justify-center items-center pb-10 gap-10'>
                    <div>
                        <button className='bg-purple-300 px-5 py-2 rounded-lg text-white' onClick={handleMessageAgree}>수락</button>
                    </div>
                    <div>
                        <button className='bg-gray-300 px-5 py-2 rounded-lg' onClick={handleMessageReject}>거절</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
