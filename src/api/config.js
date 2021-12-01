// This will be our Axios base file
import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:3006/"
    // baseURL: "https://test-suite-server-heroku.herokuapp.com/"
})