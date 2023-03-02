import axios from 'axios';

import {HOST} from '../common/routes';
import {AuthDataType} from '../common/types';

const instance = axios.create({
    baseURL: HOST,
})


export const authAPI = {
    auth(data: AuthDataType){
        return instance.post('/api/auth/local', data)
    }
}
