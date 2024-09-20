import { Client, Account, Storage, ID, Avatars, Databases, Query } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66e999a5000663d77cae',
    databaseId: '66e99afb003301e6dea8',
    userCollectionId: '66eac8b20037d89b32fb',
    videoCollectionId: '66eac8a7003da4030e1c',
    storageId: '66e99e700018d392f9d7'
} 

const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

  const account = new Account(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username    
        )

        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch(e) {
        throw new Error(e)
    }
}


export const signIn = async (email, password) =>{
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}

  // Get Account
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

// Get Current User
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) {
        throw new Error('No current account found');
      }

      console.log(currentAccount.$id)
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser || currentUser.documents.length === 0) {
        console.log("No user documents found");
        throw new Error('No user documents found');
      }
      console.log(currentUser)
      return currentUser.documents[0];
    } catch (error) {
      return null;
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
        
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
        
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
        
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
        
    }
}

// Sign Out
export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl
    try {
        if(type === 'image') {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
        } else if(type === 'video') {
            fileUrl = storage.getFileView(config.storageId, fileId)
        }
        else{
            throw new Error('Invalid file type')
        }

        if(!fileUrl) throw new Error('File not found')
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async (file, type) => {
    if(!file) return

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest }

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset,
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title, 
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost
    } catch (error) {
        throw new Error(error)
    }
}