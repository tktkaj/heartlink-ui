import axios from "axios"

export const getMyPage = async () => {
    const access = localStorage.getItem('access');
    const result = await axios.get('http://localhost:9090/user/profile/{userid}', {
        headers: {
            authorization: access,
        },
    });
    return result.headers;
}