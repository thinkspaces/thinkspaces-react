import { storage } from "./firebase";

export const uploadFiles = async () => {
    var storageRef = storage().ref();
    var file = File();
    ref.put(file).then(function(snapshot)) {
        console.log('Uploaded a blob or file');
    }
}
