import DmListBox from "./DmListBox";
import ChatBox from "./ChatBox";
import ChatListModal from "../layout/ChatListModal";
import { useEffect, useState } from "react";
import MiniSide from "../sideMenu/MiniSide";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageApplyModal from "../layout/MessageApplyModal";
import DeleteRoomModal from "../layout/DeleteRoomModal";
import { getAuthAxios } from "../api/authAxios";

const NoChatContainer = styled.div`
  display: flex;
  text-align: center;
  margin-left: 62vw;
  margin-top: 50vh;
`;

export default function ChatRoom() {
  const [ws, setWs] = useState(null); // WebSocket 객체를 상태로 관리
  const [dmList, setDmList] = useState([]); // dmList
  const [input, setInput] = useState(""); // 입력된 값
  const [messages, setMessages] = useState([]); // 보여질 메세지들
  const [msgRoomId, setMsgRoomId] = useState(); //  msgRoomId 정보
  const [userId, setUserId] = useState(); // 나의 LoginId
  const [otherProfile, setOtherProfile] = useState(); // 상대방 유저이미지 경로
  const [otherLoginId, setOtherLoginId] = useState(); // 상대방 로그인 아이디
  const [otherUserId, setOtherUserId] = useState(); //  상대방 유저 아이디
  const [searchList, setSearchlist] = useState([]);
  const [msgRoomType, setMsgRoomType] = useState("PUBLIC");
  const [openUser, setOpenUser] = useState(false);

  // 모달 모음
  const [newChatModal, setNewChatModal] = useState(false);
  const [deleteRoom, setDeleteRomm] = useState(false);

  // 웹 소켓 연결
  useEffect(() => {
    const token = localStorage.getItem('access');
    // WebSocket 연결을 설정
    const webSocket = new WebSocket(
      "ws://localhost:9090/message"
    );

    // 연결이 열렸을 때 실행
    webSocket.onopen = () => {};

    // 서버에서 메시지를 받을 때 실행
    webSocket.onmessage = (event) => {
      let type = event.data.split(":");

      let newMessage = null;
      if (type[0] === "txt") {
        console.log("텍스트");
        newMessage = {
          senderId: userId + 1,
          content: type[1],
          lastMessageTime: new Date(),
        };
      } else if (type[0] === "img") {
        newMessage = {
          senderId: userId + 1,
          imageUrl: `http:${type[2]}:${type[3]}`,
          lastMessageTime: new Date(),
        };
      }

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // 연결이 닫혔을 때 실행
    webSocket.onclose = () => {};

    // WebSocket 객체 저장
    setWs(webSocket);

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      webSocket.close();
    };
  }, []);

  // 대화중인 상대방 리스트 불러오는 axios
  useEffect(() => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .get("/dm")
      .then((response) => {
        // 서버로부터 받은 데이터를 상태로 설정
        setDmList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the direct message:", error);
      });
  }, [messages]);

  // 상대방 클릭시 채팅방 내역 불러오는 함수
  const handleChangeRoom = (chat) => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    setOtherProfile(chat.otherUserImg);
    setOtherLoginId(chat.otherLoginId);
    setMsgRoomId(chat.msgRoomId);
    setOtherUserId(chat.otherUserId);
    setMsgRoomType(chat.msgRoomType);
    setOpenUser(chat.openUser);

    authAxios
      .get(`/dm/${chat.msgRoomId}`)
      .then((response) => {
        if (response.status == 200) setMessages(response.data);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            console.log("잘못된 접근입니다.");
            break;
          case 500:
            console.log("서버오류입니다.");
            break;
        }
      });
  };

  // 메세지 입력을 받아서 input에 저장하는 함수
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 메세지를 웹소켓으로 보내는 함수
  const sendMessage = () => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    if (ws && input) {
      let newMessage = {
        msgRoomId: msgRoomId,
        senderId: userId,
        content: input,
        lastMessageTime: new Date(),
      };

      authAxios
        .post("/dm/messages/text", newMessage, {
          params: {
            otherUserId: otherUserId, // 쿼리 파라미터로 otherUserId 추가
          },
        })
        .then((response) => {
          ws.send(`txt:${input}`); // WebSocket을 통해 메시지 전송
          // 새로운 메시지를 이전 messages 배열에 추가하여 상태 업데이트
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              toast.error(error.response.data, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
            case 500:
              toast.warn("서버에 오류가 발생하였습니다.");
              break;
          }
        });
    }

    setInput(""); // 메시지 전송 후 초기화
  };

  // 엔터 누를 시 메세지 보내기
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // 파일을 전송하는 함수
  const handleFileChange = (event) => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    const file = event.target.files[0];
    let image = window.URL.createObjectURL(file);

    let formData = new FormData();
    formData.append("file", file);
    formData.append("msgRoomId", msgRoomId);
    formData.append("senderId", userId);
    formData.append("otherUserId", otherUserId);

    // api를 통해 db에 저장
    if (file) {
      authAxios
        .post("/dm/messages/img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          ws.send(`img:${response.data}`);
          console.log("이건", image);

          const newMessage = {
            msgRoomId: msgRoomId,
            senderId: userId,
            imageUrl: image,
            lastMessageTime: new Date(),
          };

          // 이거는 내 화면에 출력되게 message에 저장
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              toast.error(error.response.data, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              break;
            case 500:
              toast.warn("서버에 오류가 발생하였습니다.");
              break;
          }
        });
    }
  };

  // 채팅방을 만드는 함수
  const handleNewRoom = (otherUserId) => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .post(`/dm/new/${otherUserId}`)
      .then((response) => {
        authAxios
          .get("/dm")
          .then((response) => {
            // 서버로부터 받은 데이터를 상태로 설정
            setDmList(response.data);
            setNewChatModal(false);
          })
          .catch((error) => {
            console.error("Error fetching the direct message:", error);
          });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            toast.error(error.response.data);
            break;
          case 409:
            toast.error(error.response.data);
            break;
          case 500:
            toast.error("서버에서 오류가 생겼습니다.");
            break;
        }
      });
  };

  // 유저 차단 함수
  const handleBlockUser = () => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .post(`/user/block/${otherUserId}`)
      .then((response) => {
        if (response.status == 201)
          toast.success(`${otherLoginId}님을 차단했습니다.`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            toast.error(error.response.data, {
              position: "top-right", // 위치 설정
              autoClose: 2000, // 자동 닫힘 시간
              hideProgressBar: true, // 진행 바 숨김 여부
              closeOnClick: true, // 클릭 시 닫힘 여부
              pauseOnHover: true, // 호버 시 일시 정지
            });
            break;
          case 403:
            toast.error(error.response.data, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          case 500:
            toast.info("이미 차단한 유저입니다.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      });
  };

  //  채팅유저 검색 함수
  const handleSearchUser = (searchName) => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .get("/dm/friends", {
        params: {
          searchName: searchName,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setSearchlist(response.data);
        }
      })
      .catch((error) => {});
  };

  // 채팅방 개설 모달
  const handleOpenModal = (newChatModal) => {
    if (newChatModal == false) setNewChatModal(true);
    else if (newChatModal == true) setNewChatModal(false);
  };

  // 비공개 사용자 메시지 요청 수락 함수
  const handleMessageAgree = () => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .put(`/dm/message/accept/${msgRoomId}`)
      .then((response) => {
        setMsgRoomType("PUBLIC");
      })
      .catch((error) => {});
  };

  // 비공개 사용자 메시지 요청 거부 함수
  const handleMessageReject = () => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .delete(`/dm/message/rejection/${msgRoomId}`)
      .then((response) => {
        setMsgRoomType("PUBLIC");
        setMsgRoomId(null);

        authAxios
          .get("/dm")
          .then((response) => {
            // 서버로부터 받은 데이터를 상태로 설정
            setDmList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching the direct message:", error);
          });
      })
      .catch((error) => {});
  };

  //  채팅방 삭제 모달 on/off
  const handleDeleteMessageModal = (deleteRoom, msgRoomId) => {
    if (deleteRoom == false) {
      setMsgRoomId(msgRoomId);
      setDeleteRomm(true);
    } else if (deleteRoom == true) setDeleteRomm(false);
  };

  // 채팅방을 삭제하는 함수
  const handleDeleteMsgRoom = () => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    authAxios
      .delete(`/dm/${msgRoomId}`)
      .then((response) => {
        setMsgRoomId();
        setDeleteRomm(false);

        authAxios
          .get("/dm")
          .then((response) => {
            // 서버로부터 받은 데이터를 상태로 설정
            setDmList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching the direct message:", error);
          });
      })
      .catch((error) => {});
  };

  return (
    <div style={{ display: "flex" }}>
      {/* 모달 */}
      {newChatModal == true && (
        <ChatListModal
          newChatModal={newChatModal}
          handleOpenModal={handleOpenModal}
          handleNewRoom={handleNewRoom}
          handleSearchUser={handleSearchUser}
          searchList={searchList}
          setSearchlist={setSearchlist}
        />
      )}
      {msgRoomType == "PRIVATE" && !openUser && (
        <MessageApplyModal
          handleMessageAgree={handleMessageAgree}
          handleMessageReject={handleMessageReject}
        />
      )}
      {deleteRoom && (
        <DeleteRoomModal
          handleDeleteMessageModal={handleDeleteMessageModal}
          deleteRoom={deleteRoom}
          handleDeleteMsgRoom={handleDeleteMsgRoom}
        />
      )}

      {/* 알람 toastify*/}
      <ToastContainer />

      <MiniSide />
      <DmListBox
        dmList={dmList}
        handleChangeRoom={handleChangeRoom}
        setUserId={setUserId}
        handleOpenModal={handleOpenModal}
        newChatModal={newChatModal}
        handleDeleteMessageModal={handleDeleteMessageModal}
        deleteRoom={deleteRoom}
      />
      {msgRoomId ? ( // messages가 존재하면 ChatBox를 보여줌
        <ChatBox
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          setMessages={setMessages}
          otherProfile={otherProfile}
          otherLoginId={otherLoginId}
          messages={messages}
          handleFileChange={handleFileChange}
          msgRoomId={msgRoomId}
          userId={userId}
          handleBlockUser={handleBlockUser}
        />
      ) : (
        // messages가 null일 경우 공백을 표시
        <NoChatContainer></NoChatContainer>
      )}
    </div>
  );
}
