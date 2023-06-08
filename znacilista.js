let y = document.getElementById("vrijemeDo");
let jajce = document.getElementById("jaja");
let progresbar = document.getElementById("poggers");
let dropdown = document.getElementById("dropdownMenuButton1");
let image = document.getElementById("rapored");


function mstomands(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
} //takes milliseconds and returns minutes and seconds

function mstohandmands(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

function t(h, m) {
    return new Date().setHours(h, m, 0, 0);

} //returns milliseconds that passed between midnight and the inputed time


function postosata(trenutno, pocetak, kraj) {
    let x = trenutno - pocetak;
    kraj = kraj - pocetak;
    x = x / kraj;
    return x * 100;
}//returns percentage of current period passed

let raspored = [
    { naziv: "1. sat", pocetak: t(8, 0), kraj: t(8, 45) },
    { naziv: "Mali odmor", pocetak: t(8, 45), kraj: t(8, 50) },
    { naziv: "2. sat", pocetak: t(8, 50), kraj: t(9, 35) },
    { naziv: "Mali odmor", pocetak: t(9, 35), kraj: t(9, 40) },
    { naziv: "3. sat", pocetak: t(9, 40), kraj: t(10, 25) },
    { naziv: "Veliki odmor", pocetak: t(10, 25), kraj: t(10, 45) },
    { naziv: "4. sat", pocetak: t(10, 45), kraj: t(11, 30) },
    { naziv: "Mali odmor", pocetak: t(11, 30), kraj: t(11, 35) },
    { naziv: "5. sat", pocetak: t(11, 35), kraj: t(12, 20) },
    { naziv: "Mali odmor", pocetak: t(12, 20), kraj: t(12, 25) },
    { naziv: "6. sat", pocetak: t(12, 25), kraj: t(13, 10) },
    { naziv: "Mali odmor", pocetak: t(13, 10), kraj: t(13, 15) },
    { naziv: "7. sat", pocetak: t(13, 15), kraj: t(13, 55) },
    { naziv: "Mali odmor", pocetak: t(13, 55), kraj: t(14, 0) },
    { naziv: "8. sat", pocetak: t(14, 0), kraj: t(14, 40) },
    { naziv: "SPAVAJ", pocetak: t(14, 40), kraj: t(32, 59) }
] //declaration of the list schedule

var pictureList = [
    "rasporedi\image0.jpg",
    "rasporedi\image1.jpg",
    "rasporedi\image2.jpg",
    "rasporedi\image3.jpg",
    "rasporedi\image4.jpg", 
];

function rgbt() {
    switch (Math.floor(Math.random() * 4) % 4) {
        case 0:
            progresbar.classList.toggle("bg-success")
        case 1:
            progresbar.classList.toggle("bg-info")
        case 2:
            progresbar.classList.toggle("bg-warning")
        case 3:
            progresbar.classList.toggle("bg-danger")
    }
} //deprecated function

function jebac() {
    let trenutno = new Date(); //trenutno gets assigned the value of the current date and time


    for (let i = 0; i < raspored.length; i++) {     //this goes through every member of the 'raspored' list

        if (raspored[i].pocetak < trenutno && raspored[i].kraj > trenutno) {   //this executes if the current time is equal to a time in the list 

            y.textContent = raspored[i].naziv;
            let doJaja = raspored[i].kraj - trenutno;
            progresbar.style.width = postosata(trenutno, raspored[i].pocetak, raspored[i].kraj) + "%";
            progresbar.textContent = postosata(trenutno, raspored[i].pocetak, raspored[i].kraj).toFixed(2) + "%";




            if (trenutno > raspored[0].pocetak && trenutno < raspored[raspored.length - 1].kraj) {

                if(raspored[i].naziv == "SPAVAJ"){
                    jajce.textContent = mstohandmands(doJaja) + " do početka škole! "
                }else
                
                if (raspored[i].pocetak < trenutno && raspored[i].naziv == "Mali odmor" || raspored[i].kraj > trenutno && raspored[i].naziv == "Veliki odmor") {
                    jajce.textContent = mstomands(doJaja) + " do pocetka sata!";
                }
                else {
                    jajce.textContent = mstomands(doJaja) + " do kraja sata!";
                }
            
            
            }
        
            break;
        }

    }

}

function chan(i){
    document.getElementById("rapored").src = "rasporedi/image" + i +".jpg";
}



setInterval(jebac,100);

