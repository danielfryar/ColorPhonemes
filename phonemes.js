let phonemes = [
  {
    name: "AA",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "AE",
    color: "blue",
    active: true
  }, {
    name: "AH",
    color: "blue",
    active: true
  }, {
    name: "AO",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "AW",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "AY",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "EH",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "ER",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "EY",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "IH",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "IY",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "OW",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "OY",
    type: "vowel",
    color: "blue",
    active: true
  }, {
    name: "UH",
    type: "vowel",
    color: "blue",
    active: true
  },{ 
    name: "UW",
    type: "vowel",
    color: "blue",
    active: true
  },{ 
    name: "W",
    type: "semivowel",
    color: "purple",
    active: false
  },{ 
    name: "Y",
    type: "semivowel",
    color: "purple",
    active: false
  },{ 
    name: "HH",
    type: "aspirate",
    color: "purple",
    active: false
  },{ 
    name: "L",
    type: "liquid",
    color: "teal",
    active: false
  }, {
    name: "R",
    type: "liquid",
    color: "teal",
    active: false
  }, {
    name: "M",
    type: "nasal",
    color: "green",
    active: false
  }, {
    name: "N",
    type: "nasal",
    color: "green",
    active: false
  }, {
    name: "NG",
    type: "nasal",
    color: "green",
    active: false
  }, {
    name: "DH",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "F",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "S",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "SH",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "TH",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "V",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "Z",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "ZH",
    type: "fricative",
    color: "orange",
    active: false
  }, {
    name: "CH",
    type: "affricate",
    color: "orange",
    active: false
  }, {
    name: "JH",
    type: "affricate",
    color: "purple",
    active: false
  }, {
    name: "B",
    type: "stop",
    color: "red",
    active: false
  }, {
    name: "D",
    type: "stop",
    color: "red",
    active: false
  }, { 
    name: "G",
    type: "stop",
    color: "red",
    active: false
  }, { 
    name: "K",
    type: "stop",
    color: "red",
    active: false
  }, { 
    name: "P",
    type: "stop",
    color: "red",
    active: false
  }, { 
    name: "T",
    type: "stop",
    color: "red",
    active: false
  }
];

let phonemeDictionary = undefined;
fetch('./cmudict-0.7b')
.then(response => response.text())
.then(text => {
  // phonemeDictionary = response.dictionary;
  loadDictionary(text);
  console.log("Dictionary Loaded");
  document.getElementById("colorize_btn").removeAttribute("disabled");
  document.getElementById("col_btn_txt").innerText = "Colorize!";
  document.getElementById("colorize_btn").addEventListener("click", function(event){
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
  const colorText = document.getElementById('colorText');
  colorText.innerHTML = "";
  text.split(' ').forEach(word=>{
    // const colorText = document.getElementById('colorText')
    colorText.innerHTML += colorizeWord(word) + ' '
  })
  // const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
  // const segmentedText = segmenter.segment(text);
  // const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
  // words.forEach(word => {
  //   colorText.innerHTML += colorizeWord(word) + ' ';
  // })
  colorText.parentElement.removeAttribute("hidden");
  update();
}

function colorizeWord(word) {
  //TODO: take care of punctuation
  const punctuation = ['"', "'", ".", ",", "?", "!", "-", ";", ":"];
  let startingPunctuation = "", endingPunctuation = "";
  if (punctuation.includes(word[0])) {
    startingPunctuation = word[0]; 
    word = word.slice(1, word.length);
  }
  if (punctuation.includes(word[word.length-1])) {
    endingPunctuation = word[word.length-1];
    word = word.slice(0, word.length-1);
    if (punctuation.includes(word[word.length-1])) { // double punctuation
      endingPunctuation = word[word.length-1] + endingPunctuation;
      word = word.slice(0, word.length-1);
    }
  }

  const phonemeSet = phonemeDictionary[word.toUpperCase()];
  if (!phonemeSet) {
    return `<span class="unknown_word">${startingPunctuation+word+endingPunctuation}</span>`;
  }
  
  let output = `${startingPunctuation}<span class="colword">`;
  const letters = word.split('');
  const diff = letters.length - phonemeSet.length;
  for (let i=0;i<phonemeSet.length;i++) {
    // TODO: replace this simple method with switch cases
    
    output += `<span class="colphon_${phonemeSet[i].length === 3 ? phonemeSet[i].slice(0,2) : phonemeSet[i]}">${letters[i]}</span>`
  }
  if (diff > 0) {
    output += `<span class="colphon_X">${word.slice(phonemeSet.length)}</span>`
  }
  output += `</span>${endingPunctuation}`;
  return output;
}

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

const update = () => {
  phonemes.forEach((phoneme) => {
    const queryString = ".colphon_"+phoneme.name;
    document.querySelectorAll(queryString).forEach(el => {
      el.style.color = phoneme.active ? phoneme.color : '';
      // if (phoneme.active) el.removeAttribute("hidden")
      // else el.setAttribute("hidden", true);
    })
  })
}

const groupings = [
  {
    name: "vowels",
    visible: false,
    phonemes: ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW"]
  }, {
    name: "semivowels",
    visible: false,
    phonemes: ["W", "Y", "HH"]
  }, {
    name: "liquids",
    visible: false,
    phonemes: ["L", "R", "M", "N", "NG"]
  }, {
    name: "fricatives",
    visible: false,
    phonemes: ["CH","JH","DH","F","S","SH","TH","V","Z","ZH"]
  }, {
    name: "stops",
    visible: false,
    phonemes: ["B", "D", "G", "K", "P", "T"]
  }
]
groupings.forEach(grouping => {
  document.getElementById(grouping.name + "_top").addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      grouping.visible = !grouping.visible;
      document.querySelectorAll("."+grouping.name+"-items").forEach(el => {
        if (grouping.visible) el.removeAttribute("hidden")
        else el.setAttribute("hidden", true);
      }) 
    }
  })
  document.getElementById(grouping.name + "_active").addEventListener('change', e => {
    e.stopPropagation();
    phonemes.filter(phon => grouping.phonemes.includes(phon.name)).forEach(phon => phon.active = e.currentTarget.checked);
    update();
  })
  document.getElementById(grouping.name + "_color").addEventListener('change', e => {
    e.stopPropagation();
    const selectedColor = e.currentTarget.value;
    phonemes.filter(phon => grouping.phonemes.includes(phon.name)).forEach(phon => {
      // console.log(phon)
      document.getElementById(phon.name + "_color").value = selectedColor;
      phon.color = selectedColor;
    })
    update();
  })
  // const selectedColor = document.getElementById
})

phonemes.forEach(phoneme => {
  document.getElementById(phoneme.name + "_color").addEventListener('change', e => {
    phoneme.color = e.currentTarget.value;
    console.log(phoneme);
    update();
  })
});

