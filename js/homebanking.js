//Declaración de variables

var nombreUsuario = "Franco";
var saldoCuenta = 20000;
var saldoCuentaUsd = 0;
var limiteExtraccion = 5000;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var servicio1 = " pago servicio de Agua";
var servicio2 = " pago servicio de Luz";
var servicio3 = " pago servicio de Internet";
var servicio4 = " pago servicio de Telefono";
var password = 1234;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.


function retirarDinero(monto) {
    var importe = parseInt(monto);
    saldoCuenta = saldoCuenta - importe;
    actualizarSaldoEnPantalla();
}

window.onload = function () {
    if (iniciarSesion() == true) {
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }
}

//Funciones que tenes que completar + Funciones que agregue.

//comprar dolares
function comprarDolares() {
    var saldoInicial = saldoCuentaUsd;
    var comprarString = prompt("Cuantos dolares desea comprar?");
    var comprar = validarNumero(comprarString);
    var debitar$ = comprar * 37;
    if (comprar != false) {
        if (verificarSaldo(debitar$) == true) {
            retirarDinero(debitar$);
            saldoCuentaUsd = saldoInicial + comprar;
            alert("Usted a comprado USD" + comprar + ".\nPor un total de $" + debitar$ + "-." + "\n Saldo anterior en USD " + saldoInicial + "\nSaldo actual USD" + saldoCuentaUsd);
            actualizarSaldoEnPantalla()
        }
    }
}


//vender dolares

function venderDolares() {
    var saldoInicial = saldoCuentaUsd;
    var venderString = prompt("Cuantos dolares desea vender?");
    var vender = validarNumero(venderString);
    var acreditar$ = vender * 35;
    if (vender != false) {
        if (verificarSaldoUSD(acreditar$) == true) {
            incrementarDinero(acreditar$);
            saldoCuentaUsd = saldoInicial - vender;
            actualizarSaldoEnPantalla();
            alert("Usted a vendido USD" + vender + ".\nPor un total de $" + debitar$ + "-." + "\n Saldo anterior en USD " + saldoInicial + "\nSaldo actual USD" + saldoCuentaUsd);
        }
    }
}

function iniciarSesion() {
    var codigo = prompt("Iniciar sesion con su codigo de 4 digitos");
    if (codigo == password) {
        alert("Bienvenido estimado " + nombreUsuario);
        return (true)
    }
    else {
        saldoCuenta = 0;
        fondosBloqueados()
    }
}

function fondosBloqueados() {
    alert("Por la seguridad del usuario, los fondos han sido bloqueados.");
    fondosBloqueados();
}


function consultarSaldo(stringMonto) {
    var monto = parseInt(stringMonto);
    if (saldoCuenta >= monto) {
        return (true)
    } else { return (false) }
}

function extraerDinero() {
    var saldoInicial = saldoCuenta;
    var retiroString = prompt("Cuanto desea retirar?");
    var retiro = validarNumero(retiroString);
    if (retiro != false) {
        var cobro = "Usted a retirado: $";
        if (verificarSaldo(retiro) == true) {
            if (verificarLimite(retiro) == true) {
                if (verificarBilletes100(retiro) == true) {
                    retirarDinero(retiro);
                    ultimosSaldos(retiro, saldoInicial, cobro)
                }
            }
        }
    }
}

function ultimosSaldos(retiro, saldoInicial, cobro) {
    alert(cobro + retiro + "\nSaldo anterior :$" + saldoInicial + "\nSaldo actual: $" + saldoCuenta);
}
function verificarLimite(monto) {
    if (monto <= limiteExtraccion) {
        return (true)
    } else {
        alert("El importe a retirar supera su limite de extraccion que es de $" + limiteExtraccion);
        return (false)
    }
}
function verificarSaldo(monto) {
    if (monto <= saldoCuenta) {
        return (true)
    } else {
        alert("Usted no puede operar con montos superiores a su saldo en cuenta que es de $" + saldoCuenta)
        return (false)
    }
}

