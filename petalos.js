// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  //{ text: "At the time", time: 15 },
  //{ text: "The whisper of birds", time: 18 },

  { text: "Tú hueles a vainilla, te quiero", time:3  },
{ text: "Dale, abrázame otro rato", time: 8 },
{ text: "Déjame te soy sincero", time:13  },
{ text: "Tiene tiempo que yo trato", time: 18 },
{ text: "Llevaba tiempo buscando a quién cantarle", time:  23},
{ text: "Sobre cuando me siento vulnerable", time: 28 },
{ text: "Dale, abrázame otro rato", time: 33 },
{ text: "Apapáchame la vida entera", time: 39 },
{ text: "Quiero saberte a lo que quieres", time:40  },
{ text: "Llorar por lo que te hace llorar", time: 42 },
{ text: "Ser música de la que prefieres", time: 45 },
{ text: "Y que nunca me quieras pausar", time: 48 },
{ text: "Quiero saberte a lo que quieres", time:  50},
{ text: "Llorar por lo que te hace llorar", time: 53 },
{ text: "Ser música de la que prefieres", time: 56 },
{ text: "Y que nunca me quieras pausar", time: 59 },
{ text: "Aventando patadas de ahogado", time:63  },
{ text: "Sin saber si la armamos, seguimos nadando", time: 68 },
{ text: "Por ti sigo tratando, cavando", time: 72 },
{ text: "Regando las flores que de viejos nos veo fumando", time:  77},
{ text: "No me da miedo admitir que", time: 92 },
{ text: "Desde la primera vez que te vi", time: 96 },
{ text: "Yo ya me lo veía venir", time:99  },
{ text: "Estar all in por ti", time:103  },
{ text: "Porque yo ya sabía a lo que iba", time:103  },
{ text: "Querer comprarnos un terreno y construirnos la vida", time: 107 },
{ text: "Porque contigo lo sabía", time: 113 },
{ text: "Que tú y yo vamos por la milla", time: 115 },
{ text: "Y que siempre voy a querer saber si va bien todo en tu día", time: 117 },
{ text: "¿Qué tal va tu día?", time: 122 },
{ text: "Es lo que me importa, mi vida", time:124  },
{ text: "Si vamos tarde por tu culpa, decir que es la mía", time: 128 },
{ text: "(Que fue culpa mía)", time: 132 },
{ text: "Aventando patadas de ahogado", time:136  },
{ text: "Sin saber si la armamos, seguimos nadando", time:140  },
{ text: "Por ti sigo tratando, cavando", time:146  },
{ text: "Regando las flores que de viejos nos veo fumando", time: 150 },
{ text: "Aventando patadas de ahogado", time:  157},
{ text: "Sin saber si la armamos, seguimos nadando", time: 162 },
{ text: "Por ti sigo tratando, cavando", time: 166 },
{ text: "Regando las flores que de viejos nos veo fumando", time:171  },
{ text: "Llevaba tiempo buscando a quién cantarle", time:179 },
{ text: "Sobre cuando me siento vulnerable", time: 183 },
{ text: "(Por ti sigo tratando, cavando)", time: 188 },
{ text: "Apapáchame la vida entera", time: 192 },
{ text: "Quiero saberte a lo que quieres", time: 202 },
{ text: "Llorar por lo que te hace llorar", time: 205 },
{ text: "Ser música de la que prefieres", time: 209 },
{ text: "Y que nunca me quieras pausar", time: 214 },

  { text: "By @robinsvb_", time:216  },
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