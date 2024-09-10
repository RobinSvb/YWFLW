// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  //{ text: "At the time", time: 15 },
  //{ text: "The whisper of birds", time: 18 },

    { text: "Hace mucho tiempo le hago caso al corazón ❤️", time: 10 },
    { text: "Y pasan los días, los meses pensando en tu olor 😏", time: 16 },
    { text: "Ha llegado el tiempo para usar la razón 😵‍💫", time:  22},
    { text: "Antes que sea tarde y sin querer me parta en dos", time: 28 },
    { text: "Antes de que salga el sol 🌞 y hunda el acelerador 🚙", time: 33 },
    { text: "Que vaya sin frenos y pierda el control 💥", time: 36 },
    { text: "Nada más seremos dos 👩‍❤️‍💋‍👨, tú y yo acariciándonos 😏", time: 39 },
    { text: "En medio del tiempo ⌛, sin decir adiós", time: 43 },
    { text: "Y solo mírame con esos ojitos 👀 lindos", time:45  },
    { text: "Que con eso yo estoy bien 🤭", time: 49 },
    { text: "Hoy he vuelto a nacer 🌝", time: 53 },
    { text: "Hacе tiempo que no agarro a nadie de la mano 👫", time:58  },
    { text: "Hace tiempo que no envío: 'buenos días, te amo ❤️' 😮‍💨", time:63  },
    { text: "Pero tú me tienes enredado🫣, me envolví", time: 69 },
    { text: "Iba por mi camino y me perdí 😶‍🌫️", time:  72},
    { text: "Mi mirada cambió cuando tus ojos vi😳🙈", time: 74 },
    { text: "Bye-bye a los culos, ni me despedí 😎", time: 78 },
    { text: "Yo no te busqué 🕵🏽‍♂️, no", time:81  },
    { text: "Chocamos en el trayecto 🛣️", time: 83 },
    { text: "Con tu alma es la que yo conecto 🌚🌝", time:  86},
    { text: "Tranquila, no tiene que ser perfecto, no", time: 89 },
    { text: "Aquí no existe el pecado 🤫", time: 93 },
    { text: "Y equivocarse es bonito 🩷", time:95  },
    { text: "Los errores son placeres 🙊", time: 100 },
    { text: "Igual que to' tus besitos🙀😻", time: 103 },
    { text: "Y solo mírame con esos ojitos lindos 🙈", time:  106},
    { text: "Que con eso yo estoy bien 🤭", time: 110 },
    { text: "Hoy he vuelto a nacer", time: 114 },
    { text: "Y solo mírame con esos ojitos lindos🙊", time: 118 },
    { text: "Que con eso yo estoy bien", time: 122 },
    { text: "Hoy he vuelto a nacer", time:  126},
    { text: "Tú y yo, tú y yo, tú y yo (tú y yo, tú y yo)", time:129  },
    { text: "Tú y yo, tú y yo (tú y yo, tú y yo), tú y yo", time: 136 },
    { text: "Tú y yo, tú y yo", time: 145 },
    { text: "Tú y yo, tú y yo", time:150  },
    { text: "Yo no me dejo llevar de nadie 😎", time:  152},
    { text: "Yo solo me dejo llevar de tu sonrisa 🌝", time: 154 },
    { text: "Y del lunar cerquita de tu boca 🌚", time: 158 },
    { text: "Si yo estoy loco, tú estás loquita 😛", time: 161 },
    { text: "Pero, baby, como tú no hay otra, no", time:164  },
    { text: "Quiero regalarte girasoles 🌻", time: 168 },
    { text: "Ir pa la playa 🏖️ y buscarte caracoles 🐚", time: 169 },
    { text: "Cuando estoy contigo, yo no miro el Rolex ⌚", time:174  },
    { text: "Vamos a bailar 200 canciones 🎶", time:177  },
    { text: "Nadie me pone como tú me pones 🥵", time:180  },
    { text: "Mmm, mm-mm, mmm 🤤", time:183  },
    { text: "Mmm, mm-mm, mmm 🤤", time: 185 },
    { text: "Yo le hablo a Dios 🕍 y tú eres su respuesta 🕯️", time: 189 },
    { text: "Aprendí que los momentos lindos nunca cuestan 🌚🌝", time: 192 },
    { text: "Como cuando me regalas tu mirada 👀🫣", time: 194 },
    { text: "Y el sol, su puesta 🌇(ey, ey), y el sol, su puesta", time: 196 },
    { text: "Cuando estoy encima de ti, de ti 🥵", time: 200 },
    { text: "Mami, yo me olvido de todo, de todo 😵‍💫", time:206  },
    { text: "No hace falta nadie aquí", time: 206 },
    { text: "Solamente tú y yo 👫", time:  209},
    { text: "Antes de que salga el sol 🌞y hunda el acelerador 🏍️", time: 213 },
    { text: "Que vaya sin frenos y pierda el control 💥", time:215  },
    { text: "Nada más seremos dos, tú y yo acariciándonos 🥴", time: 220 },
    { text: "En medio del tiempo ⌛, sin decir adiós", time:223  },
    { text: "Y solo mírame con esos ojitos lindos 🙈", time: 225 },
    { text: "Que con eso yo estoy bien", time:230  },
    { text: "Hoy he vuelto a nacer", time:234  },
    { text: "Y solo mírame con esos ojitos 😻 lindo'", time: 238 },
    { text: "Que con eso yo estoy bien", time: 243 },
    { text: "Hoy he vuelto a nacer ❤️", time:245  },

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
