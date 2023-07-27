<?php
session_start();
$_SESSION['users'];
?>

<!DOCTYPE html>
<html>
<body>
  <h2>Get Users</h2>
  <form action="getUsers.php" method = "get">
      <input type = "submit" name = "submit" value = "Submit"> 
  </form>
  <h2>Get User</h2>
  <form action="getUser.php" method = "get">               
      <input type = "text" name = "id" /> ID 
      <br><br>                                                
      <input type = "submit" name = "submit" value = "Submit"> 
  </form>
  <h2>Add User</h2>
  <form action="addUser.php" method = "post">               
      <input type = "text" name = "id" /> ID 
      <br><br>                                      
      <input type = "text" name = "name" /> Name                   
      <br><br>              
      <input type = "text" name = "surname" /> Surname
      <br><br>          
      <input type = "submit" name = "submit" value = "Submit"> 
  </form>
  <h2>Update User</h2>
  <form action="updateUser.php" method = "post">               
      <input type = "text" name = "id" /> ID 
      <br><br>                                      
      <input type = "text" name = "name" /> Name                   
      <br><br>              
      <input type = "text" name = "surname" /> Surname
      <br><br>          
      <input type = "submit" name = "submit" value = "Submit"> 
  </form>
  <h2>Delete User</h2>
  <form action="deleteUser.php" method = "post">               
      <input type = "text" name = "id" /> ID 
      <br><br>       
      <input type = "submit" name = "submit" value = "Submit"> 
  </form>
</body>  
</html> 