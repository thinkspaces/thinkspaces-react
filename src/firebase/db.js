import { db } from "./firebase";

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
