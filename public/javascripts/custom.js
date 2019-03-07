

$(document).ready(function () {
    $("#nav-username-li").hide()
    $("#log-out-li").hide()
    function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? decodeURI(value[1]) : null;
    }
    let username = getCookie("username")
    function displayNav() {
        if(username) {
            $("#nav-username-li").show()
            $("#nav-username").text(username)
            $("#log-out-li").show()
        }
    }
    displayNav()
    $("#log-out-li").click(() => {
        $("#nav-username-li").hide()
        $("#log-out-li").hide()
    });
    $("#censor-alert").hide()
    //save plant function
    $(".save-plant").click(function(e){
        e.preventDefault();
       
        console.log("helloo");
        var $this = $(this);
        $this.off();
        var plantId = $this.data("plantid");

        $.ajax({
            method: "POST",
            url: "/garden",
            data: { plantId:plantId}
          })
            .done(function( result ) {
               if(result.message === "error") {
                    $this.on();
               }
               else {
                $this.html("Saved");
               }
            });

            
         
                
            











            
    });

 











});