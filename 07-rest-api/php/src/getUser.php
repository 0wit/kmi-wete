<?php
include('User.php');
session_start();

$id = $_GET['id'];
$out = "ID is invalid. No such user exists.";

foreach ($_SESSION['users'] as $item){
    if ($item->id == $id) {
        $out="id;name;surname;" . $id . ";" . $item->name . ";" . $item->surname;
    }
}

echo $out;
?>