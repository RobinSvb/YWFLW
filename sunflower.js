// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  //{ text: "At the time", time: 15 },
  //{ text: "The whisper of birds", time: 18 },

    { text: "Hace mucho tiempo le hago caso al corazón", time: 10 },
    { text: "Y pasan los día', los mese' pensando en tu olor", time: 16 },
    { text: "Ha llegado el tiempo para usar la razón", time:  22},
    { text: "Ante' que sea tarde y sin querer me parta en do'", time: 28 },
    { text: "Antes de que salga el sol y hunda el acelerador", time: 34 },
    { text: "Que vaya sin frenos y pierda el control", time: 37 },
    { text: "Nada más seremos do', tú y yo acariciándono'", time: 40 },
    { text: "En medio del tiempo, sin decir adiós", time: 43 },
    { text: "Y solo mírame con esos ojito' lindo'", time:46  },
    { text: "Que con eso yo estoy bien", time: 50 },
    { text: "Hoy he vuelto a nacer", time: 54 },
    { text: "Hacе tiempo que no agarro a nadie de la mano", time:58  },
    { text: "Hace tiempo que no envío: 'buenos días, te amo'", time:63  },
    { text: "Pero tú me tiene' enredao, me envolví", time: 69 },
    { text: "Iba por mi camino y me perdí", time:  72},
    { text: "Mi mirada cambió cuando tus ojos vi", time: 75 },
    { text: "Bye-bye a los culo', ni me despedí", time: 79 },
    { text: "Yo no te busqué, no", time:82  },
    { text: "Chocamo' en el trayecto", time: 85 },
    { text: "Con tu alma es la que yo conecto", time:  87},
    { text: "Tranquila, no tiene que ser perfecto, no", time: 90 },
    { text: "Aquí no existe el pecado", time: 94 },
    { text: "Y equivocarse es bonito", time:96  },
    { text: "Los errore' son placere'", time: 100 },
    { text: "Igual que to' tus besito'", time: 103 },
    { text: "Y solo mírame con esos ojito' lindo'", time:  106},
    { text: "Que con eso yo estoy bien", time: 110 },
    { text: "Hoy he vuelto a nacer", time: 114 },
    { text: "Y solo mírame con esos ojito' lindo'", time: 118 },
    { text: "Que con eso yo estoy bien", time: 122 },
    { text: "Hoy he vuelto a nacer", time:  126},
    { text: "Tú y yo, tú y yo, tú y yo (tú y yo, tú y yo)", time:129  },
    { text: "Tú y yo, tú y yo (tú y yo, tú y yo), tú y yo", time: 136 },
    { text: "Tú y yo, tú y yo", time: 145 },
    { text: "Tú y yo, tú y yo", time:150  },
    { text: "Yo no me dejo llevar de nadie", time:  153},
    { text: "Yo solo me dejo llevar de tu sonrisa", time: 155 },
    { text: "Y del lunar cerquita de tu boca", time: 159 },
    { text: "Si yo estoy loco, tú estás loquita", time: 162 },
    { text: "Pero, baby, como tú no hay otra, no", time:165  },
    { text: "Quiero regalarte girasole'", time: 169 },
    { text: "Ir pa la playa y buscarte caracole'", time: 171 },
    { text: "Cuando estoy contigo, yo no miro el Rolex", time:175  },
    { text: "Vamo' a bailar 200 cancione'", time:178  },
    { text: "Nadie me pone como tú me pone'", time:181  },
    { text: "Mmm, mm-mm, mmm", time:184  },
    { text: "Mmm, mm-mm, mmm", time: 186 },
    { text: "Yo le hablo a Dio' y tú ere' su respuesta", time: 190 },
    { text: "Aprendí que los momento' lindo' nunca cuestan", time: 193 },
    { text: "Como cuando me regalas tu mirada", time: 196 },
    { text: "Y el sol, su puesta (ey, ey), y el sol, su puesta", time: 198 },
    { text: "Cuando estoy encima de ti, de ti", time: 201 },
    { text: "Mami, yo me olvido de todo, de todo", time:205  },
    { text: "No hace falta nadie aquí", time: 208 },
    { text: "Solamente tú y yo", time:  210},
    { text: "Antes de que salga el sol y hunda el acelerador", time: 213 },
    { text: "Que vaya sin frenos y pierda el control", time:215  },
    { text: "Nada más seremos do', tú y yo acariciándono'", time: 220 },
    { text: "En medio del tiempo, sin decir adiós", time:223  },
    { text: "Y solo mírame con esos ojito' lindo'", time: 225 },
    { text: "Que con eso yo estoy bien", time:230  },
    { text: "Hoy he vuelto a nacer", time:234  },
    { text: "Y solo mírame con esos ojito' lindo'", time: 238 },
    { text: "Que con eso yo estoy bien", time: 243 },
    { text: "Hoy he vuelto a nacer", time:245  },

  { text: "By @robinsvb_", time:250  },
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

setInterval(updateLyrics, 500);
