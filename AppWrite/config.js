/* eslint-disable no-unused-vars */
import { Client, Databases , storage , Query , ID } from "appwrite";
import conf from '../conf/conf'

export class Service {
    client = new Client();
    Databases
    bucket
    
    //constructor for give all service to our new instance of class Service
    
    constructor(){
        this.client
        .setEndpoint(conf.appwrite) 
        .setProject(conf.PROJECT_ID); 

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    
    //creating Post
    async createPost ({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.Databases.createDocument(
                conf.DATABASE_ID ,
                conf.COLLECTION_ID,
                slug,
                {
                    title ,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw new Error('Something bad happened.');
        }
    }

    //update Post
     async updatePost (slug , {title , content ,featuredImage,status}){
            return await this.Databases.updateDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    content
                }

            )
    }

     //delete Post
     async deletePost (slug){
        try {
            await this.databases.deleteDocument(
            conf.DATABASE_ID,
            conf.COLLECTION_ID,
            slug
    )
        return true ;
            
        } catch (error) {
            console.log('post not deleted , something want wrong');
        }
    }
    //get one Post
    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.COLLECTION_ID,
                conf.DATABASE_ID,
                slug
            )
        } catch (error) {
            throw new Error('Something bad happened.');
            
        }
    }
    //get many Post
    async getPosts (Query = [Query.equal('status' , 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.COLLECTION_ID ,
                conf.DATABASE_ID,
                Query
            )
        } catch (error) {
            throw new Error('Something bad happened.');
        }

    }

    //file upload and delete services 
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file

            )
            
        } catch (error) {
            throw new Error('Something bad happened.');
        }
    }

    //delete file
    async deleteFile (fileId){
        try {
             await this.bucket.deleteFile(
                conf.BUCKET_ID,
                fileId
            )
        return true
    } catch (error) {
        throw new Error('Something bad happened.');
    }
    }
    
    //file preview 
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.BUCKET_ID,
            fileId
        )
    }


}

const service = new Service()
export default service