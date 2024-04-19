<?php

require_once('model.php');

$conexionBD = new ConexionBD();

$query = "SELECT id, nombre FROM texto where id=3";
$titulo = $conexionBD->ejecutarConsulta($query);
$query = "SELECT id, nombreArchivo FROM archivo";
$archivos = $conexionBD->ejecutarConsulta($query);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $titulo[0]['nombre'] ?></title>
    <style>
        p,
        input {
            color: white !important;
            font-family: Consolas;
        }

        input {
            border: white !important;
            outline: none !important;
            box-shadow: none !important;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body class="bg-dark">
    <div id="cmd" class="w-100 pt-1">
        <div id="cmd_output" class="px-4"></div>
        <input type="text" id="cmd_input" class="form-control w-100 px-4 sticky-bottom bg-dark" autofocus>
        <button id="debug" hidden></button>
    </div>
</body>
<?php
foreach ($archivos as $archivo) {
    echo '<script src="js/' . $archivo['nombreArchivo'] . '"></script>';
}
?>

</html>