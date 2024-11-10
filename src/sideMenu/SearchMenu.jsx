import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useLocation } from "react";
import { getAuthAxios } from "../api/authAxios";
import { BiSearch } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";

const MenuContainer = styled.div`
  width: 400px;
  height: 100vh;
  background-color: white;
  border-radius: 0 10px 10px 0;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 82px;
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
`;

const SearchList = styled.div`
  display: flex;
`;

const ProfileThum = styled.div`
  width: 28px;
  height: 28px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #6b6b6b;
  text-align: center;
  color: #706ef4;
`;

const Ulstyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Liststyle = styled.div`
  display: flex;
  width: 400px;
  height: 68px;
  font-size: 17px;
  gap: 13px;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.4s ease;
  cursor: pointer;
  &:hover {
    background-color: #e6e6ff;
  }
  padding-left: 2vw;
`;

const AutocompleteList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 290px;
  background-color: white;
  z-index: 1;
  border: 1px solid #e4e4e6;
  max-height: 225px;
  overflow-y: auto;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
`;

const AutocompleteItem = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#e6e6ff" : "white")};
  border-bottom: 1px solid #e4e4e6;
  height: 45px;
  // 선택되지 않은 경우에만 마우스 오버 시 배경색 변경
  ${(props) =>
    !props.selected &&
    `
        &:hover {
            background-color: #e6e6ff;
            cursor: pointer;
        }
    `}
`;

const SearchHistoryContainer = styled.div``;

const SearchHistoryData = styled.div`
  max-height: 76vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
`;

