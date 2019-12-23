class Casilla {
    /*
    La clase Casilla tendrá solo el constructor en el cual se pasará por parámetro la URL de la casilla 
    y su id (Que coincidirá mas tarde con su correspondiente dataset que se le añadirá al html).

    Volteada= Servirá para saber si una casilla está volteada. Si está volteada será true, de lo contrario False
    Acertada= Servirá para saber si ya se ha encontrado su respectiva pareja. Si es así será true, de lo contrario False
    */
    constructor(imagen, id) {
        this.imagen = imagen;
        this.volteada = false;
        this.id = id;
        this.acertada = false;
    }

}

class Tablero {
    /*
    La clase Tablero tendrá un constructor en el cual se pasarán DIVS del html.

    */
    constructor(div, contadorAciertos, contadorIntentos) {
        //Aquí ira el array de objetos Casilla
        this.casillas = new Array(16);
        //Contador de intentos
        this.intentos = contadorIntentos;
        //Contador de aciertos
        this.aciertos = contadorAciertos;
        //Intentos máximos permitidos
        this.intentosMAX = 0;
        //Array de imagenes para llenar los objetos Casillas
        this.imagenes = ["img/manzana.png", "img/kiwi.png", "img/pera.png", "img/cereza.png", "img/naranja.png", "img/limon.png", "img/platano.png", "img/piña.png", "img/manzana.png", "img/kiwi.png", "img/pera.png", "img/cereza.png", "img/naranja.png", "img/limon.png", "img/platano.png", "img/piña.png"];
        //El div donde irá el tablero, que es pasado por constructor
        this.cajatablero = div;
        //Array para comparar las 2 casillas levantadas por el usuario.
        this.compararCasillas = new Array();
    }
    //Iniciar simplemente te creará las casillas, te las guarda en su array de objetos y genera el tablero con las imagenes volteadas
    iniciar() {
        for (let i = 0; i < this.imagenes.length; i++) {
            //Generamos numero
            let ngenerado = Math.floor(Math.random() * 16);
            //Si el numero generado es undefined generaremos más hasta que no sea undefined
            while (this.imagenes[ngenerado] == undefined) {
                ngenerado = Math.floor(Math.random() * 16);
            }
            //Llenamos el array
            this.casillas[i] = new Casilla(this.imagenes[ngenerado], i);
            //Creamos la imagen
            let imagen = document.createElement("img");
            imagen.classList = "sinvoltear";
            imagen.dataset.id = [i];
            //La añadimos al tablero
            this.cajatablero.appendChild(imagen);
            //Borramos el elemento del array generado.
            delete this.imagenes[ngenerado];
        }
    }
    voltearCasilla(img) {
        //Si el array de comparar casillas no es 2
        if (this.compararCasillas.length < 2) {
            //Recorremos array de casillas
            for (let i = 0; i < this.casillas.length; i++) {
                //Si la id de la casilla coincide con el id del dataset y no está volteado
                if (this.casillas[i].id == img.dataset.id && this.casillas[i].volteada == false) {
                    this.casillas[i].volteada = true;
                    //Le añadimos la clase con la animación
                    img.classList = "voltear";
                    setTimeout(() => {
                        //Añadimos que tarde 0.2 segundos en mostrarse la imagen
                        img.src = this.casillas[i].imagen;
                    }, 200);
                    //Añadimos en el array de compararCasillas SU HTML (<img>).
                    this.compararCasillas.push(img);
                }
            }

        }
        //Cuando ya hay 4 elementos en el array de comparación
        if (this.compararCasillas.length == 2) {
            setTimeout(() => {
                //Si su src es igual
                if (this.compararCasillas[0].src == this.compararCasillas[1].src) {
                    //Recorremos el array de casillas hasta encontrar con el que hemos levantado
                    for (let i = 0; i < this.casillas.length; i++) {
                        if (this.casillas[i].id == this.compararCasillas[0].dataset.id || this.casillas[i].id == this.compararCasillas[1].dataset.id) {
                            //Volteamos el objeto casilla
                            this.casillas[i].volteada = true;
                        }
                    }
                    this.contarAcierto(this.aciertos) //Contamos acierto
                    //Vaciamos array
                    this.compararCasillas = [];
                } else {
                    //Recorremos el array de casillas hasta encontrar con el que hemos levantado
                    for (let i = 0; i < this.casillas.length; i++) {
                        if (this.casillas[i].id == this.compararCasillas[0].dataset.id || this.casillas[i].id == this.compararCasillas[1].dataset.id) {
                            //Volteamos el objeto casilla
                            this.casillas[i].volteada = false;
                        }
                    }
                    this.compararCasillas[0].classList = "sinvoltear";
                    this.compararCasillas[1].classList = "sinvoltear";
                    //Vaciamos el array de comparación para que después lo llenemos de nuevo
                    this.compararCasillas = [];
                    this.contarIntento(this.intentos) //Contamos intento
                }
            }, 1000)
        }

    }
    contarIntento(intentos) {
        intentos.innerHTML = parseInt(intentos.innerHTML) + 1;
    }
    contarAcierto(aciertos) {
        aciertos.innerHTML = parseInt(aciertos.innerHTML) + 1;
        if (parseInt(aciertos.innerHTML) == 8) {
            document.querySelector("#tablero > div").id = "gif";
        }
    }

}