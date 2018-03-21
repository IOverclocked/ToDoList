document.addEventListener('DOMContentLoaded', function() {

    //zmienne do pokazywania i ukrywania formularza
    var btnShowForm = $('i.icon-add'),
        form = $('header form').hide(),
        formContent = $('header form > div').hide(),
        iconOk = $('form > div i.icon-done').hide();

    //event dla pokazywania i ukrywania formularza
    btnShowForm.on('click', function(){
        form.animate({
            width: "toggle"
        })
        formContent.slideToggle("slow");

    });

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
    
    function timer() {      // funkcja daty
      
        var time = new Date();
      
        var day = time.getDate();
        if(day < 10) {
            day = "0" + day;
        }
      
        var month = time.getMonth()+1;
        if (month < 10) {
            month = "0" + month
        }
        
        var year = time.getFullYear();
        var wholeDate = day + "/" + month + "/" + year;
    }
    console.log(timer());

    function addedTask(id, title, date, lvl, discription, done){

        var taskDiv = document.createElement('div'),
            titleH1 = document.createElement('h1'),
            dateH2 = document.createElement('h2'),
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
            lvlsI[i].classList.add('icon-star');
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
        dateH2.innerText = date;
        discriptionP.innerText = discription;

        //wrzucam gotowe elementy do głównego kontenera
        taskDiv.appendChild(titleH1);
        taskDiv.appendChild(dateH2);
        taskDiv.appendChild(lvlDiv);
        taskDiv.appendChild(discriptionP);
        taskDiv.appendChild(btnDiv);

        //dodaje nowe zadanie do maina
        document.querySelector('main').appendChild(taskDiv);
    }


    //tablica  na biekty
    var tasks = [];

    //konstruktor zadania
    var Task = function(id, title, date, lvl, discription, done){
        this.id = id;
        this.title = title;
        this.date = date;
        this.lvl = lvl;
        this.discription = discription;
        this.done = done;
    }

    btnAdd.addEventListener('click', function(e){

        e.preventDefault();

        var task = new Task(tasks.length, title.value, date.value, lvl, discription.value, true);
        tasks.push(task);

        localStorage.setItem('todo_list', JSON.stringify( tasks ) );

        addedTask(task.id, task.title, task.date, task.lvl, task.discription, task.done);

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

        console.log(e.target);


        if (e.target.className === "btnDelete icon-delete") {
            console.log("Delete");
        }
        if (e.target.className === "btnComplete icon-ok") {
            console.log("Complete");
        }
        if (e.target.className === "btnEdit icon-edit"){
            console.log("Edit");
        }

    });
    

    function downloadTasksFromSotrage(){

        tasks = JSON.parse( localStorage.getItem('todo_list') );

        if(tasks !== null){

            for(let i=0; i<tasks.length; i++){
                addedTask(tasks[i].id, tasks[i].title, tasks[i].date, tasks[i].lvl, tasks[i].discription, tasks[i].done);
            }

        } else {
            tasks = [];
        }

        localStorage.setItem('todo_list', JSON.stringify( tasks ) );
    }

    downloadTasksFromSotrage();

});
