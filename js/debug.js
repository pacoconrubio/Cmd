//Console log para debuguear el codigo
log = (texto = "Llega") => {
    console.log(texto);
};

//Enviar codigos para debuguear el codigo
$(document).ready(() => {
    revisarPiedra(true)
});

//Clear un loop de click 
loopclick = (loop, comando) => {
    for (i = 0; i < loop; i++) {
        click(comando)
    }
}

//Ejecutar un comando de manera interna para facilitar debuguear
click = (comando) => {
    inp.val(comando);
    debug.click()
}
//Debugear el numero de atributos
revisarAtributos = () => {
    click('')
    click('tree h')
    click('help h')
    click('systeminfo h')
    click('echo')
    click('prompt')
    click('clear h')
    click('break h')
    click('assoc h')
    click('time h')
    click('ver h')
    click('rename')
    click('rename hola')
    click('rename hola mina#1 h')
    click('dir h')
    click('cd')
    click('sudo su - admin h')
    click('su - admin h')
    click('start pico h')
    click('start')
    click('cd mina#1 h')
    click('tasklist h')
    click('taskkill 1 k')
}

//Debuguear que se borre correctamente los comandos
revisarClear = () => {
    click('clear')
}
//Debuguear que se envien los textos correctamente
revisarTextos = () => {
    click('tree')
    click('echo hola')
    click('echo hola que tal')
    click('dir')
    click('assoc')
    click('ver')
    click('time')
}

//Revisar que cambie el prompt
revisarprompt = () => {
    click('prompt . .')
    click('prompt .')
    click('echo prueba')
}
revisarselectPlayer = (player) =>{
    click('su - ' + player)
    click('systeminfo')
}

//Revisar que cambie el nombre de la region del mapa
revisarRename = () => {
    click('rename hola player#1')
    click('rename hola hola')
    click('rename mina#0 hola')
    click('rename hola minaprueba')
}

//Revisar el movimiento del personaje
revisaCd = () => {
    click('su - player#0')
    click('cd mina#1')
    click('dir')
}

//Revisar los permisos de los personajes
revisarPermisos = () => {
    click('sudo su - admin')
    click('cd mina#0')
    click('dir')
    click('start pico')
    click('su - player#0')
    click('tree')
    click('echo hola')
    click('prompt /')
    click('break')
    click('assoc')
    click('ver')
    click('time')
    click('rename minaprueba hola')

}

//Revisar que se puede recoger Piedra
revisarPicar = (show = false) => {
    click('su - player#0')
    click('start pico')
    click('break')
    if (show) {
        click('systeminfo')
    }
}

//Revisar que se puede conseguir Sedimentos 
revisarPiedra = (show = false) => {
    revisarPicar()
    click('start criba piedra')
    //click('break')
    if (show) {
        click('systeminfo')
    }
}

//Revisar que se puede conseguir Sedimentos 
revisarSedimentos = (show = false) => {
    revisarPiedra()
    click('start criba sedimentos')
    click('break')
    if (show) {
        click('systeminfo')
    }
}

//Revisar que se puede conseguir Tierra 
revisarTierra = (show = false) => {
    revisarSedimentos()
    click('start criba tierra')
    click('break')
    if (show) {
        click('systeminfo')
    }
}

//Revisar que se puede conseguir Plantar 
revisarPlantar = (show = false) => {
    revisarTierra()
    revisarSedimentos()
    click('start plantar')
    loopclick(1, 'break')
    if (show) {
        click('dir')
        click('systeminfo')
    }
}

//Revisar que se puede conseguir Plantar 
revisarTalar = (show = false) => {
    revisarPlantar()
    click('start talar')
    loopclick(3, 'break')
    if (show) {
        click('dir')
        click('systeminfo')
    }
}

//Revisar que se puede conseguir Plantar 
revisarCalentarH = (show = false) => {
    revisarTalar()
    click('start calentarhorno carbon')
    if (show) {
        click('systeminfo')
        click('dir')
    }
}
//Revisar que se puede conseguir Plantar 
calentarHornoHierro = (show = false) => {
    revisarCalentarH()
    click('start horno hierro')
    loopclick(3, 'break')
    if (show) {
        click('systeminfo')
        click('dir')
    }
}
//Revisar que se puede conseguir Plantar 
calentarHornoCobre = (show = false) => {
    revisarCalentarH()
    click('start horno cobre')
    loopclick(3, 'break')
    if (show) {
        click('systeminfo')
        click('dir')
    }
}
//Revisar que se puede conseguir Plantar 
calentarEnfriarHierro = (show = false) => {
    calentarHornoHierro()
    click('start enfriar')
    if (show) {
        click('systeminfo')
        click('dir')
    }
}
//Revisar que se puede conseguir Plantar 
calentarEnfriarCobre = (show = false) => {
    calentarHornoCobre()
    click('start enfriar')
    if (show) {
        click('systeminfo')
        click('dir')
    }
}