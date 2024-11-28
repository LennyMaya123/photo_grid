// Variables para colores
let color1; // Rojo
let color2; // Azul
let color3; // Blanco

// Variables para el control del patrón
let initialRectWidth;   // Ancho inicial de los rectángulos
let initialRectHeight;  // Alto inicial de los rectángulos
let yPosition = 0;      // Posición Y inicial
let row = 0;            // Fila actual
let drawSpeed = 10;     // Velocidad de dibujo en fotogramas por segundo
let resetDelay = 1000;  // Pausa de 1 segundo antes de reiniciar (en milisegundos)

function setup() {
  createCanvas(500, 800);        // Ventana vertical
  background(255);
  frameRate(drawSpeed);          // Ajustar la velocidad de dibujo

  // Definir los colores
  color1 = color(255, 0, 0);     // Rojo
  color2 = color(0, 0, 255);     // Azul
  color3 = color(255, 255, 255); // Blanco

  // Calcular dimensiones iniciales
  initialRectWidth = width / 2;      // Ancho inicial es la mitad de la pantalla
  initialRectHeight = height / 10;  // Alto inicial es 1/10 de la pantalla
}

function draw() {
  // Calcular el número de rectángulos en la fila actual
  let numRects = pow(2, row);

  // Aplicar restricciones para la elección del factor de escala
  let scaleFactor;
  if (numRects === 1) {
    scaleFactor = 0.5; // Solo dividir si hay un único rectángulo
  } else if (numRects >= 64) {
    scaleFactor = 2.0; // Solo multiplicar si llegamos a 64 rectángulos
  } else {
    // Seleccionar aleatoriamente entre dividir o multiplicar
    scaleFactor = random() < 0.5 ? 0.5 : 2.0;
  }

  // Calcular ancho y alto de los rectángulos para la fila actual
  let rectWidth = initialRectWidth * pow(scaleFactor, row);
  let rectHeight = initialRectHeight * pow(scaleFactor, row);

  // Dibujar la fila de rectángulos
  for (let j = 0; j < numRects; j++) {
    let xPosition = j * rectWidth;

    // Selección aleatoria de color entre los tres definidos
    let fillColor;
    let colorChoice = floor(random(3));
    if (colorChoice === 0) {
      fillColor = color1;
    } else if (colorChoice === 1) {
      fillColor = color2;
    } else {
      fillColor = color3;
    }

    fill(fillColor);
    noStroke();
    rect(xPosition, yPosition, rectWidth, rectHeight);
  }

  // Mover hacia abajo para la siguiente fila
  yPosition += rectHeight;
  row++;

  // Reiniciar el dibujo cuando la pantalla esté completamente llena
  if (yPosition >= height) {
    noLoop(); // Detener temporalmente el bucle
    setTimeout(() => {
      background(255); // Limpiar la pantalla
      yPosition = 0;   // Reiniciar la posición Y
      row = 0;         // Reiniciar la fila
      loop();          // Reanudar el bucle
    }, resetDelay); // Pausa antes de reiniciar
  }
}
