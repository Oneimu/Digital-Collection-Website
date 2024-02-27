import axios from 'axios';

const API_BASE_URL = "http://localhost:5050"

export const getFeaturedCategory = async () => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/home/featured-category`
        )
    } catch (e) {
        throw e;
    }

    
}

export const getAllSchoolBuildings = async (pageNumber, pageSize) => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/school-buildings/get-all-school-buildings?page=${pageNumber}`
        )
        .then((response) => response.data);
    } catch (e) {
        throw e;
    }

}

export const getSchoolBuilding = async (uid) => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/school-buildings/get-school-building/${uid}`
        )
        .then((response) => response.data);
    } catch (e) {
        throw e;
    }

}

export const getSchoolFund = async (uid) => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/school-funds/get-school-fund/${uid}`
        )
        .then((response) => response.data);
    } catch (e) {
        throw e;
    }

}

export const upload = async (fileType, data) => {
    console.log(fileType)
    

    try {
        // return await axios.post(
        //     `${API_BASE_URL}/api/v1/home/file-category/${fileType}`, data)
        // .then((response) => response.data);
        return await axios.post(
            `${API_BASE_URL}/api/v1/admin-landing-page/${fileType}/upload`, data
            );
    } catch (e) {
        throw e;
    }

}

export const getStates = async (uid) => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/advance-search/states`
        )
        .then((response) => response.data);
    } catch (e) {
        throw e;
    }

}

export const getCounties = async (state) => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/advance-search/counties/${state}`
        )
        .then((response) => response.data);
    } catch (e) {
        throw e;
    }

}

export const loginAdmin = async (email, password) => {


        return await axios.post(`http://localhost:5050/api/v1/login/${email}/${password}`)
            .then((response) => response.data);



    // return fetch(`${API_BASE_URL}/api/v1/login/`, {
    // method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(credentials)

//   })
//     .then(data => data.json())

    // try {
    //     const json = JSON.stringify(credentials);
    //     console.log(json);
    //     return await axios.post(`${API_BASE_URL}/api/v1/login/`, json)
    //     .then((response) => response.data);
    // } catch (e) {
    //     // alert(e);
    //     // throw e;
    // }

}