export default function SearchMenu({
  onSearchResults,
  onKeywordChange,
  onTagClick,
}) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchedHistory, setIsSearchedHistory] = useState(false);
  const [idAutocompleteList, setIdAutocompleteList] = useState([]);
  const [tagAutocompleteList, setTagAutocompleteList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // 선택된 자동완성 항목 인덱스

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchResults(keyword);
    onKeywordChange(keyword);
  };

  // 검색된 태그 클릭 시
  const handleTagClick = (tagName) => {
    console.log(`태그 클릭됨: ${tagName}`);
    onKeywordChange("&" + tagName);
    onTagClick(tagName);
  };

  useEffect(() => {
    // 검색기록 가져오기
    const getSearchHistory = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get(`/search/history`, {
          headers: {
            Authorization: access,
          },
        });
        console.log("검색기록 결과:", response.data);
        setSearchHistory(response.data);
      } catch (error) {
        if (error.response) {
          console.error("서버 응답 에러:", error.response.data);
        } else {
          console.error("API 요청 실패:", error.message);
        }
      } finally {
        setIsSearched(false);
      }
    };
    getSearchHistory();
  }, []);

  // 검색 제출
  const searchSubmit = async (e) => {
    e.preventDefault();
    console.log("검색 제출:", keyword);

    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios.get(`/search/keyword`, {
        params: { keyword },
      });
      console.log("검색 결과:", response.data);
      // 응답 데이터 정규화
      let normalizedData = response.data;
      console.log("normalizedData", normalizedData);
      // console.log('normalizedData', normalizedData);
      if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
        // 배열의 배열인 경우 첫 번째 배열 사용
        normalizedData = response.data[0];
      } else if (!Array.isArray(response.data)) {
        // 단일 객체인 경우 배열로 변환
        normalizedData = [response.data];
      }
      setSearchResults(normalizedData);

      onSearchResults(normalizedData);
      onKeywordChange(keyword);
      setIsSearched(true);
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 에러:", error.response.data);
      } else {
        console.error("API 요청 실패:", error.message);
      }
    } finally {
      setIsSearched(true);
    }
  };

  // 검색 결과 렌더링
  const renderResult = (result) => {
    switch (result.type) {
      case "id":
        return (
          <Link to={`/user/profile/${result.userId}`}>
            <Liststyle key={result.loginId}>
              <ProfileThum>
                <img src={result.img} alt="프로필이미지" />
              </ProfileThum>
              <p style={{ fontFamily: "SokchoBadaBatang" }}>{result.loginId}</p>
            </Liststyle>
          </Link>
        );
      case "tag":
        return (
          <Liststyle
            key={result.tagName}
            onClick={() => handleTagClick(result.tagName)}
          >
            <ProfileThum>&</ProfileThum>
            <p>{result.tagName}</p>
          </Liststyle>
        );
    }
  };

  // 검색기록 클릭
  const historyClick = (historyKeyword) => {
    console.log("검색기록 클릭:", historyKeyword);
    setKeyword(historyKeyword); // 검색 기록의 키워드를 input 상태로 설정
  };

  // 검색기록 렌더링
  const renderHistory = (history) => {
    switch (history.type) {
      case "id":
        return (
          <Liststyle
            key={history.keyword}
            onClick={() => historyClick("@" + history.keyword)}
          >
            <p style={{ fontFamily: "SokchoBadaBatang" }}>@{history.keyword}</p>
          </Liststyle>
        );
      case "tag":
        return (
          <Liststyle
            key={history.keyword}
            onClick={() => historyClick("&" + history.keyword)}
          >
            <p style={{ fontFamily: "SokchoBadaBatang" }}>&{history.keyword}</p>
          </Liststyle>
        );
      case "content":
        return (
          <Liststyle
            key={history.keyword}
            onClick={() => historyClick(history.keyword)}
          >
            <p style={{ fontFamily: "SokchoBadaBatang" }}>{history.keyword}</p>
          </Liststyle>
        );
    }
  };

  // 자동완성 기능
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSelectedIndex(-1);

    if (value.startsWith("@")) {
      // 아이디 자동완성 API 호출
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios
        .get(`/es/idAuto?searchId=${value.slice(1)}`, {
          headers: {
            Authorization: access,
          },
        })
        .then((response) => setIdAutocompleteList(response.data))
        .catch((error) =>
          console.error("Error fetching user autocomplete:", error)
        );
    } else if (value.startsWith("&")) {
      // 태그 자동완성 API 호출
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios
        .get(`/es/tagAuto?searchTag=${value.slice(1)}`, {
          headers: {
            Authorization: access,
          },
        })
        .then((response) => setTagAutocompleteList(response.data))
        .catch((error) =>
          console.error("Error fetching tag autocomplete:", error)
        );
    } else {
      // 기본 자동완성 초기화
      setTagAutocompleteList([]);
      setIdAutocompleteList([]);
    }
  };

  const handleAutocompleteClick = (value) => {
    setKeyword(value);
    setIdAutocompleteList([]);
    setTagAutocompleteList([]);
  };

  // 키보드 이벤트 핸들러 추가
  const handleKeyDown = (e) => {
    const autocompleteList = keyword.startsWith("@")
      ? idAutocompleteList
      : tagAutocompleteList;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex =
            prev < autocompleteList.length - 1 ? prev + 1 : prev;
          scrollToItem(nextIndex);
          return nextIndex;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex = prev > -1 ? prev - 1 : prev;
          scrollToItem(nextIndex);
          return nextIndex;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && autocompleteList.length > 0) {
          const selected = autocompleteList[selectedIndex];
          const value = keyword.startsWith("@")
            ? "@" + selected.loginId
            : "&" + selected.tagName;
          handleAutocompleteClick(value);
        } else {
          searchSubmit(e);
        }
        break;
    }
  };

  const scrollToItem = (index) => {
    if (index === -1) return;

    const itemElement = document.querySelector(`[data-index="${index}"]`);
    const listElement = itemElement?.parentElement;

    if (itemElement && listElement) {
      const itemTop = itemElement.offsetTop;
      const itemHeight = itemElement.offsetHeight;
      const listHeight = listElement.offsetHeight;
      const scrollTop = listElement.scrollTop;

      // 항목이 리스트의 위쪽이나 아래쪽 경계를 벗어났는지 확인
      if (itemTop < scrollTop) {
        listElement.scrollTop = itemTop;
      } else if (itemTop + itemHeight > scrollTop + listHeight) {
        listElement.scrollTop = itemTop + itemHeight - listHeight;
      }
    }
  };

  return (
    <>
      <MenuContainer>
        <div
          style={{
            fontSize: "1.5rem",
            marginBottom: "20px",
            paddingLeft: "2vw",
          }}
        >
          <h1>검색</h1>
        </div>
        <form onSubmit={searchSubmit} style={{ display: "flex" }}>
          <div
            style={{
              marginLeft: "10%",
              width: "85%",
              display: "flex",
              position: "relative",
            }}
          >
            <input
              type="text"
              required
              placeholder="검색어 입력"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 "
              style={{
                width: "290px",
                paddingLeft: "7px",
                fontSize: "15px",
                backgroundColor: "#f5f5f5",
              }}
            ></input>
            {idAutocompleteList.length > 0 && (
              <AutocompleteList>
                {idAutocompleteList.map((item, index) => (
                  <AutocompleteItem
                    data-index={index}
                    selected={index === selectedIndex}
                    onClick={() => handleAutocompleteClick("@" + item.loginId)}
                    key={index}
                  >
                    @{item.loginId}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            )}

            {tagAutocompleteList.length > 0 && (
              <AutocompleteList>
                {tagAutocompleteList.map((item, index) => (
                  <AutocompleteItem
                    data-index={index}
                    selected={index === selectedIndex}
                    onClick={() => handleAutocompleteClick("&" + item.tagName)}
                    key={index}
                  >
                    &{item.tagName}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            )}

            <button type="submit" style={{ width: "10%", marginLeft: "10px" }}>
              <BiSearch
                style={{ width: "30px", height: "30px" }}
                className="icon"
              />
            </button>
          </div>
        </form>
        <hr style={{ marginTop: "4vh" }}></hr>
        <SearchList>
          {isSearched ? (
            Array.isArray(searchResults) && searchResults.length > 0 ? (
              <div>
                {searchResults.map((result, index) => (
                  <div key={index}>{renderResult(result)}</div>
                ))}
              </div>
            ) : (
              <div style={{ margin: "auto", marginTop: "20px" }}>
                검색 결과가 없습니다.
              </div>
            )
          ) : null}
        </SearchList>

        {/* 검색기록 */}
        {isSearched ? null : (
          <SearchHistoryContainer>
            <div
              style={{
                fontSize: "1.2rem",
                marginBottom: "20px",
                paddingLeft: "2vw",
                marginTop: "25px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdManageSearch
                style={{
                  width: "30px",
                  height: "30px",
                  color: "#706ef4",
                  marginBottom: "5px",
                }}
              />
              <h1 style={{ fontFamily: "SokchoBadaBatang", color: "#706ef4" }}>
                검색기록
              </h1>
            </div>
            <SearchHistoryData>
              <SearchList>
                {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
                  <div>
                    {searchHistory.map((result, index) => (
                      <div key={index}>{renderHistory(result)}</div>
                    ))}
                  </div>
                ) : (
                  <div style={{ paddingLeft: "2vw" }}>
                    검색 기록이 없습니다.
                  </div>
                )}
              </SearchList>
            </SearchHistoryData>
          </SearchHistoryContainer>
        )}
      </MenuContainer>
    </>
  );
}
