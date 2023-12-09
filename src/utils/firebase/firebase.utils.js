import {initializeApp} from 'firebase/app'
import {getAuth,
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtIyB7pFsP-6mAfVi5pGWw6mFeDZGaQfo",
    authDomain: "clothing-ecomerce-db.firebaseapp.com",
    projectId: "clothing-ecomerce-db",
    storageBucket: "clothing-ecomerce-db.appspot.com",
    messagingSenderId: "855457780334",
    appId: "1:855457780334:web:fd531cbd5be0568d624c7f"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signinWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    //create collection, ex. categories 
    const collectionRef = collection(db, collectionKey)
    //create batch to begin the TRANSACTION
    const batch = writeBatch(db)
    //writing each item to collection
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef,object.title.toLowerCase())
        batch.set(docRef,object)
    })
    //fire the batch
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocument = async () =>{
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    // console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)

    //CREATE USER
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }
    else{
        return userDocRef
    }
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password){
        return;
    }else{
        return await createUserWithEmailAndPassword(auth,email,password)
    }
    
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password){
        return;
    }else{
        return await signInWithEmailAndPassword(auth,email,password)
    }
    
}

//SIGN OUT METHOD

export const signOutUser = async () => await signOut(auth)


//CENTRALIZE AND LISTEN TO AUTHORIZATION CHANGES DURING SIGN-IN/SIGN-UP AND SIGN-OUT
export const onAuthStateChanedListener = (callback) => onAuthStateChanged(auth, callback )