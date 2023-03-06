<?php
include('User.php');
session_start();

$id = $_POST['id'];

foreach ($_SESSION['users'] as $element ) {
    if ($id == $element->id ) {
        unset($_SESSION['users'][$id]);
    }
}

echo("User was deleted.");
?>