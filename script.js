$(document).ready(function() {
    var contacts = [];
  
    // Function to populate the table with contacts
    function populateTable() {
      var tableBody = $("#contacts-body");
      tableBody.empty();
  
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        var row = $("<tr>");
        row.append($("<td>").text(i + 1));
        row.append($("<td>").text(contact.firstName + " " + contact.lastName));
        row.append($("<td>").text(contact.contactNumber));
        row.append($("<td>").html('<button class="delete-btn" data-index="' + i + '">Delete</button>'));
        tableBody.append(row);
      }
    }
  
    // Function to check if a contact already exists
    function contactExists(firstName, lastName) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if (contact.firstName === firstName && contact.lastName === lastName) {
          return true;
        }
      }
      return false;
    }
  
    // Function to handle form submission
    $("#contact-form").submit(function(event) {
      event.preventDefault();
  
      var firstName = $("#first-name").val().trim();
      var lastName = $("#last-name").val().trim();
      var contactNumber = $("#contact").val().trim();
  
      // Check if inputs are not empty
      if (firstName === "" || lastName === "" || contactNumber === "") {
        alert("All inputs are mandatory.");
        return;
      }
  
      // Check if contact already exists
      if (contactExists(firstName, lastName)) {
        alert("Contact already exists.");
        return;
      }
  
      var contact = {
        firstName: firstName,
        lastName: lastName,
        contactNumber: contactNumber
      };
  
      contacts.push(contact);
      populateTable();
  
      // Clear the form inputs
      $("#first-name").val("");
      $("#last-name").val("");
      $("#contact").val("");
    });
  
    // Function to handle search by name
    $("#search-bar").keyup(function() {
      var searchText = $(this).val().toLowerCase();
      var tableRows = $("#contacts-body tr");
  
      tableRows.each(function() {
        var name = $(this).find("td:eq(1)").text().toLowerCase();
  
        if (name.indexOf(searchText) === -1) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });
  
    // Function to handle delete button click
    $(document).on("click", ".delete-btn", function() {
      var index = $(this).data("index");
      if (confirm("Are you sure you want to delete this contact?")) {
        contacts.splice(index, 1);
        populateTable();
      }
    });
  
    // Function to handle sort by name
    $("#contacts-table th:nth-child(2)").click(function() {
      contacts.sort(function(a, b) {
        var nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
        var nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
  
      populateTable();
    });
  });
  