import { getAuthAxios } from "./authAxios";

export const getMyPage = async () => {
  const access = localStorage.getItem("access");
  const authAxios = getAuthAxios(access);
  try {
    const [profileResult, feedResult, likesResult, bookmarksResult] =
      await Promise.all([
        authAxios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/user/profile/2"
        ),
        authAxios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/feed/2/couple"
        ),
        authAxios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/feed/2/like"
        ),
        authAxios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/feed/2/bookmark"
        ),
      ]);

    console.log("profile response:", profileResult);
    console.log("Feed response:", feedResult);
    console.log("Likes response:", likesResult);
    console.log("Bookmarks response:", bookmarksResult);

    return {
      profile: profileResult.data,
      feed: feedResult.data.feed,
      likes: likesResult.data.feeds,
      bookmarks: bookmarksResult.data.feeds,
    };
  } catch (error) {
    console.error("Error fetching my page:", error);
  }
};
