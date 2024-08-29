/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import { Client, Account , ID } from "appwrite";
import conf from '../config/conf'



export class AuthService {

    client = new Client();
    account ;

    constructor (){
        this.client
        .setEndpoint(conf.appwrite) 
        .setProject(conf.PROJECT_ID); 

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        
        try {
           const userAccount =  await this.account.create(ID.unique(),email,password , name);
           if(userAccount){
            //call another method
            return this.login({email,password});
           }else {
            return userAccount;
           }
        } catch (error) {
            throw error
        }
    }

    async login ({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }
    }
    
    async getCurrentUser (){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        // eslint-disable-next-line no-unreachable
        return null 
    }

    async logOut (){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw Error('Something bad happened.');
        }
    }
     
}

const authService = new AuthService();

export default authService 