import { db, auth } from "./firebase";

export const getProjects = async () => {
    // create projects array
    let projects = [];

    // get collection reference (query snapshot)
    let snapshot = await db.collection('projects').get();

    // traverse snapshot for documents in collection, add to array
    snapshot.forEach((doc => {
        projects.push(doc.data());
    }));

    return projects;

    // db.collection('projects').get().then((snapshot) => {
    //     snapshot.forEach((doc => {
    //         projects.push(doc.data());
    //
    //         this.setState({ projects });
    //         // console.log(doc.data());
    //     }))
    // });
}

export const createUserwithFields = async (full_name, graduation, preferred_name, email) => {
    var user = auth.currentUser;
    return(db.collection("users").doc(user.uid).set({
        full_name: "",
        preferred_name: "",
        graduation:"",
        email:""
    }));
}

export const getUserProfile = async () => {
    var user = auth.currentUser;
    let docRef = await db.collection("users").doc(user.uid).get();
    return docRef;
}
