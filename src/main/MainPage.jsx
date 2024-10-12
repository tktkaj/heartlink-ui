import React from 'react'
import SideMenu from '../layout/SideMenu'
import styled from 'styled-components'
import Feed from '../layout/Feed'

const MainContainer = styled.div`
    background-color: #F8F8FA;
    display: flex;
`

export default function MainPage() {
    return (
        <MainContainer>
            <SideMenu />
            <Feed />

        </MainContainer>
    )
}
