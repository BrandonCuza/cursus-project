$(document).ready(function(){

    let closed = true;
    $("#hamburgermenu-button").click(function(event) {
        event.preventDefault();
        if (closed) {
            $("#hamburgermenu-container").css("display", "block");
            closed = false;
        } else {
            $("#hamburgermenu-container").css("display", "none");
            closed = true;
        }
    });
})