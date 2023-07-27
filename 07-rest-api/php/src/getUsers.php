<?php
error_reporting(E_ERROR);
include('User.php');
session_start();

echo("id;name;surname");
$data = $_SESSION['users'];
foreach ($data as $item){
    echo ";" . $item->id . ";" . $item->name . ";" . $item->surname;
}

?>