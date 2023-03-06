<?php
include('User.php');
session_start();

$user = new User($_POST['id'], $_POST['name'], $_POST['surname']);
$_SESSION['users'][] = $user;
echo("User was added.");

?>