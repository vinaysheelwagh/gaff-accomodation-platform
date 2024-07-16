import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.vw.gaff",
  projectId: "667d313b0024ae1764a1",
  databaseId: "667d32d60031562a628f",
  usersCollectionId: "667d32f2001df71fdb88",
  accomodationsCollectionId: "667d33480010a242478c",
  storageId: "667d35fd000961c6281a",
};

const { endpoint, platform, projectId, databaseId, usersCollectionId, accomodationsCollectionId, storageId } =
  appwriteConfig;

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async (email, password, name, phone) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name, phone);
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(name);
    await signIn(email, password);
    const newUser = await databases.createDocument(databaseId, usersCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      name,
      phone,
      avatar: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(databaseId, usersCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, accomodationsCollectionId, [Query.orderDesc("$createdAt")]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, accomodationsCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, accomodationsCollectionId, [Query.search("title", query)]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      accomodationsCollectionId,
      [Query.equal("creator", userId)],
      Query.orderDesc("$createdAt")
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 100);
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  const assest = { name: file.fileName, type: file.mimeType, size: file.fileSize, uri: file.uri };
  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), assest);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (form) => {
  try {
    const [imageUrl] = await Promise.all([uploadFile(form.image, "image")]);
    const newPost = await databases.createDocument(databaseId, accomodationsCollectionId, ID.unique(), {
      title: form.title,
      image: imageUrl,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      location: form.location,
      price: form.price,
      creator: form.userId,
    });
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async (updatedAccoData, accomodationId) => {
  try {
    const updatedPost = await databases.updateDocument(
      databaseId,
      accomodationsCollectionId,
      accomodationId,
      updatedAccoData
    );
    return updatedPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSavedPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      accomodationsCollectionId,
      [Query.contains("likedBy", userId)],
      Query.orderDesc("$createdAt")
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (postId) => {
  try {
    const post = await databases.getDocument(databaseId, accomodationsCollectionId, postId);
    return post;
  } catch (error) {
    throw new Error(error);
  }
};
