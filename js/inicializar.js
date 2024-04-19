
// Iniciar el mapa
inicializateMap = () => {

    nombre = textos.nombreMapa(RandomText());
    region = createRegiones(50)

    map = {
        nombre: nombre,
        region: region
    }

    return map;
}

// Iniciar el jugador
inicializatePlayers = () => {

    tamano = 3;
    players = []
    

    for (i = 0; i < tamano; i++) {
        players[i] = inicializatePlayer(i.toString());
    }

    return players;
}

//Iniciar un jugador
inicializatePlayer = (index) => {

    posicion = 0
    nombre = textos.player + index
    cansancio = 100
    obj = createInventario();

    return {
        nombre: nombre,
        posicion: posicion,
        inventario: obj.inventario,
        herramientas: obj.herramientas,
        cansancio: cansancio
    }
}

//Iniciar un coordinador
inicializateCoordinator = () => {

    return {
        nombre: textos.admin,
        cansancio: 500,
        posicion: -1
    }
}

//Crear el inventario de un jugador jugador
createInventario = () => {

    inventario = []
    herramientas = []
    object = procesarObjetos(textos.objetos, false)
    utiles = procesarObjetos(textos.herramientas, false)
    $.each(object, (i, texto) => {
        inventario[texto] = ({ texto: texto, valor: 0 });
    });
    $.each(utiles, (i, texto) => {
        herramientas[texto] = ({ texto: texto, valor: 0 });
    });

    return { inventario: inventario, herramientas: herramientas }
}

//Crear las reguiones con un {lenMax}
createRegiones = (lenMax) => {

    tamano = getAleatorio(2, lenMax);
    regiones = []

    for (i = 0; i < tamano; i++) {
        regiones[i] = createRegion(i, lenMax);
    }

    return regiones
}

//Crear una sola reguion
createRegion = (index, lenRegiones) => {

    nombre = textos.mina + index;
    piedralen = getAleatorio(2, lenRegiones / 2);
    semilla = 0
    arbol = 0
    horno = {
        fundido: textos.empty,
        hot: false
    }
    return {
        nombre: nombre,
        piedra: piedralen,
        semilla: semilla,
        arbol: arbol,
        horno: horno
    }
}

//Inicializaciones
inicializar = () => {

    mapa = inicializateMap();
    personajes = inicializatePlayers();

    coordinador = inicializateCoordinator();
    selPlayer = -1

    promptText = textos.prompt;
    time = 0
    task = []
    tutorial = []
}