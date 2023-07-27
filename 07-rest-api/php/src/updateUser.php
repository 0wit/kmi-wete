<?php
error_reporting(E_ERROR);
include('User.php');
session_start();

$id = $_POST['id'];
$out = "There was a mistake, no user was updated.";

foreach($_SESSION['users'] as $key=>$value) {
    if ($id == $value->id) {
        $out = "User was updated.";
        $_SESSION['users'][$key] = new User($id, $_POST['name'], $_POST['surname']);
    }
}

echo $out;
?>