import { getAuthAxios } from "./authAxios";

export const getMyPage = async (userId) => {
  const access = localStorage.getItem("access");
  const authAxios = getAuthAxios(access);
  console.log("유저아이디는:", userId);
  try {
    const [profileResult, feedResult, likesResult, bookmarksResult] =
      await Promise.all([
        authAxios.get(`/user/profile/${userId}`),
        authAxios.get(`/feed/couple/${userId}`),
        authAxios.get("/feed/like"),
        authAxios.get("/feed/bookmark"),
      ]);

    console.log("프로필 데이터:", profileResult);
    console.log("피드 데이터:", feedResult);
    console.log("좋아요 데이터:", likesResult);
    console.log("북마크 데이터:", bookmarksResult);

    return {
      profile: profileResult.data,
      feed: feedResult.data.data,
      likes: likesResult.data.data,
      bookmarks: bookmarksResult.data.data,
      isBlocker: feedResult.data.isBlocker,
      isBlocked: feedResult.data.isBlocked,
    };
  } catch (error) {
    console.error("Error fetching my page:", error);
  }
};
