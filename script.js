function generuj()
{
    var maska = document.getElementById("maska").value;

    if (maska === "" || maska < 8 || maska > 30)
    {
        document.getElementById("error").innerHTML = "Podano błędną wartość";
        document.getElementById("output").innerHTML = "";
        return;
    }
        
    document.getElementById("error").innerHTML = "";


    var output = "";


    // klasa

    var klasa;
    var standard = ["<br>Klasa: A", "<br>Klasa: B", "<br>Klasa: C"]

    if (maska >= 24) {
        klasa = 2;
    } else if (maska >= 16) {
        klasa = 1;;
    } else {
        klasa = 0;;
    }

    output += standard[klasa];


    // Maska bin

    output += "<br><br>Maska:<br>Bin: ";

    for (let i = 0; i < 32; i++)
    {
        if ((i%8) === 0)
        {
            output += " ";
        }

        if (i < maska)
        {
            output += "1";
        } else {
            output += "0";
        }
    }


    // Maska dec

    output += "<br>Dec: 255.";

    var maska_dec = Math.pow(2, 8) - Math.pow(2, (8 - maska%8));

    if (klasa === 2) { // C
        output += "255.255." + maska_dec;
    } else if (klasa === 1) { // B
        output += "255." + maska_dec + ".0";
    } else if (klasa === 0) { // A
        output += maska_dec + ".0.0";
    }
    

    // Ilość podsieci

    if (maska%8 === 0) {
        output += "<br><br>Ta sieć nie posiada podsieci";
    } else {

        if (maska%8 === 1 || (maska%8 === 7 && klasa === 2))
            output += "<br><br>Ta sieć nie ma sensu";

        var calkowita = Math.pow(2, maska%8);
        var uzytkowa = calkowita - 2;

        output += "<br><br>Ilość podsieci:<br>Całkowita: " + calkowita + "<br>Użytkowa: " + uzytkowa;
    

        // Podsieci

        output += "<br>";
        for (let i = 1; i <= calkowita; i++) {
            
            // Numer

            output += "<br><br>" + i;
            if (i === 1 || i === calkowita) {
                output += " (nieużytkowa): ";
            } else {
                output += ": ";
            }

            var x = (i - 1) * Math.pow(2, (8 - (maska%8)));
            var R = Math.pow(2, (8 - (maska%8))) - 1;


            if (klasa === 2) { // C
                output += "XXX.XXX.XXX." + x;
            } else if (klasa === 1) { // B
                output += "XXX.XXX." + x + ".0";
            } else if (klasa === 0) { // A
                output += "XXX." + x + ".0.0";
            }

                
            // Minimalna

            if (klasa === 2) { // C
                output += "<br>Min: XXX.XXX.XXX." + (x + 1);
            } else if (klasa === 1) { // B
                output += "<br>Min: XXX.XXX." + x + ".1";
            } else if (klasa === 0) { // A
                output += "<br>Min: XXX." + x + ".0.1";
            }


            // Maksymalna

            if (klasa === 2) { // C
                output += "<br>Max: XXX.XXX.XXX." + (x + (R - 1));
            } else if (klasa === 1) { // B
                output += "<br>Max: XXX.XXX." + (x + R) + ".254";
            } else if (klasa === 0) { // A
                output += "<br>Max: XXX." + (x + R) + ".255.254";
            }


            // Rozgłaszania

            if (klasa === 2) { // C
                output += "<br>R: XXX.XXX.XXX." + (x + R);
            } else if (klasa === 1) { // B
                output += "<br>R: XXX.XXX." + (x + R) + ".255";
            } else if (klasa === 0) { // A
                output += "<br>R: XXX." + (x + R) + ".255.255";
            }

        }

    }

    document.getElementById("output").innerHTML = output;

}
