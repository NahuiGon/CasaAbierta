<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "casaabierta";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlUsers = mysqli_query($conexionBD,"SELECT * FROM users WHERE dni=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlUsers) > 0){
        $users = mysqli_fetch_all($sqlUsers,MYSQLI_ASSOC);
        echo json_encode($users);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlUsers = mysqli_query($conexionBD,"DELETE FROM users WHERE dni=".$_GET["borrar"]);
    if($sqlUsers){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $dni=$data->dni;
    $name=$data->name;
    $lastname=$data->lastname;
    $email=$data->email;
    $password=$data->password;
    $phone=$data->phone;
    if(($dni!="")&&($name!="")){
        $sqlUsers = mysqli_query($conexionBD,"INSERT INTO users(dni, name, lastname, email, password, phone) VALUES('$dni','$name', '$lastname','$email', '$password','$phone') ");
        echo json_encode(["success"=>1]);
    }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $dni=(isset($data->dni))?$data->dni:$_GET["actualizar"];
    $name=$data->name;
    $lastname=$data->lastname;
    $email=$data->email;
    $password=$data->password;
    $phone=$data->phone;
    
    $sqlUsers = mysqli_query($conexionBD,"UPDATE users SET name='$name', lastname='$lastname', email='$email', password='$password', phone='$phone' WHERE dni='$dni'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla empleados
$sqlUsers = mysqli_query($conexionBD,"SELECT * FROM users ");
if(mysqli_num_rows($sqlUsers) > 0){
    $users = mysqli_fetch_all($sqlUsers,MYSQLI_ASSOC);
    echo json_encode($users);
}
else{ echo json_encode([["success"=>0]]); }


?>