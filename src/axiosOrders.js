import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerproject-666a3.firebaseio.com/'
});

export default instance;