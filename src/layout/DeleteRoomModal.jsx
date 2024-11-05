import React from 'react'

export default function DeleteRoomModal({handleDeleteMessageModal, deleteRoom, handleDeleteMsgRoom }) {
    return (
        <div>
            <div className="fixed bg-white top-0 left-0 bottom-0 right-0 opacity-10" onClick={()=>{handleDeleteMessageModal(deleteRoom)}}>
            </div>
            <div className="absolute top-1/2 right-1/4 transform -translate-x-1/4 -translate-y-1/2 border-solid border-2 border-slate-300 w-96 rounded-3xl pt-2 bg-white" >
                <div className='flex justify-center items-center text-lg py-5'>
                    <div><p>이 유저와의 채팅을 종료하시겠습니까?</p></div>
                </div>
                <div className='flex justify-center items-center gap-16 pb-5'>
                    <button className='bg-indigo-400 px-4 py-2 text-white rounded-lg' onClick={handleDeleteMsgRoom}>나가기</button>
                    <button className='bg-slate-300 px-4 py-2 rounded-lg' onClick={()=>{handleDeleteMessageModal(deleteRoom)}}>취소</button>
                </div>
            </div>
        </div>
    )
}
