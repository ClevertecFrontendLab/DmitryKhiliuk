import axios from 'axios';

import {HOST} from '../common/routes';
import {AuthDataType, RegistrationDataType} from '../common/types';

const instance = axios.create({
    baseURL: HOST,
})


export const authAPI = {
    auth(data: AuthDataType){
        return instance.post('/api/auth/local', data)
    },
    register(dataReg: RegistrationDataType) {
        return instance.post('/api/auth/local/register', dataReg)
    }
}
