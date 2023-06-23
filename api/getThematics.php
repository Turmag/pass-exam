<?php
require_once "sql-functions-lib.php";

$thematics = myThematics();

echo(json_encode($thematics));
?>