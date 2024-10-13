import React from 'react'

export default function AlarmList() {
  return (
    <div style={{width: '380px', backgroundColor: '#F8F8FA', paddingLeft:'30px'}}>
        <div style={{fontSize: '2rem', paddingTop: '40px', paddingBottom: '40px'}}>알림</div>
        <div style={{display: 'flex'}}>
            <div>
                프사
            </div>
            <div>
                <div>알림내용</div>
                <div>시간</div>
            </div>
        </div>
        <div style={{display: 'flex'}}>
            <div>
                프사
            </div>
            <div>
                <div>알림내용</div>
                <div style={{display: 'flex'}}>
                    <div>수락</div>
                    <div>거절</div>
                </div>
            </div>
        </div>
    </div>
  )
}
