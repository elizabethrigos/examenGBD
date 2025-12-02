import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URI);

export const connection = async () => {
    try{
        await client.connect();
        return client.db('torneo');

    }catch(ex){
        console.error(ex);
    }
}
