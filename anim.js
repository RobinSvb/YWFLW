// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  //{ text: "At the time", time: 15 },
  //{ text: "The whisper of birds", time: 18 },

  { text: "Eres algo inalcanzable", time: 15 },
  { text: "Ya lo sé, pero no entiendo", time: 16 },
  { text: "Sigo necio por tenerte", time: 23 },
  { text: "La esperanza no la pierdo", time: 26 },
  { text: "Siempre paso delirando", time: 30 },
  { text: "Que en mis brazos yo te tengo", time: 33 },
  { text: "Cuando me toca mirarte", time:39  },
  { text: "Me imagino tantas cosas", time: 43 },
  { text: "Hago fantasías contigo 🫣", time: 46 },
  { text: "En mi mente cochambrosa 😏", time: 49 },
  { text: "Y así me la paso siempre", time: 53 },
  { text: "Eres mi pasión hermosa", time: 56  },
  { text: "Eres mi amor platónico", time: 63 },
  { text: "Eres la fruta prohibida", time: 66 },
  { text: "Yo sé bien que es imposible", time:70  },
  { text: "Tu relación y la mía", time:  73},
  { text: "Pero te adoro en silencio", time: 77 },
  { text: "Desde lejos, vida mía", time: 79 },
  { text: "Chiquita", time:86  },
  { text: "¿Así estás de trompuda", time:89  },
  { text: "O quieres beso?", time:  91},
  { text: "La verdad, cómo deseo", time:  100},
  { text: "Estar contigo un momento", time: 103 },
  { text: "Aunque sea cinco minutos", time:107  },
  { text: "Si no es más, con esos tengo", time: 110 },
  { text: "Pero que estemos solitos", time:113  },
  { text: "Que nadie nos esté viendo", time: 117 },
  { text: "Cuando me toca mirarte", time:  123},
  { text: "Me imagino tantas cosas 🫣", time:126  },
  { text: "Hago fantasías contigo", time:130  },
  { text: "En mi mente cochambrosa 😏", time: 133 },
  { text: "Y así me la paso siempre", time: 136},
  { text: "Eres mi pasión hermosa", time:140  },
  { text: "Eres mi amor platónico", time:146  },
  { text: "Eres la fruta prohibida", time: 150 },
  { text: "Yo sé bien que es imposible", time: 153 },
  { text: "Tu relación y la mía", time: 156 },
  { text: "Pero te adoro en silencio", time:160  },
  { text: "Desde lejos, vida mía", time:163  },
  { text: "By @robinsvb_", time:166  },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
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

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);