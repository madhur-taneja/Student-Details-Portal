// Global Variables
var old_rn;

// Fetching data from the form and making a new entry
// Function for creating a new Student
let newStudent = () => {
    // Preventing default event (Page Reload)
    event.preventDefault();

    // Fetching values from the form
    let rn = $('#rnumber').val();
    let studentDetails = {
        name: $('#fname').val(),
        sect: $('input:radio[name=section]:checked').val(),
        gen: $('input:radio[name=gender]:checked').val()
    }

    // Converting the object into jSON
    let inputDetailsJson = JSON.stringify(studentDetails);
    // Storing the details in session storage
    sessionStorage.setItem(rn, inputDetailsJson);

    // Fetching the details from session storage
    let getDetails = sessionStorage.getItem(rn);
    // Converting the received output to jSON
    let outputDetailsJson = JSON.parse(getDetails);

    // Appending details in the table
    $("tbody").append(`
      <tr>
          <td>${outputDetailsJson.name}</td>
          <td>${rn}</td>
          <td>${outputDetailsJson.sect}</td>
          <td>${outputDetailsJson.gen}</td>
          <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
          <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>
      </tr>`);

    // Making the record table visible
    if($("#details").hasClass("collapse")) {
      $("#details").removeClass("collapse");
    }

    // Resetting the form
    $(".form-horizontal").trigger("reset");
}

// Function for deleting a Student entry
function deleteStudent() {

    // Storing the references of elements
    let par = $(this).parents()[1];
    let sib = $(par).children()[1];
    let rn = $(sib).html();

    // Removing the selected Roll number's entry from session storage
    sessionStorage.removeItem(rn);
    // Removing the selected Roll number's entry from the table
    par.remove();
}

// Function for editing Student entry
function editStudent() {

    // Storing the references of elements
    let par = $(this).parents()[1];
    let sib = $(par).children();
    old_rn = $(sib[1]).html();

    // Looping through the columns of the table
    for (i = 0; i < Object.keys(sib).length - 3; i++) {
        vl = $(sib[i]).html();
        $(sib[i]).html(`<input type="text" class="form-control" id="${i}" placeholder="Enter Details" name="details" value="${vl}">`);
    }
    $(sib[i]).html(`
    <button type="button" class="btn btn-success" onclick="saveEditing.call(this, old_rn)"> Save <i class="material-icons tiny"> save </i></button>
    <button type="button" class="btn btn-warning" onclick="cancelEditing.call(this)"> Cancel <i class="material-icons tiny"> cancel </i></button>
  `);
}

// Function for saving edted Student a entry
function saveEditing(old_rn) {

    // Storing the references of elements
    let par = $(this).parents()[1];
    let rn = $("#1").val();

    // Fetching the details from session storage
    let getDetails = sessionStorage.getItem(rn);

    // Editing the same entry if present
    if (getDetails) {
        // Converting the received output to jSON
        let outputDetailsJson = JSON.parse(getDetails);

        // Updating values
        outputDetailsJson.name = $("#0").val();
        outputDetailsJson.sect = $("#2").val();
        outputDetailsJson.gen = $("#3").val();

        // Converting the object into jSON
        let inputDetailsJson = JSON.stringify(outputDetailsJson);
        // Storing the details in session storage
        sessionStorage.setItem(rn, inputDetailsJson);

        // Appending the updated details in the table
        $(par).html(`
        <td>${outputDetailsJson.name}</td>
        <td>${rn}</td>
        <td>${outputDetailsJson.sect}</td>
        <td>${outputDetailsJson.gen}</td>
        <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
        <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>);
    `);
    }
    // Creating a new entry if roll no. not present
    else {
        // Removing the old entry
        sessionStorage.removeItem(old_rn);
        // Creating a new entry by fetching values from the form
        let studentDetails = {
            name: $('#0').val(),
            sect: $('#2').val(),
            gen: $('#3').val()
        }

        // Converting the object into jSON
        let inputDetailsJson = JSON.stringify(studentDetails);
        // Storing the details in session storage
        sessionStorage.setItem(rn, inputDetailsJson);

        // Appending the updated details in the table
        $(par).html(`
        <td>${studentDetails.name}</td>
        <td>${rn}</td>
        <td>${studentDetails.sect}</td>
        <td>${studentDetails.gen}</td>
        <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
        <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>
    `);
    }
}

// Function for canceling the edting of a Student entry
function cancelEditing() {

    // Storing the references of elements
    let par = $(this).parents()[1];
    let rn = $("#1").val();

    // Fetching the details from session storage
    let getDetails = sessionStorage.getItem(rn);
    // Converting the received output to jSON
    let outputDetailsJson = JSON.parse(getDetails);

    // Appending the updated details in the table
    $(par).html(`
    <td>${outputDetailsJson.name}</td>
    <td>${rn}</td>
    <td>${outputDetailsJson.sect}</td>
    <td>${outputDetailsJson.gen}</td>
    <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
    <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>
  `);

    // Converting the object into jSON
    let inputDetailsJson = JSON.stringify(outputDetailsJson);
    // Storing the details in session storage
    sessionStorage.setItem(rn, inputDetailsJson);

}

// Function to delete all existing records
let deleteAll = () => {

    // Emptying the existing html of the table
    $("tbody").html("");
    // Clearing the existing session storage
    sessionStorage.clear();

}
