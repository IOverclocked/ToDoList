document.addEventListener('DOMContentLoaded', function() {

    //zmienne do pokazywania i ukrywania formularza - jquery
    var btnShowForm = $('i.icon-add'),
        form = $('header form').hide(),
        formContent = $('header form > div').hide(),
        iconOk = $('form > div i.icon-done').hide(),
        menu = $('header > .menu').hide(),
        btnMenu = $('header > i.icon-menu'),
        settings = $('footer > div').hide(),
        btnSettings = $('footer > i.icon-settings');


    //event dla pokazywania i ukrywania formularza
    btnShowForm.on('click', function() {
        form.animate({
            width: "toggle"
        })
        formContent.slideToggle("slow");
        menu.slideUp();
        settings.slideUp();
    });

    //menu rozwijalne
    btnMenu.on('click', function() {
        form.slideUp();
        formContent.slideUp();
        settings.slideUp();
        menu.slideToggle();
    })

    //menu rozwijane z motywami od dołu
    btnSettings.on('click', function() {
        form.slideUp();
        formContent.slideUp();
        menu.slideUp();
        settings.slideToggle();
    })

    //walidacja formularza
    var title = document.querySelector('#title'),
        date = document.querySelector('#date'),
        description = document.querySelector('#description'),
        btnAdd = document.querySelector('form button');

    var valTitle = false,
        valDate = false,
        valDescription = false;

    //funkcja sprawdzająca czy walidacja przeszła poprawnie
    function validation(val1, val2, val3) {

        if (val1 && val2 && val3) {
            btnAdd.removeAttribute("disabled");
            btnAdd.style.backgroundColor = "#FF70A4";
        } else {
            btnAdd.setAttribute("disabled", "disabled");
            btnAdd.style.backgroundColor = "rgba(134, 207, 198, 1)";
        }

    }
    validation();

    //walidacja tytułu
    title.addEventListener('keyup', function() {

        var length = title.value.length;

        if (length < 25 && length > 5) {
            iconOk.eq(0).fadeIn();
            valTitle = true;
        } else {
            iconOk.eq(0).fadeOut();
            valTitle = false;
        }

        validation(valTitle, valDate, valDescription);

    })

    //walidacja daty
    date.addEventListener('blur', function() {

        var dateNow = new Date(), //pobierz dzisiejszą datę
            deadline = Date.parse(this.value, 'dd.mm.rrrr'); //sprasuj date zaznaczoną

        dateNow = Date.parse(dateNow); //sprasuj datę dzisiejszą

        //sprawdź czy ktoś nie zaznaczył terminu na dzisiaj lub wczoraj,
        //oraz długości daty
        if ((deadline - dateNow) > 0 && this.value.length === 10) {
            iconOk.eq(1).fadeIn();
            valDate = true;
        } else {
            iconOk.eq(1).fadeOut();
            valDate = false;
        }

        validation(valTitle, valDate, valDescription);

    })

    //walidacja opisu
    description.addEventListener('keyup', function() {

        var counter = description.value.length;
        document.querySelector('form > div p').innerText = counter;

        if (counter < 100 && counter > 10) {
            iconOk.eq(2).fadeIn();
            valDescription = true;
        } else {
            iconOk.eq(2).fadeOut();
            valDescription = false;
        }

        validation(valTitle, valDate, valDescription);

    })

    var radioAll = document.querySelectorAll('#boxLvl input'),
        lvl = 1;

    //sprawdzenie poziomu
    radioAll.forEach(function(radio) {
        radio.addEventListener('click', function() {
            lvl = this.value;
        })
    })

    function dateNow() { // funkcja daty

        var time = new Date(),
            month = time.getMonth() + 1,
            day = time.getDate(),
            year = time.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month
        }

        var wholeDate = year + "-" + month + "-" + day;
        return wholeDate;
    }

    function saveTasks(arr_obj) {
        localStorage.setItem('todo_list', JSON.stringify(arr_obj));
    }

    function downloadTasks() {
        return JSON.parse(localStorage.getItem('todo_list'));
    }

    function addedTask(id, title, dateFrom, dateTo, lvl, description, done) {

        var taskDiv = document.createElement('div'),
            titleH1 = document.createElement('h1'),
            dateH2 = document.createElement('h2'),
            dateH3 = document.createElement('h3'),
            lvlDiv = document.createElement('div'),
            btnDiv = document.createElement('div'),
            descriptionP = document.createElement('p'),
            buttons = [],
            lvlsI = [];

        //tworze buttony
        for (let i = 0; i < 3; i++) {
            buttons[i] = document.createElement('button');
        }
        //dodaje im klasy i data
        buttons[0].classList.add('btnDelete');
        buttons[1].classList.add('btnComplete');
        buttons[2].classList.add('btnEdit');
        buttons[0].classList.add('icon-delete');
        buttons[1].classList.add('icon-ok');
        buttons[2].classList.add('icon-edit');
        buttons[0].dataset.btn = "delete";
        buttons[1].dataset.btn = "complete";
        buttons[2].dataset.btn = "edit";
        buttons[2].dataset.edited = "false";

        //wrzucam do diva
        for (let i = 0; i < 3; i++) {
            btnDiv.appendChild(buttons[i]);
        }
        //daje mu klase
        btnDiv.classList.add('btn');

        //tworze pojemniki na ikony i dodaje im klasę
        //i od razu wrzucam po kolei do głównego diva
        for (let i = 0; i < lvl; i++) {
            lvlsI[i] = document.createElement('i');
            lvlsI[i].classList.add('icon-lvl');
            lvlDiv.appendChild(lvlsI[i]);
        }
        //daje mu klasę
        lvlDiv.classList.add('lvl');
        descriptionP.classList.add('description');
        taskDiv.classList.add('grid-task');

        //przypisuję id
        taskDiv.dataset.id = id;

        //przypisuję do opowiednich elementów zawartości
        titleH1.innerText = title;
        dateH2.innerText = dateTo;
        dateH3.innerText = dateFrom;
        descriptionP.innerText = description;

        //wrzucam gotowe elementy do głównego kontenera
        taskDiv.appendChild(titleH1);
        taskDiv.appendChild(dateH2);
        taskDiv.appendChild(dateH3);
        taskDiv.appendChild(lvlDiv);
        taskDiv.appendChild(descriptionP);
        taskDiv.appendChild(btnDiv);

        if (done === true) {
            taskDiv.style.backgroundColor = 'rgba(255, 228, 217, 0.5)';
            titleH1.style.textDecoration = 'line-through';
        } else {
            taskDiv.style.backgroundColor = "transparent";
            titleH1.style.textDecoration = 'none';
        }
        //dodaje nowe zadanie do maina
        $('main').hide().append(taskDiv);
    }


    //tablica  na biekty
    var tasks = [];

    //konstruktor zadania
    var Task = function(id, title, dateFrom, dateTo, lvl, description, done) {
        this.id = id;
        this.title = title;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.lvl = lvl;
        this.description = description;
        this.done = done;
    }

    function getId() {
        var maxId = 0;
        document.querySelectorAll('.grid-task').forEach(function(task) {

            if (maxId < parseInt(task.dataset.id) + 1) {
                maxId = parseInt(task.dataset.id) + 1;
            }

        });
        return maxId;
    }

    btnAdd.addEventListener('click', function(e) {

        e.preventDefault();

        var task = new Task(getId(), title.value, dateNow(), date.value, lvl, description.value, false);
        tasks.push(task);

        saveTasks(tasks);

        addedTask(task.id, task.title, task.dateFrom, task.dateTo, task.lvl, task.description, task.done);

        $('main').animate({
            width: "toggle"
        });

        //resetuje wartości z formularza
        //z pół formularza
        title.value = "";
        date.value = "";
        description.value = "";
        //zwijam formularz
        form.slideUp();
        formContent.slideUp();
        //ukrywam ikony
        for (let i = 0; i < 3; i++) iconOk.eq(i).hide();
        //resetuje lvl
        document.querySelectorAll('#boxLvl > input')[4].checked = true;
        //resetuje licznik znaków
        document.querySelector('form > div p').innerText = 0
        //dezaktyruję przycisk dodawania
        validation();
        //resetuję walidację
        valTitle = false;
        valDate = false;
        valdescription = false;
    })

    // Przyciski: delete, complete, edit
    let body = document.querySelector("body");

    body.addEventListener("click", function(e) {

        if (e.target.dataset.btn === "delete") {

            let taskEl = e.target.parentElement.parentElement,
                main = taskEl.parentElement,
                taskId = taskEl.dataset.id;

            for (let i = 0; i < tasks.length; i++) {

                if (tasks[i].id == taskId) {

                    //kasuje obiekt w tablicy
                    delete tasks[i];

                    tasks = tasks.filter(function(task) {
                        return (task !== 'empty');
                    })
                    //kasuję html z taskiem
                    main.removeChild(taskEl);

                }

            }

            //zapisuję zmiany w pamięci
            saveTasks(tasks);

        }
        if (e.target.dataset.btn === "complete") {

            let taskEl = e.target.parentElement.parentElement,
                main = taskEl.parentElement,
                taskId = taskEl.dataset.id,
                h1 = taskEl.firstElementChild;

            console.log(h1);
            for (let i = 0; i < tasks.length; i++) {

                if (tasks[i].id == taskId) {

                    if (tasks[i].done == false) {
                        tasks[i].done = true;
                        taskEl.style.backgroundColor = 'rgba(255, 228, 217, 0.5)';
                        h1.style.textDecoration = "line-through";
                    } else {
                        tasks[i].done = false;
                        taskEl.style.backgroundColor = "transparent";
                        h1.style.textDecoration = "none";
                    }
                }
            }

            saveTasks(tasks);

        }

        if (e.target.dataset.btn === "edit") {

            let taskEl = e.target.parentElement.parentElement,
                taskId = taskEl.dataset.id,
                title = taskEl.firstElementChild,
                description = taskEl.querySelector('p'),
                btnEdit = taskEl.querySelector('div.btn > .btnEdit'),
                btnDelete = taskEl.querySelector('div.btn > .btnDelete'),
                btnComplete = taskEl.querySelector('div.btn > .btnComplete'),
                idTime = '',
                valDescription = true,
                valTitle = true;

            if (btnEdit.dataset.edited === "false") {

                btnEdit.classList.add('edit');
                btnEdit.dataset.edited = 'true';
                btnDelete.setAttribute('disabled', 'disabled');
                btnComplete.setAttribute('disabled', 'disabled');
                title.setAttribute('contentEditable', true);
                description.setAttribute('contentEditable', true);
                title.style.boxShadow = "0 0 20px 0 #BE0F64";
                description.style.boxShadow = "0 0 20px 0 #BE0F64"

            } else {

                //walidacja
                let lengthDes = description.innerText.length,
                    lengthTitle = title.innerText.length;

                //opisu
                if (lengthDes < 100 && lengthDes > 10) {
                    valDescription = true;
                } else {
                    valDescription = false;
                }

                //tytułu
                if (lengthTitle < 25 && lengthTitle > 5) {
                    valTitle = true;
                } else {
                    valTitle = false;
                }

                //sprawdzenie
                if (!(valTitle && valDescription)) {
                    clearTimeout(idTime);
                    description.classList.add('tooltipDescription');
                    title.classList.add('tooltipTitle');

                    idTime = setTimeout(function() {
                        description.classList.remove('tooltipDescription');
                        title.classList.remove('tooltipTitle');
                    }, 4000);

                } else {

                    for (let i = 0; i < tasks.length; i++) {

                        if (tasks[i].id == taskId) {
                            tasks[i].description = description.innerText;
                            tasks[i].title = title.innerText;
                        }
                    }
                    saveTasks(tasks);

                    btnEdit.classList.remove('edit');
                    btnEdit.dataset.edited = 'false';
                    btnDelete.removeAttribute('disabled');
                    btnComplete.removeAttribute('disabled');
                    title.setAttribute('contentEditable', false);
                    description.setAttribute('contentEditable', false);
                    title.style.boxShadow = "none";
                    description.style.boxShadow = "none";
                }

            }


        }

    });

    function addAllTask() {

        for (let i = 0; i < tasks.length; i++) {
            addedTask(tasks[i].id, tasks[i].title, tasks[i].dateFrom, tasks[i].dateTo, tasks[i].lvl, tasks[i].description, tasks[i].done);
        }

        $('main').animate({
            width: "toggle"
        }, 2000);

    }

    function showAllTasksFromStorage() {

        //pobieram z pamięci
        tasks = downloadTasks();

        if (tasks !== null) {

            addAllTask();

        } else {
            tasks = [];
        }

    }

    showAllTasksFromStorage();

    //---------------------------- Sortowanie ---------------------------------//

    var btnSortLvl = document.querySelector('.menu > ul > li:nth-child(1)'),
        btnSortDone = document.querySelector('.menu > ul > li:nth-child(2)'),
        btnShowAll = document.querySelector('.menu > ul > li:nth-child(3)');

    //event dla sortowania
    btnSortLvl.addEventListener('click', function() {

        clearList();

        if (sort === false) {
            sortDown();
        } else {
            sortUp();
        }

        addAllTask();

    })

    var done = true;
    //event dla pokazywania zrobionych i na odwrót
    btnSortDone.addEventListener('click', function() {
        if (done === true) {
            toggleShowTask(true)
            done = false;
        } else {
            toggleShowTask(false);
            done = true;
        }
    })

    //event dla pokazania wszytskich na liście
    btnShowAll.addEventListener('click', function() {
        showAllTask();
    })

    //funkcja czyszczonca listę
    function clearList() {

        var main = document.querySelector('main'),
            allTask = document.querySelectorAll('.grid-task');

        for (let i = 0; i < allTask.length; i++) {
            main.removeChild(allTask[i]);
        }

    }

    //zmienna sterująca
    var sort = false;

    function sortDown() {

        tasks.sort(function(min, max) {
            return max.lvl - min.lvl;
        });

        sort = true;

    }

    function sortUp() {

        tasks.sort(function(min, max) {
            return min.lvl - max.lvl;
        });

        sort = false;

    }

    //funkcja pokazująca całą listę
    function showAllTask() {

        var elAllTasks = $('.grid-task');
        for (let i = 0; i < tasks.length; i++) {
            elAllTasks.eq(i).hide();
        }
        elAllTasks.fadeIn();

    }

    function toggleShowTask(bool) {

        var elAllTasks = $('.grid-task');

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].done !== bool) {
                elAllTasks.eq(i).fadeOut();
            } else {
                elAllTasks.eq(i).fadeIn();
            }
        }
        if (bool === true) {
            btnSortDone.innerText = "Show to do";
        } else {
            btnSortDone.innerText = "Show completed";
        }

    }

    var btnAllDeleteDone = document.querySelector('footer > button'),
        actionDiv = document.querySelector("#actionDiv");

    btnAllDeleteDone.addEventListener('click', function() {

        var elAllTasks = document.querySelectorAll('.grid-task'),
            main = document.querySelector('main');

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].done == true) {
                delete tasks[i];
                main.removeChild(elAllTasks[i]);
            }
        }

        tasks = tasks.filter(function(task) {
            return (task !== 'empty');
        })
        //latajacy kot
        actionDiv.classList.remove("flyingCat");
        actionDiv.classList.add("flyingCat");

        saveTasks(tasks);
    })

});
