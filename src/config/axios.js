import axios from 'axios'

const instance = axios.create({
    baseURL: "https://work-backend.firebaseio.com/"
})

export default instance