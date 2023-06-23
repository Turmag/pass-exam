<?php
require_once "sql-functions-lib.php";

$params = json_decode(file_get_contents("php://input"), true);

$thematicId = $params['thematicId'];

$questions = getThematicQuestions($thematicId);

echo(json_encode($questions));
?>