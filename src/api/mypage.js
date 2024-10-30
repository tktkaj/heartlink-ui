import { getAuthAxios } from "./authAxios";

export const getMyPage = async () => {
  const access = localStorage.getItem("access");
  const authAxios = getAuthAxios(access);
  try {
    const [userId, feedResult, likesResult, bookmarksResult] =
      await Promise.all([
        authAxios.get("http://localhost:9090/user/profile"),
        authAxios.get("http://localhost:9090/feed/couple"),
        authAxios.get("http://localhost:9090/feed/like"),
        authAxios.get("http://localhost:9090/feed/bookmark"),
      ]);

    console.log("유저아이디는:", userId);
    console.log("피드 데이터:", feedResult);
    console.log("좋아요 데이터:", likesResult);
    console.log("북마크 데이터:", bookmarksResult);

    return {
      userId: userId.data,
      feed: feedResult.data,
      likes: likesResult.data,
      bookmarks: bookmarksResult.data,
    };
  } catch (error) {
    console.error("Error fetching my page:", error);
  }
};
