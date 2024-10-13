import React from 'react'
import ProfileImg from '../images/test.png'


export default function AlarmList() {
    return (
        <div style={{ width: '450px', backgroundColor: '#F8F8FA', paddingLeft: '30px', height: '100vh'}}>

            <div style={{ fontSize: '1.8rem', paddingTop: '40px', paddingBottom: '40px' }}>알림</div>

            <div style={{ display: 'flex',paddingBottom: '20px'  }}>

                <div>
                    <img src={ProfileImg} style={{ width: '60px', height: '60px', borderRadius: '50%'}}></img>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', width:'350px', justifyContent:'center', height: '60px' }}>

                    <div style={{ color: '#333', fontSize: '1rem'}}>dduddo님이 회원님의 게시물을 좋아합니다.</div>

                    <div style={{ color: '#696969', fontSize: '0.8rem'}}>방금 전</div>
                </div>

            </div>

            <div style={{ display: 'flex', paddingBottom: '40px' }}>

                <div>
                    <img src={ProfileImg} style={{ width: '60px', height: '60px', borderRadius: '50%' }}></img>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', width:'350px', justifyContent:'center', height: '60px', gap:'5px'}}>

                    <div style={{ color: '#333', fontSize: '1rem'}}>tktkaj님이 팔로우 요청하셨습니다.</div>

                    <div style={{ display: 'flex'}}>

                        <button style={{backgroundColor: '#706EF4', padding:'5px 30px', borderRadius:'5px', color: '#ffffff', marginRight:'15px', fontSize:'0.9rem'}}>수락</button>
                        <button style={{backgroundColor: '#D9D9D9', padding:'5px 30px', borderRadius:'5px', color: '#333', fontSize:'0.9rem'}}>거절</button>

                    </div>
                </div>
            </div>

        </div>
    )
}
