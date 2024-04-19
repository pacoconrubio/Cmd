<?php

class ConexionBD
{
    private $host = "localhost";
    private $usuario = "root";
    private $password = "";
    private $baseDatos = "proyect";
    private $conexion;

    // Método para establecer la conexión a la base de datos
    public function conectar()
    {
        $this->conexion = new mysqli($this->host, $this->usuario, $this->password, $this->baseDatos);

        // Verificar si hay errores en la conexión
        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
    }

    // Método para cerrar la conexión a la base de datos
    public function cerrarConexion()
    {
        if ($this->conexion) {
            $this->conexion->close();
        }
    }

    // Método para ejecutar consultas SQL
    public function ejecutarConsulta($consulta)
    {
        $this->conectar();
        $resultado = $this->conexion->query($consulta);
        $this->cerrarConexion();
        if ($resultado) {
            while ($fila = $resultado->fetch_assoc()) {
                $resultadosArray[] = $fila;
            }
    
            $resultado->free_result();
        } else {
            $result = "Error en la consulta: ";
        }
        return $resultadosArray;
    }
}
