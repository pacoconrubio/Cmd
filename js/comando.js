
// Sigue el flujo de la insercción de un comando (Imprimir el comando, Realizar la accion del comando, Devolver el texto del comando)

commander = (command) => {

    preTexter(promptText, command);

    if (tutorial.length > 0) {
        postTexter(tutorial[0]);
        tutorial.shift()
    }

    aCommand = command.toLowerCase().trim().split(textos.simbol.space);
    postText = filterComander(aCommand)

    $.each(task, (i, detalles) => {
        if (detalles.activa) {
            if (detalles.countdown + detalles.tiempo === time) {
                detalles.result()
                detalles.activa = false
            } else {
                detalles.tiempo--;
                detalles.countdown++;
            }
        }
    })
    playerSel(selPlayer).cansancio--;
    time++;

    postTexter(postText);
}

//Filtrar los comando y textos de resultados
function filterComander(aCommand) {

    action = aCommand.shift()

    switch (action) {
        case textos.comando.echo:
            respuesta = validarLen(echoCommand, aCommand, 1, textos.simbol.igual, 0);
            break;
        case textos.comando.move:
            respuesta = validarLen(moveCommand, aCommand, 4, textos.simbol.igual, 0);
            break;
        case textos.comando.start:
            respuesta = validarLen(startCommand, aCommand, 1, textos.simbol.mayorIQ, 1);
            break;
        case textos.comando.sudo:
            respuesta = validarLen(sudoCommand, aCommand, 3, textos.simbol.igual, -1);
            break;
        case textos.comando.cd:
            respuesta = validarLen(cdCommand, aCommand, 1, textos.simbol.igual, 1);
            break;
        case textos.comando.rename:
            respuesta = validarLen(renameCommand, aCommand, 2, textos.simbol.igual, 0);
            break;
        case textos.comando.dir:
            respuesta = validarLen(dirCommand, aCommand, 0, textos.simbol.igual, 1);
            break;
        case textos.comando.taskkill:
            respuesta = validarLen(taskkillCommand, aCommand, 1, textos.simbol.igual, 0);
            break;
        case textos.comando.prompt:
            respuesta = validarLen(promptCommand, aCommand, 1, textos.simbol.igual, 0);
            break;
        case textos.comando.tree:
            respuesta = validarLen(treeCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        case textos.comando.time:
            respuesta = validarLen(timeCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        case textos.comando.help:
            respuesta = validarLen(helpCommand, aCommand, 0, textos.simbol.mayorIQ, -1);
            break;
        case textos.comando.assoc:
            respuesta = validarLen(assocCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        case textos.comando.systeminfo:
            respuesta = validarLen(systeminfoCommand, aCommand, 0, textos.simbol.igual, 1);
            break;
        case textos.comando.clear:
            respuesta = validarLen(clearCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        case textos.comando.tasklist:
            respuesta = validarLen(tasklistCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        case textos.comando.ver:
            respuesta = validarLen(verCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        case textos.comando.su:
            respuesta = validarLen(suCommand, aCommand, 2, textos.simbol.igual, -1);
            break;
        case textos.comando.break:
            respuesta = validarLen(breakCommand, aCommand, 0, textos.simbol.igual, 0);
            break;
        default:
            respuesta = falseCommand(action);
            break;
    }

    return respuesta;
}

//Comando erroneo
function falseCommand(noComando) {
    return getSRandom(textos.error.notAccion(noComando))
}

//Break: Salta uno en el tiempo / Sin funcion
function breakCommand() {
    return '';
}

function moveCommand(command) {

    jugador1 = command[0];
    command.shift()
    command.shift()
    object = command[0];
    command.shift()
    jugador2 = command[0];

    $.each(personajes, (i, detalles) => {
        if (detalles.nombre === jugador1) {
            jugador1 = detalles
        }
    })
    $.each(personajes, (i, detalles) => {
        if (detalles.nombre === jugador2) {
            jugador2 = detalles
        }
    })
    if (jugador1.posicion === jugador2.posicion) {
        if (jugador1.inventario[object].valor > 0) {
            jugador1.inventario[object].valor--;
            jugador2.inventario[object].valor++;
        }
    }
    return textos.guionS
}

//Clear: Limpia la consola
function clearCommand() {
    clear()
}

//Su: Acceso a un jugador
function suCommand(comando) {

    guion = comando.shift()

    if (guion === textos.simbol.guion) {
        respuesta = selectPlayer(comando, false);
    } else if (guion === textos.simbol.mas) {
        respuesta = selectPlayer(comando, true);
    } else {
        respuesta = getSRandom(textos.error.notAtributos);
    }
    return respuesta
}

//Sudo: Acesso a un coordinador
function sudoCommand(comando) {

    comando.shift();
    comando[0] = "+"
    return validarLen(suCommand, comando, 2, textos.simbol.igual, -1);
}

//Start: Comienzo de accion
function startCommand(aComando) {

    ejecutable = aComando.shift();
    objecto = aComando.shift();

    return selectEjecutable(ejecutable, objecto);
}

//Systeminfo: Devuelve los datos del jugador
function systeminfoCommand() {

    texto = textos.cansancio + playerSel(selPlayer).cansancio + textos.simbol.saltoLinea

    $.each(Object.values(playerSel(selPlayer).inventario), (objeto, detalles) => {
        if (detalles.valor > 0) {
            texto += textos.guionS + detalles.texto + textos.simbol.space + textos.arrow + detalles.valor + textos.simbol.saltoLinea;
        }
    })
    $.each(Object.values(playerSel(selPlayer).herramientas), (objeto, detalles) => {
        if (detalles.valor > 0) {
            texto += textos.guionS + detalles.texto + textos.simbol.space + textos.arrow + detalles.valor + textos.simbol.saltoLinea;
        }
    })

    return texto
}

//Dir: Devuelve la posicion en el mapa del jugador
function dirCommand() {
    texto = ''
    $.each(playeronMap(), (key, detalles) => {
        if (typeof detalles === 'number') {
            if (detalles > 0) {
                texto += textos.arrow + key + textos.simbol.igual + detalles + textos.simbol.saltoLinea
            }
        } else if (typeof detalles === 'object') {

        } else {
            texto += detalles + textos.simbol.saltoLinea
        }
    });
    return texto;
}

//Assoc: Muestra el listado de objetos
function assocCommand() {
    return atoString(procesarObjetos(textos.objetos), textos.simbol.saltoLinea);
}

//ver: Muestra el nombre del mapa
function verCommand() {
    return textos.version + mapa.nombre;
}

//Help: devuelve la descripcion de la lista de help
function helpCommand() {
    return atoString(textos.comando, textos.simbol.saltoLinea) + textos.mostrarHelp;
}

//Prompt: devuelve la posicion en el mapa del jugador
function promptCommand(texto) {
    if (typeof parrafo === 'array') {
        promptText = atoString(texto, textos.simbol.space);
    } else {
        promptText = texto;
    }
}

//Time: Devuelve la hora
function timeCommand() {
    return textos.time + time;
}

//Rename: renombra una region del mapa
function renameCommand(comando) {

    nombreOld = comando.shift()
    nombreNew = comando.shift()

    if ((i = mapa.region.findIndex(region => region.nombre === nombreOld)) !== -1) {
        mapa.region[i].nombre = nombreNew
        texto = textos.ruta.nuevoName;
    } else {
        texto = textos.ruta.noExit;
    }

    return texto;
}

//Tree: Devuelve todas las piezas del mapa y la posicion
function treeCommand() {

    texto = '';

    $.each(mapa.region, (i, region) => {
        if (i == playerSel(selPlayer).posicion) {
            texto += textos.simbol.mayorQ + textos.simbol.space + region.nombre + textos.simbol.saltoLinea;
        } else {
            texto += region.nombre + textos.simbol.saltoLinea;
        }
    });

    return texto;
}

//Cd: mueve al personaje por el mapa
function cdCommand(comando) {
    lugar = comando.shift()
    return movePersonaje(lugar.toLowerCase());
}

//Tasklist: Muestra el listado de tareas
function tasklistCommand() {
    texto = textos.tituloTarea + textos.simbol.saltoLinea
    $.each(task, (i, detalles) => {
        if (detalles.activa) {
            texto += i + textos.barrera + detalles.nombre + textos.barrera + detalles.tiempo + textos.barrera + detalles.personaje.nombre + textos.simbol.saltoLinea
        }
    })
    return texto;
}

//Taskkil: Elimina una tarea de la lista
function taskkillCommand(command) {
    texto = ''
    $.each(task, (i, detalles) => {
        if (detalles.activa && i === parseInt(command[0])) {
            detalles.activa = false
            texto = textos.eliminarTarea
        }
    })
    return texto;
}

//ECHO: muestra el texto de los parametros
function echoCommand(parrafo) {

    if (typeof parrafo === 'array') {
        texto = atoString(parrafo);
    } else {
        texto = parrafo;
    }

    return texto;
}