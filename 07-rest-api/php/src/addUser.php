<?php
error_reporting(E_ERROR);
include('User.php');
session_start();

$id = $_POST['id'];
$out = "User was added.";
$found = false;

if (empty($id) || !is_numeric($id)) {
    $out = "There was a mistake, no user was added.";
    $found = true;
}

else {
    foreach ($_SESSION['users'] as $key => $value) {
        if ($id == $value->id) {
            $out = "There was a mistake, no user was added.";
            $found = true;
        }
    }
}

if (!$found) {
    $user = new User($_POST['id'], $_POST['name'], $_POST['surname']);
    $_SESSION['users'][] = $user;
}

echo ($out);
?>