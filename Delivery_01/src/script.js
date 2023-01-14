var donations = 0;

const quotes = ["Cogito, ergo sum", "Veni, vidi, vici", "Bona fide", "Dictum factum", "Dum vita est, spes est"];

function donate() {
    donations++;
    document.getElementById("num_donations").innerHTML =
     donations;
}

function show() {
    document.getElementById("div_donate").style.display = "block";
    document.getElementById("show_btn").style.display = "none";
}

function hide() {
    document.getElementById("div_donate").style.display = "none";
    document.getElementById("show_btn").style.display = "initial";
}

function random_quote() {
    return quotes[
        Math.floor(Math.random() * (quotes.length))
    ]
}

function get_quote() {
    var quote = random_quote();
    document.getElementById("quote_display").innerHTML =
    "'" + quote + "'";
    var list = document.getElementById("quote_list");
    var list_item = document.createElement("li");
    list_item.appendChild(document.createTextNode("'" + quote + "'"));
    list.appendChild(list_item);
}

