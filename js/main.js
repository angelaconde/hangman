window.onload = () => {
    crearBotonesLetras();
    deshabilitarLetras();
    document.getElementById("vidas").innerHTML = "Vidas restantes: " + vidas;
    document.getElementById("palabra").innerHTML = "_ _ _ _ _";
    esconderPalabraYVidas();
    rellenarEstadisticas();
    esconderEstadisticas();
};

let fallos = 0;
let palabra = "";
let mascara = [];
let letrasRestantes = palabra.length;
let vidas = 6;
let categoria = "";
let english = false;
let victorias = 0;
let racha = 0;
let derrotas = 0;

function crearBotonesLetras() {
    let letrasArray = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    let botonesLetras = document.getElementById("letras");
    for (let i = 0; i < letrasArray.length; i++) {
        let boton = document.createElement("button");
        boton.innerHTML = letrasArray[i];
        boton.name = "botonLetra";
        boton.onclick = pulsarLetra;
        botonesLetras.appendChild(boton);
    }
}

function jugar() {
    habilitarLetras();
    fallos = 0;
    palabra = getPalabraAlAzar();
    mascara.length = 0;
    letrasRestantes = palabra.length;
    vidas = 6;
    crearMascara();
    cambiarImagen(fallos);
    mostrarPalabraYVidas();
    mostrarEstadisticas();
    if (english) {
        document.getElementById("vidas").innerHTML = "Remaining lives: " + vidas;
    } else {
        document.getElementById("vidas").innerHTML = "Vidas restantes: " + vidas;
    }
    deshabilitarOpciones();
}

function esconderPalabraYVidas() {
    document.getElementById("palabra").style.visibility = "hidden";
    document.getElementById("vidas").style.visibility = "hidden";
}

function mostrarPalabraYVidas() {
    document.getElementById("palabra").style.visibility = "visible";
    document.getElementById("vidas").style.visibility = "visible";
}

function crearMascara() {
    for (let i = 0; i < palabra.length; i++) {
        mascara.push("_");
    }
    document.getElementById("palabra").innerHTML = mascara.join(" ");
}

function pulsarLetra() {
    let correcta = false;
    let letra = this.innerHTML.toUpperCase();
    for (let i = 0; i < palabra.length; i++) {
        if (quitarTildes(palabra[i]) === letra) {
            mascara[i] = palabra[i];
            document.getElementById("palabra").innerHTML = mascara.join(" ");
            letrasRestantes--;
            correcta = true;
            if (letrasRestantes === 0) {
                document.getElementById("figura").src = "img/win.png";
                if (english) {
                    document.getElementById("vidas").innerHTML = "You win!";
                } else {
                    document.getElementById("vidas").innerHTML = "¡Has ganado!";
                }
                deshabilitarLetras();
                correcta = true;
                habilitarOpciones();
                victorias++;
                racha++;
                rellenarEstadisticas();
            }
        }
    }
    if (!correcta) {
        fallos++;
        cambiarImagen(fallos);
        vidas--;
        if (english) {
            document.getElementById("vidas").innerHTML = "Remaining lives: " + vidas;
        } else {
            document.getElementById("vidas").innerHTML = "Vidas restantes: " + vidas;
        }
        if (fallos === 6) {
            if (english) {
                document.getElementById("vidas").innerHTML = "You lose. The word was " + palabra.join("") + ".";
            } else {
                document.getElementById("vidas").innerHTML = "Has perdido. La palabra era " + palabra.join("") + ".";
            }
            deshabilitarLetras();
            habilitarOpciones();
            derrotas++;
            racha = 0;
            rellenarEstadisticas();
        }
    }
    this.disabled = true;
}

function quitarTildes(letra) {
    return letra.normalize("NFD").replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1").normalize();
}

function habilitarLetras() {
    let botones = document.getElementsByName("botonLetra");
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = false;
    }
}

function deshabilitarLetras() {
    let botones = document.getElementsByName("botonLetra");
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}

function rellenarEstadisticas() {
    if (english) {
        document.getElementById("estadisticas").innerHTML = "  [ Wins: " + victorias + " ]  [ Loses: " + derrotas + " ]  [ Streak: " + racha + " ]";
    } else {
        document.getElementById("estadisticas").innerHTML = "  [ Victorias: " + victorias + " ]  [ Derrotas: " + derrotas + " ]  [ Racha: " + racha + " ]";
    }
}

function resetearEstadisticas() {
    if (english) {
        let borrar = confirm("Are you sure you want to reset the statistics?");
    } else {
        let borrar = confirm("¿Seguro que quieres borrar las estadísticas?");
    }
    if (borrar) {
        victorias = 0;
        derrotas = 0;
        racha = 0;
        rellenarEstadisticas();
    }
}

function esconderEstadisticas() {
    document.getElementById("contenedor-estadisticas").style.visibility = "hidden";
}

function mostrarEstadisticas() {
    document.getElementById("contenedor-estadisticas").style.visibility = "visible";
}

