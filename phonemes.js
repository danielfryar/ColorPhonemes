let phonemeDictionary = undefined;
let phonemes = {
  "vowels": ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
  "semivowels": ["W", "Y"],
  "aspirates": ["HH"],
  "liquids": ["L", "R"],
  "nasals": ["M", "N", "NG"],
  "affricates": ["CH", "JH"],
  "fricatives": ["F", "S", "SH", "TH", "V", "Z", "ZH"],
  "stops": ["B", "D", "G", "K", "P", "T"]
}
//   {
//     name: "AA",
//     type:	"vowel"
//   },
//   {
//     name: "AE",
//     type:	"vowel"
//   },
//     "AH"	"vowel"
//     "AO"	"vowel"
//     "AW"	"vowel"
//     "AY"	"vowel"
//     "EH"	"vowel"
//     "ER"	"vowel"
//     "EY"	"vowel"
//     "IH"	"vowel"
//     "IY"	"vowel"
//     "OW"	"vowel"
//     "OY"	"vowel"
//     "UH"	"vowel"
//     "UW"	"vowel"
//     "W"	"semivowel"
//     "Y"	"semivowel"
//     "HH"	"aspirate"
//     "L"	"liquid"
//     "R"	"liquid"
//     "M"	"nasal"
//     "N"	"nasal"
//     "NG"	"nasal"
//     "CH"	"affricate"
//     "JH"	"affricate"
//     "DH"	"fricative"
//     "F"	"fricative"
//     "S"	"fricative"
//     "SH"	"fricative"
//     "TH"	"fricative"
//     "V"	"fricative"
//     "Z"	"fricative"
//     "ZH"	"fricative"
//     "B"	"stop"
//     "D"	"stop"
//     "G"	"stop"
//     "K"	"stop"
//     "P"	"stop"
//     "T"	"stop"
//     '
// ]

fetch('./CMUdict/cmudict-test')
.then(response => response.text())
.then(text => {
  // phonemeDictionary = response.dictionary;
  loadDictionary(text);
  document.getElementById("colorize").removeAttribute("disabled");
  document.getElementById("colorize").innerText = "Colorize!";
  document.getElementById("colorize").addEventListener("click", function(event){
    event.preventDefault();
    colorizeText();
  });
});
  
function loadDictionary(dictionaryText) {
  phonemeDictionary = {};
  dictionaryText.split(/\r|\n/).forEach(line => {
    const chunks = line.split(' ');
    // correct code, but commented out to save processing time
    // if (chunks[1] !== ' ')
    //   phonemeDictionary[chunks[0]] = line.split(' ').slice(1);
    // else 
      phonemeDictionary[chunks[0]] = line.split(' ').slice(2);
  });
}

function colorizeText() {
  const text = document.getElementById("words").value;
  text.split(' ').forEach(word=>{
    const colorText = document.getElementById('colorText')
    colorText.innerHTML += colorizeWord(word) + ' '
  })
}
function colorizeWord(word) {
  //TODO: take care of punctuation
  const phonemeSet = phonemeDictionary[word.toUpperCase()];
  const letters = word.split('');

  let output = '<span class="colword">';
  if (!phonemeSet) output += `<span class="unknown_word">${word}</span>`;
  else {
    const diff = letters.length - phonemeSet.length;
    for (let i=0;i<phonemeSet.length;i++) {
      // TODO: replace this simple method with switch cases
      output += `<span class="colphon_${phonemeSet[i]}">${letters[i]}</span>`
    }
    if (diff > 0) {
      output += `<span class="colphon_X">${word.slice(phonemeSet.length)}</span>`
    }
  }
  output += '</span>'
  return output
}
const colorSelects = document.querySelectorAll('input[type="color"]');
colorSelects.forEach(element => {
  element.addEventListener("change", event => {
    console.log(event);
  })
});

// setTimeout(()=>{
//   console.log(colorizeWord('AARDVARK'))
//   console.log(colorizeWord('DANIEL'))
//   console.log(colorizeWord('SUCCESSFULLY'))
// }, 1000)

