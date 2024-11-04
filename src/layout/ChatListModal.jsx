import React from 'react'
import TestImg from '../image/mypage/bono.jpg'
import { useState } from 'react'

export default function ChatListModal() {

    // const list = [];
    const list = [{ img: "img1", name: "tktkaj", userId: 1 }, { img: "img2", name: "heehee", userId: 2 }, { img: "img2", name: "heehee", userId: 3 }, { img: "img2", name: "heehee", userId: 4 }, { img: "img2", name: "heehee", userId: 5 }]
    const [x, setX] = useState([]);
    const [userId, setUserId] = useState();

    //  radio버튼 누를시 해당되는 유저의 userId 가져오기
    const handleClickRadioButton = (e, userId) => {
        setX(e.target.value);
        setUserId(userId);
    }

    // 리스트 가져오는 함수 작성

    return (
        <div>
            <div className="fixed bg-slate-500 top-0 left-0 bottom-0 right-0 opacity-80">
            </div>
            <div className="absolute top-1/2 right-1/4 transform -translate-x-1/4 -translate-y-1/2 border-solid border-2 border-slate-300 w-96 rounded-3xl pt-2 bg-white">
                <div className="flex justify-center border-solid  border-b-2 border-slate-300 pb-2"><p className="text-xl">새로운 메시지</p></div>
                <div className="flex justify-start border-solid pl-5 border-b-2 border-slate-300 gap-1 pt-2 pb-2">
                    <div className="flex items-center text-sm w-16"><p>친구 검색: </p></div>
                    <div className="flex items-center"><input type='text' className="text-sm w-48 outline-none cursor-pointer" placeholder='채팅할 사람을 입력해주세요'></input></div>
                </div>
                <div className="overflow-y-scroll h-60 border-solid border-b-2 border-slate-300">
                    {list && list.map((ele, index) => {
                        return (
                            <div className="flex  pt-2 pb-2 border-solid border-b-2 border-slate-300" key={index}>
                                <div className="pl-5 pr-5"><img src={TestImg} className='rounded-full w-14 h-14'></img></div>
                                <div className="flex justify-start items-center w-60"><p className="text-xl">{ele.name}</p></div>
                                <div className="flex justify-center items-center">
                                    <input type='radio' value={index} checked={x === `${index}`} onChange={(e) => { handleClickRadioButton(e, ele.userId) }} className=""></input>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className="flex justify-center pt-4 pb-4">
                    <button className="bg-indigo-400 rounded-md p-1 w-52 decoration-slate-500 text-white">채팅하기</button>
                </div>
            </div>
        </div>
    )
}