function deshabilitarOpciones() {
    document.getElementById("categoria").disabled = true;
    document.getElementById("jugar").disabled = true;
    document.getElementById("idioma").disabled = true;
}

function habilitarOpciones() {
    document.getElementById("categoria").disabled = false;
    document.getElementById("jugar").disabled = false;
    document.getElementById("idioma").disabled = false;
}

function cambiarIdioma() {
    if (english) {
        english = false;
        document.getElementById("titulo").innerHTML = "El Ahorcado";
        if (letrasRestantes === 0) {
            document.getElementById("vidas").innerHTML = "¡Has ganado!";
        } else if (fallos === 6) {
            document.getElementById("vidas").innerHTML = "Has perdido. La palabra era " + palabra.join("") + ".";
        } else {
            document.getElementById("vidas").innerHTML = "Vidas restantes: " + vidas;
        }
        document.getElementById("resetear-estadisticas").innerHTML = "Borrar";
        document.getElementById("categoriaLabel").innerHTML = "Categoría:";
        document.getElementById("cualquiera").text = "Cualquiera";
        document.getElementById("animales").text = "Animales";
        document.getElementById("ciudades").text = "Ciudades";
        document.getElementById("colores").text = "Colores";
        document.getElementById("jugar").innerHTML = "Jugar";
    } else {
        english = true;
        document.getElementById("titulo").innerHTML = "The Hangman";
        if (letrasRestantes === 0) {
            document.getElementById("vidas").innerHTML = "You win!";
        } else if (fallos === 6) {
            document.getElementById("vidas").innerHTML = "You lose. The word was " + palabra.join("") + ".";
        } else {
            document.getElementById("vidas").innerHTML = "Remaining lives: " + vidas;
        }
        document.getElementById("resetear-estadisticas").innerHTML = "Reset";
        document.getElementById("categoriaLabel").innerHTML = "Topic:";
        document.getElementById("cualquiera").text = "Anything";
        document.getElementById("animales").text = "Animals";
        document.getElementById("ciudades").text = "Cities";
        document.getElementById("colores").text = "Colours";
        document.getElementById("jugar").innerHTML = "Play";
    }
    rellenarEstadisticas();
}

function getPalabraAlAzar() {
    let palabras = [];
    let seleccion = document.getElementById("categoria").value;
    if (english) {
        palabras = getListasEng(seleccion);
    } else {
        palabras = getListas(seleccion);
    }
    let numero = Math.floor(Math.random() * (palabras.length));
    let palabra = palabras[numero].toUpperCase().split("");
    return palabra;
}

function getListas(categoria) {
    let animales = "abeja águila alce araña ardilla avestruz ballena bisonte boa búho buitre burro caballo cabra caimán calamar camaleón camello cangrejo canguro caracol castor cebra cerdo chimpancé chita cocodrilo colibrí conejo cucaracha cuervo delfín dingo elefante erizo escorpión foca gacela gallina ganso gato gorila grillo gusano halcón hiena hipopótamo hormiga iguana jabalí jaguar jirafa koala lagarto león liebre lince lobo mandril mapache mariposa marmota mono mosca murciélago nutria ocelote oso oveja pájaro paloma panda pantera pato perezoso perico perro pez pingüino puercoespín pulpo puma puma rana rata rinoceronte sapo suricato tapir tarántula tejón tigre topo tortuga tucán vaca venado víbora vicuña zarigüeya".split(" ");
    let ciudades = "Albacete Alicante Almería Ávila Badajoz Barcelona Bilbao Burgos Cáceres Cádiz Castellón Ceuta Córdoba Cuenca Gerona Granada Guadalajara Huelva Huesca Jaén León Lérida Logroño Lugo Madrid Málaga Melilla Mérida Murcia Orense Oviedo Palencia Palma Pamplona Pontevedra Salamanca Santander Segovia Sevilla Soria Tarragona Teruel Toledo Valencia Valladolid Vitoria Zamora Zaragoza Reikiavik Lisboa Casablanca Londres Madrid París Argel Bruselas Ámsterdam Zúrich Oslo Roma Copenhague Berlín Estocolmo Budapest Varsovia Sofía Atenas Helsinki Estambul Kiev Moscú Teherán Dubái Kabul Bangkok Hanói Yakarta Singapur Perth Pekín Manila Shanghái Taipéi Seúl Tokio Adelaida Vladivostok Guam Sídney Honolulu Vancouver Seattle Tijuana Edmonton Phoenix Chihuahua Denver México Winnipeg Dallas Houston Guatemala Chicago Atlanta Toronto Lima Washington Kingston Filadelfia Bogotá Boston Caracas Halifax Montevideo Praia".split(" ");
    let colores = "Agua Aguamarina Almendra Amarillo Añil Azul Beige Blanco Caqui Carmesí Castaño Celeste Coral Cyan Dorado Fucsia Gris Lavanda Magenta Marfil Marrón Melocotón Naranja Negro Oliva Plata Púrpura Rojo Rosa Salmón Siena Turquesa Verde Violeta".split(" ");
    let cualquiera = animales.concat(ciudades).concat(colores);
    switch (categoria) {
        case "animales":
            return animales;
        case "ciudades":
            return ciudades;
        case "colores":
            return colores;
        case "cualquiera":
            return cualquiera;
    }
}

