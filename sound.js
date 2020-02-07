import Tone from "tone";

let FSynth;
var filter = new Tone.Filter(200, "highpass");

function sound() {
  FSynth = new Tone.Synth(6, Tone.Synth, {
    oscillator: {
      type: "triangle"
    }
  })
    .chain(filter)
    .toMaster();

  FSynth.set("volume", 5);
  FSynth.triggerAttack("C4");
  FSynth.set("frequency", 0);
}

function startFart() {
  FSynth.triggerAttack("C4");
}
function modulateFart(input) {
  if (isNaN(input)) {
    // console.log(input);
    return;
  }
  FSynth.set("frequency", input);
}
function endFart() {
  FSynth.triggerRelease();
}
export { sound, startFart, modulateFart, endFart };

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
