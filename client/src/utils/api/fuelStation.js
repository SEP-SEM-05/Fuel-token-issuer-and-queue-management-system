import baseApi from "./@baseURL";
import url from "./urlString";
import axios from "axios";

//fuel station login
const signIn = async (data) => {
  try {
    
    let response = await baseApi.post(
      "auth/loginStation",
      data
    );
            localStorage.setItem(
              "refreshToken",
              response.headers["x-refresh-token"]
            );
            sessionStorage.setItem(
              "accessToken",
              response.headers["x-access-token"]
            );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

//get dashboard info
const getDashBoard = async (id) => {

    try {
        
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = sessionStorage.getItem("accessToken");

        let api = axios.create({
            baseURL: url,
            headers: {
                "x-refresh-token": refreshToken ? "Bearer " + refreshToken : undefined,
                "x-access-token": accessToken ? "Bearer " + accessToken : undefined,
            },
        });

        let response = await api.get(
            `station/dashboard/${id}`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        return err.response.data;
    }
}

// add new fuel amount
const addFuelAmount = async (data) => {
  try {
    console.log(data)
    let response = await baseApi.post(`station/updateamount`, data);
  
    if (response.headers["x-access-token"]) {
      sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
    }
    
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}

//get waiting queues
const getWaitingQueues = async (id) => {
  try {
    let response = await baseApi.get(`station/fuelqueues/${id}`);
    //console.log(response.data);

    if (response.headers["x-access-token"]) {
      sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
    }

    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export { signIn, getDashBoard, getWaitingQueues, addFuelAmount };
