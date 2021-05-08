var txt = document.getElementsByTagName("textarea")[0];
var check = document.getElementById("check");
var mapa = [];
var storage = window.sessionStorage;
storage.setItem('data', []);
var people = [];


document.getElementById("btn1").addEventListener("click", () => {
    let data;
    var flag = false;
    if (check.checked) {
        people = storage.getItem('data');
    } else {
        people = mapa;
        flag = true;
    }

    for (line of txt.value.split('\n')) {

        //console.log(line);


        let com = line.split(':');
        if (com[0] == "create") {
            //console.log("Creating " + com[1]);

            if (people[com[1]] !== undefined) {
                console.log("Person exist");
            } else {
                people[com[1]] = [];
            }
        } else if (com[0] == "add") {
            //console.log("Adding " + com[1]);

            let to_add = com[1].split(",");

            for (let i = 1; i < to_add.length; i++) {

                let x = to_add[i].split('=');

                people[to_add[0]][x[0]] = x[1];

                //people[com[1].split(",")[0]].push(str);
            }


        } else if (com[0] == "find") {
            //console.log("Finding " + com[1]);

            let check = false;

            for (str in people) {
                let iff = true;
                let to_find = com[1].split(",");

                for (let i = 1; i < to_find.length; i++) {

                    let x = to_find[i].split('=');

                    if (people[str][x[0]] !== x[1]) {
                        iff = false;
                    }
                    //people[com[1].split(",")[0]].push(str);
                }
                if (iff == true) {
                    console.log(people[str]);
                    check = true;
                }
            }

            if (!check) {
                console.log("Brak wynikow");
            }

        } else if (com[0] == "delete") {
            //console.log("Deleting " + com[1]);
            //people.splice(com[1], 1);
            delete people[com[1]]
        }
    }


    /*
create: person1
create: person2
create: person2
add: person1, nazwisko = Nowak, imię = Jan
add: person2, imię = Joanna, nazwisko = Nowak, miasto = Warszawa
add: person2, miasto = Kraków
find: nazwisko = Nowak
find: imię = Joanna, miasto = Warszawa
delete: person1
find: nazwisko = Nowak 
                    /
            }*/

    //console.log(people);

})


document.getElementById("btn2").addEventListener("click", () => {
    console.log(people);
})