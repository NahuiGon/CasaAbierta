$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

var aplicacion = new function(){
    this.empleados = document.getElementById("usuarios");

    this.Leer= function(){
        var datos = "";

        
    }
}