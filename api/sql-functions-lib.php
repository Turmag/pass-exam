<?php
header("Content-Type: text/html; charset=utf-8");
require "db_connect.php";

function myThematics(){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, 'utf8');
	
    $sql = "SELECT
                *
            FROM game_thematics
			ORDER BY id";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
    return dataBaseToArray($result);
}

function getThematicById($id){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, 'utf8');
	
    $sql = "SELECT
                *
            FROM game_thematics
			WHERE id = '$id'";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
    return dataBaseToArray($result)[0];
}

function myQuestions(){
	$mysqli = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);
	mysqli_set_charset($mysqli, 'utf8');
	
    $sql = "SELECT
                *
            FROM game_questions
			ORDER BY id";
    $result = mysqli_query($mysqli, $sql) or die(mysqli_connect_error());
    return dataBaseToArray($result);
}

function getThematicQuestions($thematicId){
	$questions = myQuestions();
	$thematic = getThematicById($thematicId);
	$questionsArr = [];
	$thematicQuestionIds = json_decode($thematic['questionsIds']);
	
	if(is_array($thematicQuestionIds)){
		foreach ($questions as $question) {
			if (in_array($question['id'], $thematicQuestionIds)) {
				$questionsArr[] = $question;
			}
		}
	}
	
	
	return $questionsArr;
}

function dataBaseToArray($result) {
    $fields = mysqli_fetch_fields($result);
    $data = array();
    $types = array();

    foreach($fields as $field) {
        switch($field->type) {
            case MYSQLI_TYPE_NULL:
                $types[$field->name] = 'null';
                break;
            case MYSQLI_TYPE_BIT:
                $types[$field->name] = 'boolean';
                break;
            case MYSQLI_TYPE_TINY:
            case MYSQLI_TYPE_SHORT:
            case MYSQLI_TYPE_LONG:
            case MYSQLI_TYPE_INT24:
            case MYSQLI_TYPE_LONGLONG:
                $types[$field->name] = 'int';
                break;
            case MYSQLI_TYPE_FLOAT:
            case MYSQLI_TYPE_DOUBLE:
                $types[$field->name] = 'float';
                break;
            default:
                $types[$field->name] = 'string';
                break;
        }
    }
    while($row = mysqli_fetch_assoc($result)) array_push($data,$row);
    for($i = 0; $i < count($data); $i++) {
        foreach($types as $name => $type) {
            settype($data[$i][$name], $type);
        }
    }

    return $data;
}   
?>