function verificarSaldoUSD(monto) {
    if (monto <= saldoCuentaUsd) {
        return (true)
    } else {
        alert("Usted no puede operar con montos superiores a su saldo en cuenta que es de USD" + saldoCuentaUsd)
        return (false)
    }
}


    function verificarBilletes100(monto) {
        if (monto % 100 === 0) {
            return (true)
        } else {
            alert("Solo puede retirar billetes de $100");
            return (false)
        }
    }

    function depositarDinero() {
        var saldoInicial = saldoCuenta;
        var depositoString = prompt("Cuanto desea depositar?");
        var deposito = validarNumero(depositoString);
        if (deposito != false) {
            incrementarDinero(deposito);
            actualizarSaldoEnPantalla();
            alert("Has depositado: $" + deposito + "\nSaldo anterior :$" + saldoInicial + "\nSaldo actual: $" + saldoCuenta)
        }
    }

    function incrementarDinero(deposito) {
        saldoCuenta = saldoCuenta + deposito;
    }

    function pagarServicio() {
        var servicioAPagar = prompt("Ingrese el numero que corresponda con el servicio que desea abonar: \n 1-Agua \n 2-Luz \n 3-Internet \n 4-Telefono");
        switch (servicioAPagar) {
            case "1":
                cobrarServicio(agua, servicio1);
                break;
            case "2":
                cobrarServicio(luz, servicio2);
                break;
            case "3":
                cobrarServicio(internet, servicio3);
                break;
            case "4":
                cobrarServicio(telefono, servicio4);
                break;
            default:
                if (typeof servicioAPagar == 'string') {
                    alert("Intente nuevamente e indique un numero correcto. Gracias");
                }
        }
    }

    function cobrarServicio(ssaPagar, serviciox) {
        var stringImporte = ssaPagar;
        var importe = parseInt(stringImporte);
        var saldoInicial = saldoCuenta;
        var cobro = "En concepto de " + serviciox + " \n Se han cobrado $"
        if (consultarSaldo(importe) == true) {
            retirarDinero(importe);
            ultimosSaldos(importe, saldoInicial, cobro)
        }
        else alert("Su saldo no es suficiente para realizar este pago.")

    }
    function transferirDinero() {
        var cbuDestinoString = prompt("Seleccione a que cuenta desea enviar fondos: \n 1-Cuenta amiga 1. \n 2-Cuenta amiga 2. ");
        var cbuDestino = parseInt(cbuDestinoString);
        if (cbuDestino == 1 || cbuDestino == 2) {
            var retiroString = prompt("Cuanto desea transferir?");
            var retiro = validarNumero(retiroString);
            if (retiro != false) {
                if (verificarSaldo(retiro) == true) {
                    var saldoInicial = saldoCuenta;
                    var cobro = "Se ha transferido a: Cuenta amiga N-" + cbuDestino + "\n El monto de $";
                    retirarDinero(retiro);
                    ultimosSaldos(retiro, saldoInicial, cobro);
                }
            }
        } else { (alert("Por favor intente nuevamente e indique una cuenta amiga para transferir.")) }
    }

    function cambiarLimiteDeExtraccion() {
        var nuevoLimiteString = prompt("Indicar nuevo limite de retiro por ATM.");
        var nuevoLimite = validarNumero(nuevoLimiteString);
        if (nuevoLimite != false) {
            alert("Su nuevo limite es: $" + nuevoLimite);
            limiteExtraccion = nuevoLimite;
            actualizarLimiteEnPantalla()
        }
    }


    function validarNumero(String) {
        var importe = parseInt(String);
        if (importe == String) {
            return importe;
        } else {
            if (typeof String == 'string') {
                alert("Intente nuevamente e ingrese valor numerico");
                return false;
            } else {
                return false;
            }
        }
    }


    //Funciones que actualizan el valor de las variables en el HTML
    function cargarNombreEnPantalla() {
        document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
    }

    function actualizarSaldoEnPantalla() {
        document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
        document.getElementById("saldo-cuentausd").innerHTML = "Tu saldo en dolares es USD " + saldoCuentaUsd;12
    }

    function actualizarLimiteEnPantalla() {
        document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
    }


