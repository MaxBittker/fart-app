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
startbutton.addEventListener("touchdown", startAudio);
startbutton.addEventListener("touchstart", startAudio);
startbutton.addEventListener("touchend", startAudio);
startbutton.addEventListener("mousedown", startAudio);

let osc;
let noise;
let lfo;
function sound() {
  var filter = new Tone.Filter(330, "lowpass");
  //   console.log(input);
  osc = new Tone.Oscillator(40, "sawtooth");
  lfo = new Tone.LFO(20, 60, 120).start();
  lfo.connect(filter.frequency);

  osc.connect(filter);

  noise = new Tone.NoiseSynth({
    noise: {
      type: "brown"
    },
    envelope: {
      attack: 0.005
      // decay: 1.0,
      // sustain: 1
    }
  }).connect(filter);

  filter.toMaster();

  //schedule an amplitude curve
  // noise.volume.setValueAtTime(10, 0);
  // noise.volume.linearRampToValueAtTime(20, 2);
  // noise.volume.linearRampToValueAtTime(-Infinity, 3);
  // osc.set("fadeIn", 2.0);
  // osc.set("fadeOut", 2.0);
  osc.set("volume", 5);
  noise.set("volume", 5);
  osc.start();

  //   synth.triggerAttack("C4");
  // osc.set("frequency", 0);
}

function startFart() {
  if (!started) {
    return;
  }
  osc.set("volume", 5);

  // noise.triggerAttackRelease("8n");

  noise.triggerAttack();
}
function modulateFart(input) {
  if (isNaN(input)) {
    return;
  }
  //   synth.set("detune", input * 2);
  let s = input / 10;
  console.log(s.toFixed(2));
  lfo.set("frequency", s);
  //   synth.set("modulationIndex", s);
}
function endFart() {
  if (!started) {
    return;
  }
  osc.set("volume", -200);

  // osc.triggerRelease();
  // osc.stop();

  noise.triggerRelease();
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
