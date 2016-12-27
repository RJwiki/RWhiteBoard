//https://firebase.google.com/docs/database/web/retrieve-data

const firebaseStore = {
    getUserID: function() {
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
            return firebase.auth().currentUser.uid;
        }
    },
    createID: function(path) {
        //usage: firebase.database().ref().child('/orderData/' + userId).push().key
        return firebase.database().ref().child(path).push().key;
    },
    updateStore: function(path, item) {
        let updates = {};
        updates[path] = item;
        return firebase.database().ref().update(updates);
    },
    deleteStore: function(path) {
        return firebase.database().ref(path).remove();
    },
    addItem: function(path, key, item) {
        return firebaseStore.updateStore(path + '/' + key, item);
    },
    updateItem: function(path, key, item) {
        return firebaseStore.updateStore(path + '/' + key, item);
    },
    deleteItem: function(path, key) {
        return firebaseStore.deleteStore(path + '/' + key);
    }
}

export default firebaseStore