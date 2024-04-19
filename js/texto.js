textos = {
    simbol: {
        space: " ",
        mayorQ: ">",
        menorQ: "<",
        mayorIQ: ">=",
        menorIQ: "<=",
        igual: "=",
        saltoLinea: "<br>",
        guion: '-',
        mas: "+"
    },
    comando: {
        echo: "echo",
        dir: "dir",
        prompt: "prompt",
        tree: "tree",
        time: "time",
        systeminfo: "systeminfo",
        cd: "cd",
        break: "break",
        help: "help",
        rename: "rename",
        assoc: "assoc",
        ver: "ver",
        su: "su",
        start: "start",
        move: "move",
        clear: "clear",
        sudo: "sudo",
        tasklist: "tasklist",
        taskkill: "taskkill",
    },
    exe: {
        pico: "pico",
        criba: "criba",
        plantar: "plantar",
        talar: "talar",
        calentarH: "calentarhorno",
        horno: "horno",
        enfriar: "enfriar"
    },
    error: {
        noObjeto: "No hay de ese objeto en esta localizacion",
        imposible: "No se como has llegado aqui, enhorabuena supongo",
        noEjecutable: "No existe ese ejecutable",
        cansancio: "Has fallecio por cansancio",
        jugadorIncorrecto: "No existe un jugador con ese nombre",
        coordinadorIncorrecto: "No existe un coordinador con ese nombre",
        noJugador: "[ No se ha seleccionado un jugador ]",
        noCoordinador: "[ No se ha seleccionado un coordinador ]",
        noLibreJugador: "El jugador no esta libre",
        notAtributos: [
            "Atributos incorrectos",
            "¿Que quieres decir?",
            "Te comio la lengua el gato",
            "Sabes contar"
        ],
        notAccion: (comando) => [
            "'" + comando + "' no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.",
            "Comando incorrecto. Introduce help si no recuerdas el comando"
        ],
    },
    objetos: {
        piedra: "piedra",
        sedimentos: "sedimentos",
        tierra: "tierra",
        mineral: {
            nombre: "mineral de ",
            tipos: {
                cobre: "cobre",
                hierro: "hierro",
                carbon: "carbon"
            }
        },

        semilla: {
            nombre: "semilla de ",
            tipos: {
                arbol: "arbol"
            }
        },
        hoja: "hoja",
        fundido: {
            nombre: "fundido de ",
            tipos: {
                cobre: "cobre",
                hierro: "hierro",
                carbon: "carbon"
            }
        },
        lingote: {
            nombre: "lingote de ",
            tipos: {
                cobre: "cobre",
                hierra: "hierro",
                carbon: "carbon"
            }
        },
        manzana: "manzana",
        madera: "madera",
        ceniza: "ceniza"
    },
    herramientas: {
        pico: "pico",
        hacha: "hacha",
        cincel: "cincel",
        cubo: "cubo"
    },
    ruta: {
        nuevoName: "Cambio de nombre",
        move: "Nueva Ruta",
        misma: [
            "ya esta ahi",
            "Haz un dir"
        ],
        noReach: "Estas demasiado lejos para llegar",
        noExit: "No esta en este mapa",
    },
    de: "de",
    prompt: "> ",
    arrow: "=> ",
    guionS: " - ",
    barrera: " | ",
    eliminarTarea: "Eliminada la tarea",
    tituloTarea: "ID | TAREA | TIEMPO | PERSONAJE",
    cansancio: "Cansancio: ",
    admin: "admin",
    isPlant: "La semilla ha sido plantada",
    isTalando: "Comenzando a talar",
    mostrarHelp: "Si necesitas más informacion sobre un comando escribe 'help /? [comando]'",
    moveObjeto: "Un objeto ha sido movido",
    mina: "mina#",
    player: "player#",
    jugadorCorrecto: "Has seleccionado a un jugador",
    coordinadorCorrecto: "Has seleccionado a un coordinador",
    nombreMapa: (codeName) => [
        "MINA " + codeName
    ],
    version: "Ver: ",
    posicion: "Posicion ",
    time: "Momentos jugados: ",
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    empty: "Vacio"
}