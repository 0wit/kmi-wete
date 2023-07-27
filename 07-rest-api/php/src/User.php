<?php
class User {
  public function __construct(mixed $id,mixed $name,mixed $surname) {
    $this->id = $id;
    $this->name = $name;
    $this->surname = $surname;
  }
  public $id;
  public $name;
  public $surname;
  function set_id($id) {
    $this->id = $id;
  }
  function get_id() {
    return $this->id;
  }
  function set_name($name) {
    $this->name = $name;
  }
  function get_name() {
    return $this->name;
  }
  function set_surname($surname) {
    $this->surname = $surname;
  }
  function get_surname() {
    return $this->surname;
  }
}
?>
