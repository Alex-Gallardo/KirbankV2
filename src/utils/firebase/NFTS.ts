
import { getFromCollection } from './DB';

export const getAllNFTs = (uid: string)=>{
    const res = getFromCollection(uid, 'tokens')
}