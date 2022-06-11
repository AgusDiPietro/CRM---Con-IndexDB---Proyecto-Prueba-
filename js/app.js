(function (){

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

    });

    //Crear la base de datos de Index DB
    function crearDB(){
        const crearDB = window.indexedDB.open('crma', 1);

        crearDB.onerror = function() {
            console.log('Error al crear base');
        }
        crearDB.onsuccess = function(){
            DB = crearDB.result;

        }

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', {keyPath: 'id', autoIncrement: true});

            objectStore.createIndex('nomobre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

            console.log('DB y lista creada');

        }
    }

}) ();