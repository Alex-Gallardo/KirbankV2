
import { getFromCollection } from './DB';

export const getUser = (uid: string)=>{
    const res = getFromCollection(uid, 'users')
}