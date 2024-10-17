import React from 'react'
import styled from 'styled-components'

const MenuContainer = styled.div`
    width: 350px;
    height: 100vh;
    background-color: white;
    border-radius: 0 10px 10px 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 4.7vw;
    @keyframes slideIn {
    from {
        transform: translateX(-80%);
    }
    to {
        transform: translateX(0);
    }
}
    animation: slideIn 0.4s forwards;
    padding-top: 5vh;
`

export default function AlarmMenu() {
    return (
        <>
            <MenuContainer>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px', paddingLeft: '2vw' }}>
                    <h1>알림</h1>
                </div>
            </MenuContainer>
        </>
    )
}
