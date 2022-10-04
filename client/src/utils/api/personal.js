import baseApi from "./@baseURL";

//fuel station login
const signInPersonal = async (data) => {

    try {

        let response = await baseApi.post(
            "auth/loginPersonal",
            data
        );

        localStorage.setItem("refreshToken", response.headers["x-refresh-token"]);
        sessionStorage.setItem("accessToken", response.headers["x-access-token"]);

        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
};

//get dashboard info
const getDashBoard = async (id) => {

    try {
        
        let response = await baseApi.get(
            `personal/dashboard/${id}`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        // console.log(err);
        return err.response.data;
    }
}

export { signInPersonal, getDashBoard };
