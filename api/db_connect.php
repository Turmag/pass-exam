<?php
/* Адрес сервера */
define("DB_HOST", "localhost");
/* Логин для соединения с базой */
define("DB_LOGIN", "u1296340_default");
/* Пароль для соединения с базой */
define("DB_PASSWORD", "RnlT_j8a");
/* Имя базы данных */
define("DB_NAME", "u1296340_default");
/* Устанавливаем соединение с сервером базы данных */
$connection = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME) or die("Не могу соединиться с сервером базы данных!");
?>