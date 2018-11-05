// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour").on("click", function(event) {
      console.log("clicked");
      var id = $(this).data("id");
  
      var nowDevoured = {
        devoured: true
      };
  
      // Send the PUT request.
      $.ajax("/api/burger/" + id, {
        type: "PUT",
        data: nowDevoured
      }).then(
        function() {
          console.log("changed devoured to ", true);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("fired")
      var newBurger = {
        burger_name: $("#newBurger").val().trim(),
        devoured: false
      };
      console.log(newBurger)
      // Send the POST request.
      $.ajax("/api/burger", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  