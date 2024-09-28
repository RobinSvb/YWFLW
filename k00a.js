// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  //{ text: "At the time", time: 15 },
  //{ text: "The whisper of birds", time: 18 },

  { text: "Dame tu sonrisa para iluminar esta oscuridad", time: 2 },
  { text: "Camina conmigo yo te doy, tú me das", time:7  },
  { text: "Miro al cielo cuando pasa una estrella fugaz", time: 11 },
  { text: "Pido tres deseos:", time: 14 },
  { text: "Que se quede, que se quede", time: 16 },
  { text: "Que se quede y no se vaya más", time: 17 },
  { text: "No me interesa otra mujer y", time:19  },
  { text: "Nunca me va a interesar", time: 22 },
  { text: "Y no es porque no lleguen al nivel", time:24  },
  { text: "Es porque el tuyo nunca lo van a alcanzar", time: 27 },
  { text: "No me interesa otra mujer y", time:29 },
  { text: "Nunca me va a interesar", time: 31 },
  { text: "Y no es porque no lleguen al nivel", time:33  },
  { text: "Es porque el tuyo nunca lo van a alcanzar", time: 36 },
  { text: "Demasiao calor, demasiao amor", time: 38 },
  { text: "Demasiao cabrón", time: 41 },
  { text: "Dice: 'quiero alcohol, noches de pasión", time:42  },
  { text: "Hasta ver el sol'", time: 46 },
  { text: "Demasiao calor, demasiao amor", time:49  },
  { text: "Demasiao cabrón", time: 52 },
  { text: "Chocolate y love, mami muévelo, encima de mí", time:  53},
  { text: "Con su canto de sirena me", time: 58 },
  { text: "Hipnotiza y me lleva", time:61  },
  { text: "A pasar mil horas buenas", time: 63 },
  { text: "De lo que fue no diré na'", time:  64},
  { text: "Y si te digo que contigo", time:  68},
  { text: "Lo aburrido ahora hasta tomo sentido", time: 69 },
  { text: "Y lo que era entretenido hasta lo olvido", time: 73 },
  { text: "Cada vez que estoy contigo ma'", time:  75},
  { text: "No me interesa otra mujer", time: 77 },
  { text: "Y nunca me va a interesar", time: 79 },
  { text: "Y no es porque no lleguen al nivel", time: 82 },
  { text: "Es porque el tuyo nunca lo van a alcanzar", time: 84 },
  { text: "No me interesa otra mujer", time: 87 },
  { text: "Y nunca me va a interesar", time: 89 },
  { text: "Y no es porque no lleguen al nivel", time: 92 },
  { text: "Es porque el tuyo nunca lo van a alcanzar", time: 94 },
  { text: "Demasiao calor, demasiao amor", time:96  },
  { text: "Demasiao cabrón", time: 98 },
  { text: "Dice: 'quiero alcohol, noches de pasión", time:  101},
  { text: "Hasta ver el sol'", time: 103 },
  { text: "Demasiao calor, demasiao amor", time:107  },
  { text: "Demasiao cabrón", time: 109 },
  { text: "Chocolate y love, mami muévelo, encima de mí", time:111  },
  { text: "Dame tu sonrisa para iluminar esta oscuridad", time: 117 },
  { text: "Camina conmigo yo te doy, tú me das", time: 123 },
  { text: "Miro al cielo cuando pasa una estrella fugaz", time:  126},
  { text: "Y pido tres deseos:", time: 132 },
  { text: "Que se quede, que se quede", time: 134 },
  { text: "Que se quede y no se vaya más", time:  139},
  { text: "(Y no se vaya más)", time: 142 },
  { text: "Que se quede, que se quede", time:  143},
  { text: "Que se quede y no se vaya más", time: 149 },
  { text: "(Y no se vaya más)", time:  152},
  { text: "Demasiao calor, demasiao amor", time: 154 },
  { text: "Demasiao cabrón", time:156  },
  { text: "Dice: 'quiero alcohol noches de pasión", time:  158},
  { text: "Hasta ver el sol'", time: 160 },
  { text: "Demasiao calor, demasiao amor", time: 164 },
  { text: "Demasiao cabrón", time: 168 },
  { text: "Chocolate y love, mami muévelo, encima de mí", time:170  },
  

  { text: "By @robinsvb_", time:175  },
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