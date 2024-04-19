selectEjecutable = (ejecutable, objecto) => {
    switch (ejecutable) {
        case textos.exe.pico:
            if (playeronMap().piedra > 0) {
                playerSel(selPlayer).inventario.piedra.valor++;
                playeronMap().piedra--;
                texto = textos.moveObjeto;
            } else {
                texto = textos.error.noObjeto;
            }
            break;
        case textos.exe.criba:

            if (objecto == textos.objetos.piedra) {

                if (playerSel(selPlayer).inventario.piedra.valor > 0) {

                    playerSel(selPlayer).inventario.piedra.valor--;

                    data = (selPlayer) => {
                        playerSel(selPlayer).inventario.sedimentos.valor++;
                    }

                    task.push(addTarea(textos.exe.criba + objecto, 1, time, data, playerSel(selPlayer), selPlayer, false))
                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else if (objecto == textos.objetos.sedimentos) {
                if (playerSel(selPlayer).inventario.sedimentos.valor > 0) {

                    playerSel(selPlayer).inventario.sedimentos.valor--;

                    data = (selPlayer) => {
                        playerSel(selPlayer).inventario.tierra.valor++
                        playerSel(selPlayer).inventario['mineral de carbon'].valor++;
                        playerSel(selPlayer).inventario['mineral de hierro'].valor++;
                        playerSel(selPlayer).inventario['mineral de cobre'].valor++;
                    }

                    task.push(addTarea(textos.exe.criba + objecto, 1, time, data, playerSel(selPlayer), selPlayer, false))
                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else if (objecto == textos.objetos.tierra) {
                if (playerSel(selPlayer).inventario.tierra.valor > 0) {
                    playerSel(selPlayer).inventario.tierra.valor--;

                    data = (selPlayer) => {
                        playerSel(selPlayer).inventario['semilla de arbol'].valor++
                    }

                    task.push(addTarea(textos.exe.criba + objecto, 1, time, data, playerSel(selPlayer), selPlayer, false))
                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else {
                texto = textos.error.noObjeto;
            }
            break;
        case textos.exe.plantar:
            if (objecto === textos.objetos.ceniza) {
                if (playerSel(selPlayer).inventario['semilla de arbol'].valor > 0
                    && playerSel(selPlayer).inventario.tierra.valor > 0
                    && playerSel(selPlayer).inventario.ceniza.valor > 0) {


                    playerSel(selPlayer).inventario['semilla de arbol'].valor--;
                    playerSel(selPlayer).inventario.tierra.valor--;
                    playerSel(selPlayer).inventario.ceniza.valor--;
                    playeronMap().semilla++;

                    data = (selPlayer) => {
                        playeronMap(playerSel(selPlayer).posicion).arbol++
                        playeronMap(playerSel(selPlayer).posicion).semilla--;
                    }

                    task.push(addTarea(textos.exe.plantar, 3, time, data, playerSel(selPlayer), selPlayer, true))
                    texto = textos.isPlant
                } else {
                    texto = textos.error.noObjeto;
                }
            } else {
                if (playerSel(selPlayer).inventario['semilla de arbol'].valor > 0
                    && playerSel(selPlayer).inventario.tierra.valor > 0) {

                    playerSel(selPlayer).inventario['semilla de arbol'].valor--;
                    playerSel(selPlayer).inventario.tierra.valor--;
                    playeronMap().semilla++;

                    data = (selPlayer) => {
                        playeronMap(playerSel(selPlayer).posicion).arbol++
                        playeronMap(playerSel(selPlayer).posicion).semilla--;
                    }

                    task.push(addTarea(textos.exe.plantar, 5, time, data, playerSel(selPlayer), selPlayer, true))
                    texto = textos.isPlant
                } else {
                    texto = textos.error.noObjeto;
                }
            }
            break
        case textos.exe.talar:
            if (playeronMap().arbol > 0) {
                playeronMap().arbol--;

                data = (selPlayer) => {
                    playerSel(selPlayer).inventario.madera.valor++
                }

                task.push(addTarea(textos.exe.talar, 3, time, data, playerSel(selPlayer), selPlayer, false))

                texto = textos.isTalando;
            } else {
                texto = textos.error.noObjeto;
            }
            break
        case textos.exe.calentarH:
            if (objecto == textos.objetos.madera) {

                if (playerSel(selPlayer).inventario.madera.valor > 0) {

                    playeronMap().horno.hot = true;
                    playerSel(selPlayer).inventario.madera.valor--;

                    data = (selPlayer) => {
                        playeronMap(playerSel(selPlayer).posicion).horno.hot = true;
                    }

                    task.push(addTarea(textos.exe.calentarH, 10, time, data, playerSel(selPlayer), selPlayer, true))

                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else if (objecto == textos.objetos.mineral.tipos.carbon) {
                if (playerSel(selPlayer).inventario['mineral de carbon'].valor > 0) {

                    playeronMap().horno.hot = true;
                    playerSel(selPlayer).inventario['mineral de carbon'].valor--;

                    data = (selPlayer) => {
                        playeronMap(playerSel(selPlayer).posicion).horno.hot = true;
                        playerSel(selPlayer).inventario.ceniza.valor;
                    }

                    task.push(addTarea(textos.exe.calentarH, 20, time, data, playerSel(selPlayer), selPlayer, true))

                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else {
                texto = textos.error.noObjeto;
            }
            break
        case textos.exe.horno:
            if (objecto == textos.objetos.mineral.tipos.cobre) {
                if (selPlayer.inventario['mineral de cobre'].valor > 0
                    && playeronMap().horno.hot
                    && playeronMap().horno.fundido === textos.empty) {

                    selPlayer.inventario['mineral de cobre'].valor--;

                    data = (selPlayer) => {
                        playeronMap(playerSel(selPlayer).posicion).horno.fundido = objecto
                    }

                    task.push(addTarea(textos.exe.horno, 3, time, data, playerSel(selPlayer), selPlayer, true))

                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else if (objecto == textos.objetos.mineral.tipos.hierro) {
                if (playerSel(selPlayer).inventario['mineral de hierro'].valor > 0
                    && playeronMap().horno.hot
                    && playeronMap().horno.fundido === textos.empty) {

                    playerSel(selPlayer).inventario['mineral de hierro'].valor--;

                    data = (selPlayer) => {
                        playeronMap(playerSel(selPlayer).posicion).horno.fundido = objecto
                    }

                    task.push(addTarea(textos.exe.horno, 3, time, data, playerSel(selPlayer), selPlayer, true))

                    texto = textos.moveObjeto;
                } else {
                    texto = textos.error.noObjeto;
                }
            } else {
                texto = textos.error.noObjeto;
            }
            break
        case textos.exe.enfriar:
            if (playeronMap().horno.fundido !== textos.empty) {

                if (playeronMap().horno.fundido === textos.objetos.mineral.tipos.hierro) {
                    playerSel(selPlayer).inventario['lingote de hierro'].valor++;
                } else if (playeronMap().horno.fundido === textos.objetos.mineral.tipos.cobre) {
                    playerSel(selPlayer).inventario['lingote de cobre'].valor++;
                } else {
                    texto = textos.error.noObjeto;
                }


                data = (selPlayer) => {
                    playeronMap(playerSel(selPlayer).posicion).horno.fundido = objecto
                }

                task.push(addTarea(textos.exe.horno, 3, time, data, playerSel(selPlayer), selPlayer, true))

                texto = textos.moveObjeto;
            } else {
                texto = textos.error.noObjeto;
            }
            break
        default:
            texto = textos.error.noEjecutable;
            break;
    }
    return texto
}