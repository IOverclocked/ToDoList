document.addEventListener('DOMContentLoaded', function() {

    //zmienne do pokazywania i ukrywania formularza
    var btnShowForm = $('i.icon-add'),
        form = $('header form').hide(),
        formContent = $('header form > div').hide(),
        iconOk = $('form > div i.icon-done').hide(),
        menu = $('header > .menu').hide(),
        btnMenu = $('header > i.icon-menu'),
        settings = $('footer > div').hide(),
        btnSettings = $('footer > i.icon-settings');


    //event dla pokazywania i ukrywania formularza
    btnShowForm.on('click', function(){
        form.animate({
            width: "toggle"
        })
        formContent.slideToggle("slow");
        menu.slideUp();
        settings.slideUp();
    });

    //menu rozwijalne
    btnMenu.on('click', function(){
        form.slideUp();
        formContent.slideUp();
        settings.slideUp();
        menu.slideToggle();
    })

    btnSettings.on('click', function(){
        form.slideUp();
        formContent.slideUp();
        menu.slideUp();
        settings.slideToggle();
    })

    //walidacja formularza
    var title = document.querySelector('#title'),
        date = document.querySelector('#date'),
        discription = document.querySelector('#discription'),
        btnAdd = document.querySelector('form button');

    var valTitle = false,
        valDate = false,
        valDiscrition = false;

    function validation(val1, val2, val3){

        if(val1 && val2 &&  val3){
            btnAdd.removeAttribute("disabled");
        } else {
            btnAdd.setAttribute("disabled", "");
        }

    }
    validation();

    //walidacja tytułu
    title.addEventListener('keyup', function(){

        var length = title.value.length;

        if(length < 25 && length > 5){
            iconOk.eq(0).fadeIn();
            valTitle = true;
        } else {
            iconOk.eq(0).fadeOut();
            valTitle = false;
        }

        validation(valTitle, valDate, valDiscrition);

    })

    //walidacja daty
    date.addEventListener('blur', function(){

        var dateNow = new Date(), //pobierz dzisiejszą datę
            deadline = Date.parse(this.value, 'dd.mm.rrrr'); //sprasuj date zaznaczoną

        dateNow = Date.parse(dateNow); //sprasuj datę dzisiejszą

        //sprawdź czy ktoś nie zaznaczył terminu na dzisiaj lub wczoraj,
        //oraz długości daty
        if((deadline-dateNow) > 0 && this.value.length === 10){
            iconOk.eq(1).fadeIn();
            valDate = true;
        } else {
            iconOk.eq(1).fadeOut();
            valDate = false;
        }

        validation(valTitle, valDate, valDiscrition);

    })

    //walidacja opisu
    discription.addEventListener('keyup', function(){

        var counter = discription.value.length;
        document.querySelector('form > div p').innerText = counter;

        if(counter < 100 && counter > 10 ){
            iconOk.eq(2).fadeIn();
            valDiscrition = true;
        } else {
            iconOk.eq(2).fadeOut();
            valDiscrition = false;
        }

        validation(valTitle, valDate, valDiscrition);

    })

    var radioAll = document.querySelectorAll('#boxLvl input'),
        lvl = 1;

    //sprawdzenie poziomu
    radioAll.forEach(function(radio){
        radio.addEventListener('click', function(){
            lvl = this.value;
        })
    })

    function dateNow() {      // funkcja daty

        var time = new Date(),
            month = time.getMonth()+1,
            day = time.getDate(),
            year = time.getFullYear();

        if(day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month
        }

        var wholeDate = day + "-" + month + "-" + year;
        return wholeDate;
    }

    function addedTask(id, title, dateFrom, dateTo, lvl, discription, done){

        var taskDiv = document.createElement('div'),
            titleH1 = document.createElement('h1'),
            dateH2 = document.createElement('h2'),
            dateH3 = document.createElement('h3'),
            lvlDiv = document.createElement('div'),
            btnDiv = document.createElement('div'),
            discriptionP = document.createElement('p'),
            buttons = [],
            lvlsI = [];

        //tworze buttony
        for(let i=0; i<3; i++){
            buttons[i] = document.createElement('button');
        }
        //dodaje im klasy
        buttons[0].classList.add('btnDelete');
        buttons[1].classList.add('btnComplete');
        buttons[2].classList.add('btnEdit');
        buttons[0].classList.add('icon-delete');
        buttons[1].classList.add('icon-ok');
        buttons[2].classList.add('icon-edit');
        //wrzucam do diva
        for(let i=0; i<3; i++){
            btnDiv.appendChild(buttons[i]);
        }
        //daje mu klase
        btnDiv.classList.add('btn');

        //tworze pojemniki na ikony i dodaje im klasę
        //i od razu wrzucam po kolei do głównego diva
        for(let i=0; i<lvl; i++){
            lvlsI[i] = document.createElement('i');
            lvlsI[i].classList.add('icon-lvl');
            lvlDiv.appendChild(lvlsI[i]);
        }
        //daje mu klasę
        lvlDiv.classList.add('lvl');
        discriptionP.classList.add('discription');
        taskDiv.classList.add('grid-task');

        //przypisuję id
        taskDiv.dataset.id = id;

        //przypisuję do opowiednich elementów zawartości
        titleH1.innerText = title;
        dateH2.innerText = dateTo;
        dateH3.innerText = dateFrom;
        discriptionP.innerText = discription;

        //wrzucam gotowe elementy do głównego kontenera
        taskDiv.appendChild(titleH1);
        taskDiv.appendChild(dateH2);
        taskDiv.appendChild(dateH3);
        taskDiv.appendChild(lvlDiv);
        taskDiv.appendChild(discriptionP);
        taskDiv.appendChild(btnDiv);

        if(done === true){
            taskDiv.style.backgroundColor = 'green';
            titleH1.style.textDecoration = 'line-through';
        } else {
            taskDiv.style.backgroundColor = "transparent";
            titleH1.style.textDecoration = 'none';
        }
        //dodaje nowe zadanie do maina
        document.querySelector('main').appendChild(taskDiv);
    }


    //tablica  na biekty
    var tasks = [];

    //konstruktor zadania
    var Task = function(id, title, dateFrom, dateTo, lvl, discription, done){
        this.id = id;
        this.title = title;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.lvl = lvl;
        this.discription = discription;
        this.done = done;
    }

    btnAdd.addEventListener('click', function(e){

        e.preventDefault();

        var task = new Task(tasks.length, title.value, dateNow(), date.value, lvl, discription.value, false);
        tasks.push(task);

        localStorage.setItem('todo_list', JSON.stringify(tasks));

        addedTask(task.id, task.title, task.dateFrom, task.dateTo, task.lvl, task.discription, task.done);

        //resetuje wartości z formularza
        //z pół formularza
        title.value = "";
        date.value = "";
        discription.value = "";
        //zwijam formularz
        form.slideUp();
        formContent.slideUp();
        //ukrywam ikony
        for(let i=0; i<3; i++) iconOk.eq(i).hide();
        //resetuje lvl
        document.querySelectorAll('#boxLvl > input')[4].checked = true;

    })

    // Przyciski: delete, complete, edit
    var body = document.querySelector("body");
    body.addEventListener("click", function (e) {

        if (e.target.className === "btnDelete icon-delete") {

            var taskEl = document.querySelectorAll('.grid-task'),
                main = document.querySelector('main'),
                task = e.target.parentElement.parentElement,
                taskId = task.dataset.id;

            for(let i=0; i<tasks.length; i++){

                if(tasks[i].id == taskId){

                    //kasuje obiekt w tablicy
                    delete tasks[i];

                    tasks = tasks.filter(function(task){
                        return (task !== 'empty');
                    })
                    //kasuję html z taskiem
                    main.removeChild(taskEl[i]);

                }

            }

            console.log(tasks);
            //zapisuję zmiany w pamięci
            localStorage.setItem('todo_list', JSON.stringify(tasks));

        }
        if (e.target.className === "btnComplete icon-ok") {

            var taskEl = document.querySelectorAll('.grid-task'),
                main = document.querySelector('main'),
                task = e.target.parentElement.parentElement,
                taskId = task.dataset.id,
                h1 = task.querySelector("h1");


            for(let i=0; i<tasks.length; i++){

                if(tasks[i].id == taskId){

                    if(tasks[i].done == false){
                        tasks[i].done = true;
                        task.style.backgroundColor = "green";
                        h1.style.textDecoration = "line-through";
                    } else {
                        tasks[i].done = false;
                        task.style.backgroundColor = "transparent";
                        h1.style.textDecoration = "none";
                    }
                }
            }

            localStorage.setItem('todo_list', JSON.stringify(tasks));

        }

        if (e.target.className === "btnEdit icon-edit"){

        }

    });

    function addAllTask(){

        for(let i=0; i<tasks.length; i++){
            addedTask(tasks[i].id, tasks[i].title, tasks[i].dateFrom, tasks[i].dateTo, tasks[i].lvl, tasks[i].discription, tasks[i].done);
        }

    }

    function downloadTasksFromSotrage(){

        //pobieram z pamięci
        tasks = JSON.parse( localStorage.getItem('todo_list'));

        if(tasks !== null){

            addAllTask();

        } else {
            tasks = [];
        }

    }

    downloadTasksFromSotrage();

    //---------------------------- Sortowanie ---------------------------------//

    var btnSortLvl = document.querySelector('.menu > ul > li:nth-child(1)'),
        btnSortDone = document.querySelector('.menu > ul > li:nth-child(2)');

    btnSortLvl.addEventListener('click', function(){

        clearList();

        if(sort === false) {
            sortDown();
        } else {
            sortUp();
        }

        addAllTask();

    })
    btnSortDone.addEventListener('click', function(){
        showHideDone();
    })

    //funkcja czyszczonca listę
    function clearList(){

        var main = document.querySelector('main'),
            allTask = document.querySelectorAll('.grid-task');

        for(let i=0; i<allTask.length; i++){
            main.removeChild(allTask[i]);
        }

    }

    //zmienna sterująca
    var sort = false;

    function sortDown(){

        tasks.sort(function(min, max){
            return max.lvl - min.lvl;
        });

        sort = true;

        btnSortLvl.innerText = "Sortuj malejąco";

    }

    function sortUp(){

        tasks.sort(function(min, max){
            return min.lvl - max.lvl;
        });

        sort = false;

        btnSortLvl.innerText = "Sortuj rosnąco";
    }

    function showHide(bool, str){

        var elAllTasks = document.querySelectorAll('.grid-task'),
            done = false,
            work = false;

        function showAll(){
            for(let i=0; i<tasks.length; i++){
                elAllTasks[i].style.display = "grid";
            }
        }

        for(let i=0; i<tasks.length; i++){
            if(tasks[i].done === true){
                done = true;
            } else {
                work = true;
            }
        }

        if(done && work){
            for(let i=0; i<tasks.length; i++){

                if(tasks[i].done !== bool){
                    elAllTasks[i].style.display = "none";
                    btnSortDone.innerText = str;
                } else {
                    elAllTasks[i].style.display = "grid";
                }

            }
        } else if (done && !work) {
            alert('Wszystkie zadania są wykonane');
            showAll();

        } else if (work && !done) {
            alert("Żadne zadanie nie zostało skończone!");
            showAll();
        }

    }

    var done = false;
    function showHideDone(){

        if(done === false){

            showHide(true, "Do zrobienia");

            done = true;
        } else if (done === true) {

            showHide(false, "Zakończone");

            done = false;
        }

    }

    var btnAllDeleteDone = document.querySelector('footer > button');

    btnAllDeleteDone.addEventListener('click', function(){

        var elAllTasks = document.querySelectorAll('.grid-task'),
            main = document.querySelector('main');

        for(let i=0; i<tasks.length; i++){
            if(tasks[i].done == true){
                delete tasks[i];
                main.removeChild(elAllTasks[i]);
            }
        }

        tasks = tasks.filter(function(task){
            return (task !== 'empty');
        })

        localStorage.setItem('todo_list', JSON.stringify(tasks));
    })


    var motive = document.querySelectorAll('footer > div li');

    function changeMotive(bgColor, fontColor, fontFamily, btnColor){
        var main = document.querySelector('main'),
            body = document.querySelector('body');

    }

});
