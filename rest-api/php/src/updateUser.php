<?php
include('User.php');
session_start();

$input = $_POST['id'];

if(($key = array_search($input, $array, TRUE)) !== FALSE) {
    unset($_SESSION['users'][$key]);
}

?>