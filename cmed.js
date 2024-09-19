// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  //{ text: "At the time", time: 15 },
  //{ text: "The whisper of birds", time: 18 },

  { text: "¿Qué onda, mami?", time: 3},
  { text: "¿Quieres un jalón o qué?", time: 4},
  { text: "A ver rólame tantito", time: 5},
  { text: "Eh, pero rólame otra guama, ¿no?", time: 7},
  { text: "Espera", time: 9},
  { text: "Cómo me encula esa dama", time: 10},
  { text: "A ella le da igual pistear en guama", time: 13},
  { text: "Fuma en pipa de manzana", time: 15},
  { text: "No le importa la canala", time: 19},
  { text: "Tampoco el sabor", time: 21},
  { text: "Ni que en veces tengamos que fumar en tortiblunt", time: 22},
  { text: "Cómo me encula esa dama", time: 25},
  { text: "A ella le da igual pistear en guama", time: 27},
  { text: "Fuma en pipa de manzana", time: 29},
  { text: "No le importa la canala", time: 33},
  { text: "Tampoco el sabor", time:  34},
  { text: "Ni que en veces tengamos que fumar En tortiblunt", time: 36},
  { text: "Me gusta verte de a cerquita", time:  39},
  { text: "Mientras de tu toque me invitas", time: 42},
  { text: "Me gusta que eres sencilla y de nada te limitas", time: 44},
  { text: "Fumar y fumar, palo y palo hasta mañana", time: 48 },
  { text: "Tu mejor maquillaje es tu olor a marihuana", time: 51 },
  { text: "Me cuajas un chingo no eres como las demás damas", time:  56},
  { text: "Hoy te encargó, sabe destapar las guamas", time: 57 },
  { text: "Me gusta que andes bien tatuada de todo tu cuerpo", time: 60 },
  { text: "Oye homie, te presumo a esta dama que tengo", time:65  },
  { text: "Se la rifa chido, no es fresa le gusta la fiesta", time: 70 },
  { text: "En vez de whisky toma cerveza", time:72  },
  { text: "Me deja su labial de fresa en mi churro", time: 73 },
  { text: "Por la forma que me besa la enculo", time: 74 },
  { text: "A toda mujer que me hable le dice zorra", time:  78},
  { text: "Está dispuesta a reventar a cualquier morra", time:  81},
  { text: "Ay mamita, todos los días me enamoras", time: 85 },
  { text: "Tú y yo, bien pachecos a todas horas", time:  87},
  { text: "Eres de las que no se duerme hasta mañana", time: 91 },
  { text: "Buenos días, guapita con carita de marihuana", time:94  },
  { text: "Como me encula esa dama", time:96  },
  { text: "A ella le da igual pistear en guama", time:  99},
  { text: "Fuma en pipa de manzana", time:  102},
  { text: "No le importa la canala", time: 106 },
  { text: "Tampoco el sabor", time:107  },
  { text: "Ni que en veces tengamos que fumar en tortiblunt", time: 109 },
  { text: "Como me encula esa dama", time: 112 },
  { text: "A ella le da igual pistear en guama", time:115  },
  { text: "Fuma en pipa de manzana", time: 117 },
  { text: "No le importa la canala", time: 120 },
  { text: "Tampoco el sabor", time: 121 },
  { text: "Ni que en veces tengamos que fumar En tortiblunt", time:123  },
  { text: "Mami ven, préndete fumate y vamos a volar", time: 126 },
  { text: "Yo sé que te gusta, no me lo vas a negar", time: 132 },
  { text: "Pa' bloquear te prestas, siempre tú tan buena", time: 134 },
  { text: "Chola jaina loca, no sé si seas ajena", time:138  },
  { text: "Pero te tengo aquí a mi lado", time: 142 },
  { text: "Últimamente nos miramos a diario", time: 145 },
  { text: "Con el cerebro en su punto chisqueando", time:147  },
  { text: "Manteniendo el hornazo en el barrio", time: 148 },
  { text: "Con unas guamas y unos gallos", time: 151 },
  { text: "Te ves bien chula quemando", time: 152 },
  { text: "Chula te vez caguamiando", time: 154 },
  { text: "No eres fresa tu locura, me interesa", time: 156 },
  { text: "Pa' que forme parte de la mía", time: 159 },
  { text: "Y no intente' arrancarla de mi cabeza", time:  161},
  { text: "Que estas ganas no cesan", time:164  },
  { text: "Si quieres quiero el que poncha prende pero", time:166  },
  { text: "Mami las damas primero", time:170  },
  { text: "Empínese la caguama, sígase embriagando", time: 172 },
  { text: "Mal no se ve al contrario", time:176  },
  { text: "Usted tiene lo que otras no tienen", time:  178},
  { text: "Conmigo se va en el viaje, conmigo se viene", time: 181 },
  { text: "Mira nomás como andas bien loca, mami", time: 184 },
  { text: "Claro papi, cómo me gusta, ¿y si te ponchas otro?", time: 191},
  { text: "Ay, ya es noche, ¿te quedarás?", time:  194},
  { text: "Pues hay que seguirla, ¿no?", time: 197 },
  { text: "Me parece perfecto", time: 198 },
  { text: "Esa chica me agrada, ojos rojos, linda mirada", time: 200 },
  { text: "Me gusta tu forma de ser", time: 206 },
  { text: "Cuando dices que no hay nada que temer", time: 208 },
  { text: "Que no hay problemas si no llegas al amanecer", time:212 },
  { text: "Esa chica me agrada, ojos rojos, linda mirada", time: 214 },
  { text: "Me gusta tu forma de ser", time: 221 },
  { text: "Cuando dices que no hay nada que temer", time: 223 },
  { text: "Que no hay problemas si no llegas al amanecer", time: 226 },
  { text: "Cómo me encula esa dama", time:  228},
  { text: "A ella le da igual pistear en guama", time: 230 },
  { text: "Fuma en pipa de manzana", time: 234 },
  { text: "No le importa la canala", time: 236 },
  { text: "Tampoco el sabor", time:  238},
  { text: "Ni que en veces tengamos que fumar En tortiblunt", time:  240},
  { text: "Cómo me encula esa dama", time: 244 },
  { text: "A ella le da igual pistear en guama", time:246  },
  { text: "Fuma en pipa de manzana", time: 248 },
  { text: "No le importa la canala", time:250  },
  { text: "Tampoco el sabor", time:  253},
  { text: "Ni que en veces tengamos que fumar En tortiblunt", time: 254 },
  { text: "Cómo me encula esa dama", time: 257 },
  { text: "A ella le da igual pistear en guama", time: 259 },
  { text: "Fuma en pipa de manzana", time:260  },
  { text: "No le importa la canala", time:  264},
  { text: "Tampoco el sabor", time: 267 },
  { text: "Ni que en veces tengamos que fumar En tortiblunt", time: 268 },
  

  { text: "By @robinsvb_", time:269  },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.05; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 100);