function getListasEng(categoria) {
    let animales = "Aardvark Albatross Alligator Alpaca Ant Anteater Antelope Ape Armadillo Donkey Baboon Badger Barracuda Bat Bear Beaver Bee Bison Boar Buffalo Butterfly Camel Capybara Caribou Cassowary Cat Caterpillar Cattle Chamois Cheetah Chicken Chimpanzee Chinchilla Chough Clam Cobra Cockroach Cod Cormorant Coyote Crab Crane Crocodile Crow Curlew Deer Dinosaur Dog Dogfish Dolphin Dotterel Dove Dragonfly Duck Dugong Dunlin Eagle Echidna Eel Eland Elephant Elk Emu Falcon Ferret Finch Fish Flamingo Fly Fox Frog Gaur Gazelle Gerbil Giraffe Gnat Gnu Goat Goldfinch Goldfish Goose Gorilla Goshawk Grasshopper Grouse Guanaco Gull Hamster Hare Hawk Hedgehog Heron Herring Hippopotamus Hornet Horse Human Hummingbird Hyena Ibex Ibis Jackal Jaguar Jay Jellyfish Kangaroo Kingfisher Koala Kookabura Kouprey Kudu Lapwing Lark Lemur Leopard Lion Llama Lobster Locust Loris Louse Lyrebird Magpie Mallard Manatee Mandrill Mantis Marten Meerkat Mink Mole Mongoose Monkey Moose Mosquito Mouse Mule Narwhal Newt Nightingale Octopus Okapi Opossum Oryx Ostrich Otter Owl Oyster Panther Parrot Partridge Peafowl Pelican Penguin Pheasant Pig Pigeon Pony Porcupine Porpoise Quail Quelea Quetzal Rabbit Raccoon Rail Ram Rat Raven Red deer Red panda Reindeer Rhinoceros Rook Salamander Salmon Sand Dollar Sandpiper Sardine Scorpion Seahorse Seal Shark Sheep Shrew Skunk Snail Snake Sparrow Spider Spoonbill Squid Squirrel Starling Stingray Stinkbug Stork Swallow Swan Tapir Tarsier Termite Tiger Toad Trout Turkey Turtle Viper Vulture Wallaby Walrus Wasp Weasel Whale Wildcat Wolf Wolverine Wombat Woodcock Woodpecker Worm Wren Yak Zebra".split(" ");
    let ciudades = "Amsterdam Andorra Ankara Astana Athens Baku Belgrade Berlin Bern Bratislava Brussels Bucharest Budapest Chisinau Copenhagen Dublin Helsinki Kiev Lisbon Ljubljana London Luxembourg Madrid Minsk Monaco Moscow Nicosia Oslo Paris Podgorica Prague Reykjavík Riga Rome Sarajevo Skopje Sofia Stockholm Tallinn Tbilisi Tirana Vaduz Vienna Vilnius Warsaw Yerevan Zagreb Amman Ankara Ashgabat Astana Baghdad Baku Bangkok Beijing Beirut Bishkek Cairo Colombo Damascus Dhaka Dili Doha Dushanbe Hanoi Islamabad Jakarta Jerusalem Kabul Kathmandu Kuwait Malé Manama Manila Moscow Muscat Naypyidaw Nicosia Pyongyang Ramallah Riyadh Seoul Singapore Taipei Tashkent Tbilisi Tehran Thimphu Tokyo Ulaanbaatar Vientiane Yerevan Basseterre Belmopan Bridgetown Castries Guatemala Havana Kingston Managua Mexico Nassau Ottawa Panama Roseau Tegucigalpa Asunción Bogotá Brasília Caracas Cayenne Georgetown Lima Montevideo Paramaribo Quito Santiago".split(" ");
    let colores = "Almond Aqua Aquamarine Azure Beige Black Blue Brown Coral Crimson Cyan Fuchsia Gold Gray Green Ivory Khaki Lavender Magenta Maroon Navy Olive Orange Peach Pink Purple Red".split(" ");
    let cualquiera = animales.concat(ciudades).concat(colores);
    switch (categoria) {
        case "animales":
            return animales;
        case "ciudades":
            return ciudades;
        case "colores":
            return colores;
        case "cualquiera":
            return cualquiera;
    }
}

function cambiarImagen(fallos) {
    switch (fallos) {
        case 0:
            document.getElementById("figura").src = "img/0.png";
            break;
        case 1:
            document.getElementById("figura").src = "img/1.png";
            break;
        case 2:
            document.getElementById("figura").src = "img/2.png";
            break;
        case 3:
            document.getElementById("figura").src = "img/3.png";
            break;
        case 4:
            document.getElementById("figura").src = "img/4.png";
            break;
        case 5:
            document.getElementById("figura").src = "img/5.png";
            break;
        case 6:
            document.getElementById("figura").src = "img/6.png";
            break;
    }
}