//         // switch(wordSet.value[i]) {
//         //     case 'AA':
//         //     case 'AA0':
//         //     case 'AA1':
//         //     case 'AA2':
//  a, aa, o
//         //         break;
//         //     case 'AE':
//         //     case 'AE0':
//         //     case 'AE1':
//         //     case 'AE2':
//  a
//         //         break;
//         //     case 'AH':
//         //     case 'AH0':
//         //     case 'AH1':
//         //     case 'AH2:
//  a, o
//         //         break;
//         //     case 'AO':
//         //     case 'AO0':
//         //     case 'AO1':
//         //     case 'AO2':
//  a, o
//         //         break;
//         //     case 'AW':
//         //     case 'AW0':
//         //     case 'AW1':
//         //     case 'AW2':
//  a, o, au, aw, ou, ow, 
//         //         break;
//         //     case 'AY':
//         //     case 'AY0':
//         //     case 'AY1':
//         //     case 'AY2':
//  i, y, ie, e
//         //         break;
//         //     case 'EH':
//         //     case 'EH0':
//         //     case 'EH1':
//         //     case 'EH2':
//  e,a, ai, ei
//         //         break;
//         //     case 'ER':
//         //     case 'ER0':
//         //     case 'ER1':
//         //     case 'ER2':
//  er, ar, or, ur
//         //         break;
//         //     case 'EY':
//         //     case 'EY0':
//         //     case 'EY1':
//         //     case 'EY2':
//  a, ai, ay, e, ey
//         //         break;
//         //     case 'IH':
//         //     case 'IH0':
//         //     case 'IH1':
//         //     case 'IH2':
//  i, ie
//         //         break;
//         //     case 'IY':
//         //     case 'IY0':
//         //     case 'IY1':
//         //     case 'IY2':
//  i, e, y, ee, ie
//         //         break;
//         //     case 'OW':
//         //     case 'OW0':
//         //     case 'OW1':
//         //     case 'OW2':
//  o, ow, eaux, oa, eau
//         //         break;
//         //     case 'OY':
//         //     case 'OY0':
//         //     case 'OY1':
//         //     case 'OY2':
//  oi, oy, eu
//         //         break;
//         //     case 'UH':
//         //     case 'UH0':
//         //     case 'UH1':
//         //     case 'UH2':
//  u, o, oo, ou
//         //         break;
//         //     case 'UW':
//         //     case 'UW0':
//         //     case 'UW1':
//         //     case 'UW2':
//  u, ue, oo, ew
//         //         break;
//         //     case 'W':
// q(u), w, ou, ua = ah/w/ah
//         //         break;
//         //     case 'Y':
//  y, u, (i)a, j
//         //         break;
//         //     case 'HH':
//  h
//         //         break;
//         //     case 'L':
//  l, ll, lle, le
//         //         break;
//         //     case 'R':
//  r, rr, re
//         //         break;
//         //     case 'M':
//  m, mb, mm, hm, me, mme
//         //         break;
//         //     case 'N':
//  n, nn, ne
//         //         break;
//         //     case 'NG':
//  ng, n
//         //         break;
//         //     case 'CH':
//  ch, tch
//         //         break;
//         //     case 'JH':
//  ge, j, dg, dge, gg, g, gi
//         //         break;
//         //     case 'DH':
//  th, the
//         //         break;
//         //     case 'F':
//  f, ff, ph, v, ow()ski/y
//         //         break;
//         //     case 'S':
//  s, ss, z, x=k(s), se
//         //         break;
//         //     case 'SH':
//  sh, sch, c, sz, ch
//         //         break;
//         //     case 'TH':
//  th, very rarely the, tth
//         //         break;
//         //     case 'V':
//  v, ve
//         //         break;
//         //     case 'Z':
//  z, zz, ze, s, ss, se
//         //         break;
//         //     case 'ZH':
//  s, g, z, sh, (si)a, ge, j, x=G+ZH, zh
//         //         break;
//         //     case 'B':
//  b, bb, rarely be
//         //         break;
//         //     case 'D':
//  d, ed
//         //         break;
//         //     case 'G':
//  g, gg, gue, gu
//         //         break;
//         //     case 'K':
//  c, k, ck, ch, ke, qu=K+W, kh, ch
//         //         break;
//         //     case 'P':
//  p, pp, pe
//         //         break;
//         //     case 'T':
//         //         break;
//  t, tt, tte
//         //     default:
//         //         
//         // }
//     }

