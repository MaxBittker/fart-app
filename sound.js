import Tone from "tone";
// import StartAudioContext from "startaudiocontext";

let started = false;

let startbutton = document.getElementById("start");
let startAudio = function() {
  if (started) {
    return;
  }
  Tone.start().then(() => {
    started = true;
    sound();
  });
};
startbutton.addEventListener("touchstart", startAudio);
startbutton.addEventListener("touchend", startAudio);
startbutton.addEventListener("mousedown", startAudio);

let synth;

function sound() {
  //   var filter = new Tone.Filter(-12, "lowpass");
  //   console.log(input);
  var filter = new Tone.LowpassCombFilter();

  synth = new Tone.FMSynth({
    modulationIndex: 3.22,
    envelope: {
      attack: 0.01,
      decay: 0.2
    },
    modulation: {
      type: "pulse"
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.01
    }
  }).toMaster();
  // .chain(filter)
  // .toMaster();

  synth.set("volume", 5);
  //   synth.triggerAttack("C4");
  synth.set("frequency", 0);
}

function startFart() {
  if (!started) {
    return;
  }
  synth.triggerAttack("C4");
}
function modulateFart(input) {
  if (isNaN(input)) {
    return;
  }
  synth.set("detune", input * 2);
}
function endFart() {
  if (!started) {
    return;
  }
  synth.triggerRelease();
}
export { startFart, modulateFart, endFart };

// let blooper = new Tone.PolySynth(6, Tone.Synth, {
//   oscillator: {
//     partials: [0, 2, 3, 4]
//   }
// }).toMaster();

// function bloop(n = 2) {
//   blooper.triggerAttackRelease("A4", 0.9);
//   blooper.set("frequency", (5 - n) * 100);
//   blooper.set("volume", 0.1);
// }
