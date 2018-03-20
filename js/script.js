document.addEventListener('DOMContentLoaded', function(e) {

    var btnShowForm = $('i.icon-add'),
        form = $('header form').hide(),
        formContent = $('header form > div').hide();

    //event dla pokazywania i ukrywania formularza
    btnShowForm.on('click', function(){
        form.animate({
            width: "toggle"
        })
        formContent.slideToggle("slow");

    });

    //walidacja formularza
    var title = $('#title'),
        date = $('#date'),
        lvl = $('select'),
        discription = $('#discription'),
        btnAdd = $('form button'),
        iconOk = $('form > div i.icon-done').hide();

    var valTitle = false,
        valDate = false,
        valDiscrition = false;

    function validationOK(val1, val2, val3){

        if(val1 && val2 &&  val3){
            btnAdd.attr('disabled', false);
        } else {
            btnAdd.attr('disabled', 'disabled');
        }

    }

    //walidacja tytułu
    title.on('keyup click', function(){

        if(title.val().length < 25 && title.val().length > 5){
            iconOk.eq(0).fadeIn();
            valTitle = true;
        } else {
            iconOk.eq(0).fadeOut();
            valTitle = false;
        }

        validationOK(valTitle, valDate, valDiscrition);

    })

    //walidacja daty
    date.on('click blur', function(){

        var dateNow = new Date(), //pobierz dzisiejszą datę
            deadline = Date.parse($(this).val()); //sprasuj date zaznaczoną

        dateNow = Date.parse(dateNow); //sprasuj datę dzisiejszą

        //sprawdź czy ktoś nie zaznaczył terminu na dzisiaj lub wczoraj;
        if((deadline-dateNow) > 0){
            iconOk.eq(1).fadeIn();
            valDate = true;
        } else {
            iconOk.eq(1).fadeOut();
            valDate = false;
        }

        validationOK(valTitle, valDate, valDiscrition);

    })

    //walidacja opisu
    discription.on('keyup', function(){

        var counter = discription.val().length;
        $('form > div p').text(counter);

        if(counter < 100 && counter > 10 ){
            iconOk.eq(2).fadeIn();
            valDiscrition = true;
        } else {
            iconOk.eq(2).fadeOut();
            valDiscrition = false;
        }

        validationOK(valTitle, valDate, valDiscrition);

    })

    btnAdd.on('submit',function(e){

        alert("spoko");

        e.preventDefault();
    })







});
