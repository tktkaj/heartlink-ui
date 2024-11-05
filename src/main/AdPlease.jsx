import React from 'react'
import styled from 'styled-components'

const AdPleaseContainer = styled.div`
  width: 21vw;
  padding: 13px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
    h1{
        font-size: 20px;
        margin-bottom: 1px;
    }
    a{
        font-size: 15px;
        color: blue;
        font-weight: bold;
    }
`


export default function AdPlease() {
    return (
        <AdPleaseContainer>
            <h1>광고 협업을 원하신다면,
                <br /> 지금 문의하세요!</h1>
            더 큰 효과를 창출할 수 있는 기회를 놓치지 마세요.
            <br />
            <a href='/'>문의하기 &gt;</a>
        </AdPleaseContainer>
    )
}
