import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

export const account = new Account(client);
export const database = new Databases(client, import.meta.env.VITE_APPWRITE_DATABASE);
export const storage = new Storage(client, import.meta.env.VITE_APPWRITE_STORAGE_BUCKET);


client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export { ID } from "appwrite";