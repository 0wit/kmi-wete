<?php

require './libs/Smarty.class.php';
$smarty = new Smarty;
$smarty->assign('myOptions',array(1800 =>'Joe Schmoe', 9904 =>'Jack Smith', 2003 =>'Charlie Brown'));
$smarty->assign('mySelect', 9904);
$smarty->display('index.tpl');

// prihlasovaci udaje
$host = 'db'; 
$user = 'root';
$pass = 'toor';

echo "<p>Webserver works!</p>";

// overeni pripojeni k databazi
$connection = new mysqli($host, $user, $pass);

if ($connection->connect_error) {
    die("<p>Connection failed: " . $conn->connect_error ."</p>");
} else {
    echo "<p>Connected to MySQL server successfully!</p>";
}

?>