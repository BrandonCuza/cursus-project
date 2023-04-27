/*
    File taken from contacts-app-v4 and changed to fit our use case. Name not changed.
    Author: Amilcar Soares
    Modified by: Brandon Cuza
*/
import { MongoClient } from 'mongodb';
const uri ="mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db;

/**
 * A function to stablish a connection with a MongoDB instance.
 */
export async function connectToDB() {
    try {
        // Connect the client to the server
        await client.connect();
        // Our db name is going to be coursetooldb
        db = await client.db('coursetooldb');
        console.log("Connected successfully to mongoDB");  
    } catch (err) {
        throw err; 
    } 
}
/**
 * This method just returns the database instance
 * @returns A Database instance
 */
export async function getDb() {
    return db;
}

export async function closeDBConnection(){
    await client.close();
    return 'Connection closed';
};


export default {connectToDB, getDb, closeDBConnection}