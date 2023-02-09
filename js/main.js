$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});
var url = "http://localhost/casaabierta/";
var aplicacion = new function(){
    dni = document.getElementById("dni");
    nombre = document.getElementById("name");
    lastname = document.getElementById("lastname");
    email = document.getElementById("email");
    password = document.getElementById("password");
    phone = document.getElementById("phone");

    editDni = document.getElementById("editDni");
    editNombre = document.getElementById("editName");
    editLastname = document.getElementById("editLastname");
    editEmail = document.getElementById("editEmail");
    editPassword = document.getElementById("editPassword");
    editPhone = document.getElementById("editPhone");

    users = document.getElementById("users");

    this.Leer= function(){
        var datos = "";
        
        fetch(url)
        .then(r=>r.json())
        .then((respuesta)=>{
            // console.log(respuesta);

            respuesta.map(
                function(users,index,array){
                    datos += "<tr>";
                    datos += "<td>"+users.dni+"</td>";
                    datos += "<td>"+users.name+"</td>";
                    datos += "<td>"+users.lastname+"</td>";
                    datos += "<td>"+users.email+"</td>";
                    datos += "<td>"+users.phone+"</td>";
                    datos += '<td><div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-info" onclick="aplicacion.Editar('+users.dni+')">Editar</button><button type="button" class="btn btn-danger" onclick="aplicacion.Borrar('+users.dni+')">Borrar</button></div></td>';
                    datos += "</tr>";

                }
            );
            return users.innerHTML=datos;
        })
        .catch(console.log);

        /*datos = "<tr><td>100</td><td>Nahuel</td><td>nahuelgonzalezg@gmail.com</td><td>Editar | Borar</td></tr>";*/

    };
    this.Agregar= function(){

        var datosEnviar = {dni:dni.value, name:nombre.value, lastname:lastname.value, email:email.value, password:password.value, phone:phone.value}

        fetch(url+"?insertar=1",{method:"POST", body:JSON.stringify(datosEnviar)})
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log("Insertados");
            this.Leer();
        })
        .catch(console.log);
    };

    this.Borrar=function(dni){
        console.log(dni)

        fetch(url+"?borrar="+dni,)
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            this.Leer();
        })
        .catch(console.log);
    }

    this.Editar=function(dni){
        var modal = new bootstrap.Modal(document.getElementById('editModal'),{Keyboard:false});

        fetch(url+"?consultar="+dni)
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);

            editDni.value=datosRespuesta[0]['dni'];
            editNombre.value=datosRespuesta[0]['name'];
            editLastname.value=datosRespuesta[0]['lastname'];
            editEmail.value=datosRespuesta[0]['email'];
            editPassword.value=datosRespuesta[0]['password'];
            editPhone.value=datosRespuesta[0]['phone'];
        })
        .catch(console.log);

        modal.show();
    }

    this.Actualizar=function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal'),{Keyboard:false});
        
        var datosEnviar = {dni:editDni.value, name:editNombre.value, lastname:editLastname.value, email:editEmail.value, password:editPassword.value, phone:editPhone.value}

        fetch(url+"?actualizar=1",{method:"POST", body:JSON.stringify(datosEnviar)})
        .then(r=>r.json())
        .then((datosRespuesta)=>{
            console.log("Actualizados");
            this.Leer();
            modal.hide();
        })
        .catch(console.log);
    }

}
Coneccion=function(){
    console.log('conectado');
}
aplicacion.Leer();