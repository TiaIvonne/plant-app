
$(document).ready(function () {

    $(".save-plant").click(function(e){
        e.preventDefault();
       
        console.log("helloo")
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