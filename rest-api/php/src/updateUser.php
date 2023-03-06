<?php
include('User.php');
session_start();

$id = $_POST['id'];
$out = "There was a mistake, no user was updated.";


for ($i = 0; $i < count($_SESSION['users']); $i++) {
    if ($id == $_SESSION['users'][$i]->id) {
        unset($_SESSION['users'], $i);
        $out = "User was updated.";
    }
}
echo $out;
?>