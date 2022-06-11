(function() {
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        // nos conectamos al DB
        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    }); 

    function conectarDB() {
      const abrirConexion = window.indexedDB.open('crma', 1);
    
      abrirConexion.onerror = function() {
        console.log('Error al conectar a la base');}

      abrirConexion.onsuccess = function(){
        DB = abrirConexion.result;}
    }
    
    function validarCliente(e){
        e.preventDefault();

        //Leer los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre==='' || email==='' || telefono==='' || empresa===''){
            imprimirAlerta('Todos los campos son obligatorios','error');

            return;
        }
       
        //Crear objeto con la info 
        const cliente= {
            nombre: nombre,
            email: email,
            telefono: telefono,
            empresa: empresa,
        }
        cliente.id= Date.now();

        crearNuevoCliente(cliente);
    };
    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'],'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error', 'error');
        };
        transaction.onecomplete = function() {
            imprimirAlerta('cliente Agregado');
            //una vez agregado el cliente nos lleve al UI de la lista de los clientes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2500);
        };
    }
    

    function imprimirAlerta(mensaje, tipo){
        
        const alerta = document.querySelector('.alerta');
        
        if(!alerta){
          //Crear alerta
          const divMensaje = document.createElement('div');
          divMensaje.classList.add('px-4','py-3','rounded','mas-w-lg','mx-auto','mt-6','text-center','border');
  
          if (tipo==='error'){
            divMensaje.classList.add('bg-red-100','border-red-400','text-red-700');
          }else { 
            divMensaje.classList.add('bg-green-100','border-green-400','text-green-700');}

          divMensaje.textContent = mensaje;

          formulario.appendChild(divMensaje);
          setTimeout(() => {
            divMensaje.remove();
            }, 2000);
        }
    }

} )();