//Output y input del cmd
outp = $('#cmd_output');
inp = $('#cmd_input');
debug = $('#debug')

// Variable basicas de interfaz 
enterKeyCode = 13;
upKey = 38
downKey = 40;
animateSpeed = 0
KeyUp = 'keyup';
KeyDown = 'keydown';
allcode = 'html, body'
pCode = 'p'
click = 'click'

//Historial de comandos 
historialComandos = []
indexCom = -1

//Inicializar 
$(document).ready(() => {
    inicializar();
})

// Activar el codigo al pulsar la tecla
$(inp).on(KeyUp, (key) => {
    selectKey(key.keyCode, inp.val());
});

// Activar el codigo [debug] al pulsar la tecla
$(debug).on(click, (key) => {
    selectKey(enterKeyCode, inp.val());
});

// Centrar el foco en el input
$(document).on(KeyDown, function () {
    $(inp).focus();
});

/*  
    Filtra la tecla recibe 
    Intro --> Comenzar la accion del comando
    Up --> Volver al comando anterior
    Down --> Ir al comando posterior
*/
function selectKey(keyCode, comando) {
    if (keyCode === enterKeyCode) {
        commander(comando);
        storeCommand(comando)
    } else if (keyCode === upKey) {
        $(inp).val(getCommandBack())
    } else if (keyCode === downKey) {
        $(inp).val(getCommandPost());
    }
}

//Guardar el comando creado
function storeCommand(comando) {

    if (comando.trim() !== '') {
        historialComandos.unshift(comando);
        indexCom = -1;
    }
    eraseText();
}

//Crea el scroll del texto
function keepScroll() {
    $(allcode).animate({ scrollTop: $(document).height() }, animateSpeed);
}

//Borrar el texto de todos los comandos
clear = () => {
    $(outp).find(pCode).remove();
}

//Borra el texto del comando no enviado
function eraseText() {
    inp.val('')
}

//Crea un nuevo texto para las respuesta
newTexter = (text) => {
    if (text !== "") {
        newContent = '<p>' + text + '</p>';
        outp.append(newContent);
        keepScroll()
    }
}