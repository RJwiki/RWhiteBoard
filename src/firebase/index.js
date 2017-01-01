import { config } from './config';

export const App = firebase.initializeApp(config);
export const Db = App.database();
export const dbControl = {
    getUserID: function() {
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
            return firebase.auth().currentUser.uid;
        }
    },
    createID: function(path) {
        //return firebase.database().ref().child(path).push().key;
        return Db.ref().child(path).push().key;
    },
    updateStore: function(path, item) {
        let updates = {};
        updates[path] = item;
        return Db.ref().update(updates);
    },
    deleteStore: function(path) {
        return Db.ref(path).remove();
    },
    addItem: function(path, key, item) {
        return dbControl.updateStore(path + '/' + key, item);
    },
    updateItem: function(path, key, item) {
        return dbControl.updateStore(path + '/' + key, item);
    },
    deleteItem: function(path, key) {
        return dbControl.deleteStore(path + '/' + key);
    }
}
