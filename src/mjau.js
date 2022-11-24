let x = document.getElementById("trenutnoVrijeme");

function time(){
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    if(s/10 < 1 && m/10 < 1){x.textContent = h + ":0" + m + ":0" + s}else
    if(s/10<1){x.textContent = h + ":" + m + ":0" + s}else
    if(m/10<1){x.textContent = h + ":0" + m + ":" + s}else
    {x.textContent = h + ":" + m + ":" + s}
}

setInterval(time,100);