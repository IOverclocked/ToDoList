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
            deadline = Date.parse(this.value); //sprasuj date zaznaczoną

        dateNow = Date.parse(dateNow); //sprasuj datę dzisiejszą

        //sprawdź czy ktoś nie zaznaczył terminu na dzisiaj lub wczoraj;
        if((deadline-dateNow) > 0){
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


    var radioAll = document.querySelectorAll('#boxLvl input'),
        lvl = 1;

    //sprawdzenie poziomu
    radioAll.forEach(function(radio){
        radio.addEventListener('click', function(){
            lvl = this.value;
        })
    })

    btnAdd.addEventListener('click', function(e){
        e.preventDefault();

        var task = new Task(tasks.length, title.value, date.value, lvl, discription.value, true)

        for(var key in task){
            console.log(task[key]);
        }

        e.preventDefault();
    })





});
