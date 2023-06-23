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

function dataBaseToArray($result){
    $array = array();
    while($row = mysqli_fetch_assoc($result)){
        $array[] = $row;
    }
    return $array;
}
?>