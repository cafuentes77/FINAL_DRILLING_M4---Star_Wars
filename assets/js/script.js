const URL_BASE = "https://swapi.dev/api/"


function * generatorCharacter(id, fila, color) {
    yield bringCharacter(id, fila, color);
    id++
    yield bringCharacter(id, fila, color);
    id++
    yield bringCharacter(id, fila, color);
    id++
    yield bringCharacter(id, fila, color);
    id++
    yield bringCharacter(id, fila, color);
    id++
}


class Personaje {
  constructor(nombre, estatura, peso, fila) {
    this.nombre = nombre
    this.estatura = estatura
    this.peso = peso
    this.fila = fila
  }

  loadCard = (color) => {
    document.getElementById(`${this.fila}`).innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                <div class="timeline-icon ${color}"></div>
                <div class="timeline-text">
                    <h6>${this.nombre}</h6>
                    <p>Estatura: ${this.estatura} cms</p>
                    <p>Peso: ${this.peso} kg </p>
                </div>
            </div>
        </div>
    `
}
}

const createCharacter = (data, fila,) => {
  let personaje = new Personaje(data.name, data.height, data.mass, fila)
  return personaje
}

const bringCharacter = async (id, fila, color) => {
  try {
      let resultado = await fetch(`${URL_BASE}people/${id}`)
      let respuesta = await resultado.json();
      let personaje = createCharacter(respuesta, fila)
      personaje.loadCard(color)
  } catch (err) {
      throw new Error(err)
  }
}

let Naranja = document.getElementById("orangeNumber")
let Verde = document.getElementById("greenNumber")
let Calipso = document.getElementById("cyanNumber")

let generadorNaranja = generatorCharacter(1, "orangeRow", "Naranja")
let generadorVerde = generatorCharacter(6, "greenRow", "Verde")
let generadorCalipso = generatorCharacter(11, "cyanRow", "Calipso")

Naranja.addEventListener("click", async () => {
  let data = generadorNaranja.next()
  !data.done ? data.value : alert("No Existen Mas Personajes en la sección Naranja")
})

Verde.addEventListener("click", async () => {
  let data = generadorVerde.next()
  !data.done ? data.value : alert("No Existen Mas Personajes en la sección Verde")
})

Calipso.addEventListener("click", async () => {
  let data = generadorCalipso.next()
  !data.done ? data.value : alert("No Existen Mas Personajes en la sección Calipso")
})