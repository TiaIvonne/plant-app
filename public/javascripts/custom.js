
$(document).ready(function () {
    //display username and logout button only if user it's connected
    $("#nav-username").hide();
    $("#nav-logout").hide();
        function getCookie(name) {
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value != null) ? decodeURI(value[1]) : null;
        }
        let username = getCookie("username");
            function displayNav() {
                if(username) {
                    $("#nav-username").show();
                    $("#nav-username").text("Hello! " + username);
                    $("#nav-logout").show();
                }
            }
        displayNav();
        $("#nav-logout").click(() => {
            $("#nav-username").hide();
            $("#nav-logout").hide();
        });
     

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