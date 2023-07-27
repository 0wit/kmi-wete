<?php
include('User.php');
session_start();

$id = $_POST['id'];
$out = "There was a mistake, no user was deleted.";

foreach($_SESSION['users'] as $key=>$value) {
    if ($id == $value->id) {
        unset($_SESSION['users'][$key]);
        $out = "User was deleted.";
    }
}

echo $out;
?>