import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAuthAxios } from "../api/authAxios";
import 남자아이콘 from '../image/couple/남자아이콘.png';
import 여자아이콘 from '../image/couple/여자아이콘.png';

const GraphStyle = styled.div`
  width: 30%;
  height: 100%;
  position: absolute;
  right: 0;
  display: flex; /* flexbox 설정 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  }
`;

const StatisticsTitle = styled.div`
  font-size: 20px;
  font-family: "SANGJUGyeongcheonIsland";
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 28px;
    bottom: 3px;
    height: 9px;
    background-color: #f48589;
    opacity: 0.3;
  }
`;

const RED_COLORS = ['#FF7F50', '#FF4500']; // 붉은 계열
const BLUE_COLORS = ['#4682B4', '#5F9EA0']; // 파란 계열

export default function CoupleGraph() {
    const [m0rate, setM0] = useState(0); // 초기값을 0으로 설정
    const [m1rate, setM1] = useState(0);
    const [f0rate, setF0] = useState(0);
    const [f1rate, setF1] = useState(0);
    const [femaleData, setFemaleData] = useState([]);
    const [maleData, setMaleData] = useState([]);
    const [match1, setMatch1] = useState(null);
    const [match2, setMatch2] = useState(null);

    useEffect(() => {
        console.log("커플그래프의 useEffect 실행");
        const fetchData = async () => {
            try {
                const access = localStorage.getItem("access");
                const authAxios = getAuthAxios(access);
                const res1 = await authAxios.get(
                "http://localhost:9090/couple/statistics/dailyMatch"
              );
              const { gender_m_0_rate, gender_m_1_rate, gender_f_0_rate, gender_f_1_rate } = res1.data;
              setM0(gender_m_0_rate);
              setM1(gender_m_1_rate);
              setF0(gender_f_0_rate);
              setF1(gender_f_1_rate);

              console.log("API 응답12121212:", res1);
            } catch (err) {
              console.log(err);
            }
          };
      
        const fetchData2 = async () => {
            try {
                const res2 = await axios.get(
                    "http://localhost:9090/couple/missionmatch/questions"
                );
                console.log("API 응답:", res2);
                const { match1, match2 } = res2.data;
                setMatch1(match1);
                setMatch2(match2);
                setFemaleData([
                    { name: match1, value: f0rate }, // 기본값 설정
                    { name: match2, value: f1rate }
                ]);
    
                setMaleData([
                    { name: match1, value: m0rate }, // 기본값 설정
                    { name: match2, value: m1rate }
                ]);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        fetchData2();
    }, [match1, match2, f0rate, f1rate, m0rate, m1rate]);

    return (
        <GraphStyle>
            <div className='coupleGraph'>
                <StatisticsTitle>Today's Answer</StatisticsTitle>
                <ResponsiveContainer width="100%" height={230}>
                    <PieChart>
                        <Pie
                            data={femaleData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            innerRadius={40} 
                            // label={(props) => renderCustomLabel({ ...props, isMale: false })}
                            labelLine={false} // 라벨을 가리키는 선을 비활성화

                            >
                            {femaleData.map((entry, index) => (
                                <Cell key={`cell-female-${index}`} fill={index === 0 ? RED_COLORS[0] : RED_COLORS[1]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        {/* 가운데 아이콘 추가 */}
                        <image
                            href={여자아이콘}
                            x="50%"
                            y="50%"
                            width="50"
                            height="50"
                            transform="translate(-25,-25)" // 중앙 정렬을 위한 변환
                        />
                        {/* <Legend /> */}
                    </PieChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={230}>
                    <PieChart>
                        <Pie
                            data={maleData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="40%"
                            outerRadius={60}
                            innerRadius={40} 
                            // label={(props) => renderCustomLabel({ ...props, isMale: true })}
                            labelLine={false} // 라벨을 가리키는 선을 비활성화

                            >
                            {maleData.map((entry, index) => (
                                <Cell key={`cell-male-${index}`} fill={index === 0 ? BLUE_COLORS[0] : BLUE_COLORS[1]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        {/* 가운데 아이콘 추가 */}
                        <image
                            href={남자아이콘}
                            x="50%"
                            y="40%"
                            width="50"
                            height="50"
                            transform="translate(-25,-25)" // 중앙 정렬을 위한 변환
                        />
                        {/* <Legend /> */}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </GraphStyle>
    );
}
