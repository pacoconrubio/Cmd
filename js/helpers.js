
//Devuelve un numero aleatorio en un intervalo de un {min} and {max}
getAleatorio = (min, max) => {
    $.ajax({
        async:false,
        url: './controlador/helpers.php',
        type: 'GET',
        success: function(response){
            return response
        }
    });
    
    return Math.floor(Math.random() * (max - min) + min);
}

//Devover un texto con un array que lo separan los {split}
atoString = (parrafo, split = ' ') => {
    let texto = '';
    $.each(parrafo, (key, word) => {
        texto += word + split;
    });

    return texto;
};

//Procesar los textos de los objectos para crear un array
procesarObjetos = (objeto, arrow = true, pre = '') => {
    texto = []

    $.each(objeto, function (clave, valor) {
        if ($.isPlainObject(valor)) {
            texto = $.merge(texto, procesarObjetos(valor.tipos, arrow, valor.nombre));
        } else {
            if (arrow) {
                texto.push(textos.arrow + pre + valor);
            } else {
                texto.push(pre + valor);
            }
        }
    });
    return texto
}

//Devuelve una palabra aleatorio del {array}
getSRandom = (array) => {
    return array[getAleatorio(0, array.length)]
}

//Devolver si la {aLen} de un array es {type} a {size}
isSize = (aLen, size, type) => {
    switch (type) {
        case textos.simbol.mayorQ:
            return aLen > size;
        case textos.simbol.menorQ:
            return aLen < size;
        case textos.simbol.igual:
            return aLen === size;
        case textos.simbol.mayorIQ:
            return aLen >= size;
        case textos.simbol.menorIQ:
            return aLen <= size;
        default:
            return true; // Si el tipo no coincide, se devuelve true
    }
}

//Genera un numero aleatorio de {len} charactes
RandomText = (len) => {

    characters = textos.characters;
    result = '';

    for (i = 0; i < len; i++) {
        result += characters.charAt(getAleatorio(0, characters.length));
    }

    return result;
}

// Imprimir el texto del comando
preTexter = (promptText, text) => {
    preText = promptText + text
    newTexter(preText);
}

// Imprimir el resultado del comando, si fuera necesario
postTexter = (text = '') => {
    newTexter(text);
}
//Validar la len de un array para introducir la funcion
validarLen = (func, params, size, type, player) => {
    if (isSize(params.length, size, type)) {
        respuesta = isEmptyPlayer(player)
        if (respuesta.existe) {
            respuesta = func(params);
        } else {
            respuesta = respuesta.texto
        }
    } else {
        respuesta = getSRandom(textos.error.notAtributos);
    }

    return respuesta;
};

//Conseguir el comando anterior a partir del listado
getCommandBack = () => {
    if (indexCom < historialComandos.length - 1) {
        indexCom++;
    }
    return historialComandos[indexCom];
}

//Conseguir el comando posterior a partir del listado
getCommandPost = () => {
    if (indexCom > 0) {
        indexCom--;
    } else if (indexCom === 0) {
        indexCom = -1;
        eraseText();
    }
    return historialComandos[indexCom];
}

//Seleciona el jugador
selectPlayer = (comando, admin) => {

    nombre = comando.shift()
    encontrado = false
    if (admin) {
        if (coordinador.nombre === nombre) {
            selPlayer = -1;
            texto = textos.coordinadorCorrecto
        } else {
            texto = textos.error.coordinadorIncorrecto
        }
    } else {
        $.each(personajes, (key, detalles) => {
            if (detalles.nombre === nombre) {
                selPlayer = key
                encontrado = true
                texto = textos.jugadorCorrecto
            }
        });
        if(encontrado === false){
            texto = textos.jugadorIncorrecto
        }
    }
    return texto
}
addTarea = (nombre, tiempo, tiempoactual, data = () => { return }, personaje, selPlayer, libre) => {


    tarea = {
        nombre: nombre,
        tiempo: tiempo,
        countdown: tiempoactual,
        activa: true,
        result: () => {
            data(selPlayer)
        },
        personaje: personaje,
        libre: libre

    }
    return tarea
}
isEmptyPlayer = (player) => {

    respuesta = ''
    libre = true
    if (player === 1) {
        $.each(task, (i, detalles) => {
            if (!detalles.libre) {
                if (detalles.activa && detalles.personaje.nombre === playerSel(selPlayer).nombre) {
                    libre = false
                }
            }
        })
        if (libre) {
            if (playerSel(selPlayer).posicion > -1) {
                existe = true
            } else {
                existe = false
                respuesta = textos.error.noJugador
            }
        } else {
            respuesta = textos.error.noLibreJugador
        }
    } else if (player === 0) {
        if (playerSel(selPlayer).posicion === -1) {
            existe = true
        } else {
            existe = false
            respuesta = textos.error.noCoordinador
        }
    } else {
        existe = true
    }
    return { existe: existe, texto: respuesta }
}

//Muestra la posicion del jugador en el mapa
playeronMap = (index = playerSel(selPlayer).posicion) => {
    return mapa.region[index];
}
//Muestra la posicion del jugador en el mapa
playerSel = (index) => {
    //
    if (index === -1) {
        return coordinador
    } else {
        return personajes[index];
    }
}

//Mueve al personaje por el mapa
movePersonaje = (lugar) => {

    map = mapa.region
    persPos = playerSel(selPlayer).posicion;

    if (lugar === map[persPos].nombre) {
        texto = getSRandom(textos.ruta.misma);
    } else if (persPos > 0 && lugar === map[persPos - 1].nombre) {
        playerSel(selPlayer).posicion--;
        texto = textos.ruta.move;
    } else if (persPos < map.length - 1 && lugar === map[persPos + 1].nombre) {
        playerSel(selPlayer).posicion++;
        texto = textos.ruta.move;
    } else if (map.includes(lugar)) {
        texto = textos.ruta.noReach;
    } else {
        texto = textos.ruta.noExit;
    }

    return texto;
}