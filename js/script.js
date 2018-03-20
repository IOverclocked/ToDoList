document.addEventListener('DOMContentLoaded', function(e) {

    var btnShowForm = $('i.icon-add'),
        form = $('header form'),
        formContent = $('header form > div');

    //event dla pokazywania i ukrywania formularza
    btnShowForm.on('click', function(){

        form.animate({
            width: "toggle"
        })
        formContent.slideToggle("slow");

    });




});
