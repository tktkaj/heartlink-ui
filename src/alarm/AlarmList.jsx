import React from 'react'

export default function AlarmList() {
  return (
    <div style={{width: '380px', backgroundColor: '#F8F8FA'}}>
        <div>목록창헤드</div>
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
