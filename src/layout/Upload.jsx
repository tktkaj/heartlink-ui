import React from 'react'
import styled from 'styled-components'
import { FaPen } from "react-icons/fa";


const UploadButton = styled.div`
    width:55px;
    height: 55px;
    overflow: hidden; 
    border-radius: 50%;
    background-color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    position: fixed;
    bottom: 40px;
    right: 40px;
    cursor: pointer;
`



export default function Upload({ onClick }) {

    return (
        <>
            <UploadButton onClick={onClick}>
                <FaPen style={{margin:'auto', marginTop:'17px', width:'22px', height:'22px'}}/>
            </UploadButton>
        </>
    )
}