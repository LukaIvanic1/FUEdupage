const questions = [
  ["Otkucati", "scoccare"],
  ["Manš", "la Manica"],
  ["Opće pravo glasa", "suffragio universale"],
  ["Vršiti", "esercitare"],
  ["Preporod", "Risorgimento"],
  ["Salsa od paradajza", "la pummarola"],
  ["Znanost o podrijetlu riječi", "l' etimologio"],
  ["Proizlaziti", "deriva"],
  ["Obred", "rituale"],
  ["Pokojnik", "defunto"],
  ["Preneseno značenje", "senso traslato"],
  ["Budala", "lo sciocco"],
  ["Nespretan", "malaccorto"],
  ["Smiješan", "ridicolo"],
  ["Upotrijebiti", "adoperare"],
  ["Prijekor", "rimprovero"],
  ["Prezir", "disprezzo"],
  ["Bazga", "sambuco"],
  ["Korov", "gramigna"],
  ["Vojni rok", "servizio militare"],
];

// let ulaz = "temp"; // e da onak bolje ako imas nes nedefinirano u js se koristi undefined al sobzirom da pokusaj je input od onog <input> đinđi mindđi onda se to može sada definirati

const ulaz = document.getElementById("ulaz");
const nextButton = document.getElementById("nextButton");
const podnaslov = document.getElementById("podnaslov");

// Nema smisla imat max bodove i n questiona jer je prakticki isti kurac a i takodjer max bodovi mogu biti const
//const numOfQuestions = questions.length;

// Pošteno ukro odavde (onaj s 208): https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function similarity(s1, s2) {
  console.log(s1, s2);
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength == 0) {
      return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
              if (j > 0) {
                  let newValue = costs[j - 1];
                  if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                  costs[j - 1] = lastValue;
                  lastValue = newValue;
              }
          }
      }
      if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

const maxbodovi = questions.length;
var bodovi = 0;
var i = 0;
function next() {
  if (i < maxbodovi) {
      if (i > 0) {
          let p = similarity(ulaz.value, questions[i - 1][1]);
          console.log("Posto da je tocan odgovor", p);
          // Ako je slicnos vise od 70% onda je vjv tocan odgovor, ovo bis trebo jos onako fine tunat jer sam ja 70 uzeo onako random
          if (p > 0.85) {
              bodovi += 1;
              
          }
      }
      podnaslov.textContent = questions[i][0];
      clearMe();
    } else {
      podnaslov.textContent = `${bodovi} od ${maxbodovi} bodova. ${Math.round((bodovi / maxbodovi) * 100)}%`;
      ulaz.remove();
      nextButton.remove();
  }
  
  i = i + 1;
  // console.log(1) Ok da ja sa,m masovna retard i jos se cudim zasto bvi samo ispisivalo 1 dobrih 6 minuta sam potrosio na ovo
}

  next();

function clearMe(){
      document.getElementById('ulaz').value = "";
}

// Bog ti oprostio za ovo
// while(i<numOfQuestions){
//     pitanje.innerText = questions[0][i];
//     function tipkaNext(){
//       pokusaj = document.getElementById("ulaz")
//     }
//     if(pokusaj == questions[0][i]){
//         bodovi++;
//       i++;
//       }else {
//         i++;
//       }
// }
