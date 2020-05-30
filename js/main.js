"use strict";

// Global Variables

var old_rn;

$(document).ready(function () {
    $("#form-reset").submit(function () {
        $('html, body').animate({
            scrollTop: $("#details").offset().top
        }, 1500);
    });
});

// Fetching data from the form and making a new entry
// Function for creating a new Student
var newStudent = function newStudent() {
    // Preventing default event (Page Reload)
    event.preventDefault();

    // Fetching values from the form
    var rn = $('#rnumber').val();
    var studentDetails = {
        name: $('#fname').val(),
        sect: $('input:radio[name=section]:checked').val(),
        gen: $('input:radio[name=gender]:checked').val()

        // Converting the object into jSON
    };var inputDetailsJson = JSON.stringify(studentDetails);
    // Storing the details in session storage
    sessionStorage.setItem(rn, inputDetailsJson);

    // Fetching the details from session storage
    var getDetails = sessionStorage.getItem(rn);
    // Converting the received output to jSON
    var outputDetailsJson = JSON.parse(getDetails);

    // Appending details in the table
    $("tbody").append("\n      <tr>\n          <td>" + outputDetailsJson.name + "</td>\n          <td>" + rn + "</td>\n          <td>" + outputDetailsJson.sect + "</td>\n          <td>" + outputDetailsJson.gen + "</td>\n          <td> <button type=\"button\" class=\"btn btn-info edit\" onclick=\"editStudent.call(this)\"> Edit <i class=\"material-icons tiny\"> edit </i></button>\n          <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteStudent.call(this)\"> Delete <i class=\"material-icons tiny\"> delete </i></button> </td>\n      </tr>");

    // Making the record table visible
    if ($("#details").hasClass("collapse")) {
        $("#details").removeClass("collapse");
    }

    // Resetting the form
    $("#form-reset").trigger("reset");
};

// Calling the function on form submission
$("form").submit(function () {
    newStudent();
});

// Function for deleting a Student entry
function deleteStudent() {

    // Storing the references of elements
    var par = $(this).parents()[1];
    var sib = $(par).children()[1];
    var rn = $(sib).html();

    // Removing the selected Roll number's entry from session storage
    sessionStorage.removeItem(rn);
    // Removing the selected Roll number's entry from the table
    par.remove();
}

// Function for editing Student entry
function editStudent() {

    // Storing the references of elements
    var par = $(this).parents()[1];
    var sib = $(par).children();
    var index;
    old_rn = $(sib[1]).html();

    // Looping through the columns of the table
    for (var i = 0; i < Object.keys(sib).length - 3; i++) {
        var vl = $(sib[i]).html();
        $(sib[i]).html("<input type=\"text\" class=\"form-control\" id=\"" + old_rn + i + "\" placeholder=\"Enter Details\" name=\"details\" value=\"" + vl + "\">");
        index = i;
    }
    $(sib[index + 1]).html("\n    <button type=\"button\" class=\"btn btn-success\" onclick=\"saveEditing.call(this, old_rn)\"> Save <i class=\"material-icons tiny\"> save </i></button>\n    <button type=\"button\" class=\"btn btn-warning\" onclick=\"cancelEditing.call(this)\"> Cancel <i class=\"material-icons tiny\"> cancel </i></button>\n  ");

    // Disabling all editing buttons of all other entries
    if ($(".edit").prop("disabled", false)) {
        $(".edit").prop("disabled", true);
    }
}

// Function for saving edted Student a entry
function saveEditing(old_rn) {

    // Storing the references of elements
    var par = $(this).parents()[1];
    var rn = $("#" + old_rn + "1").val();

    // Fetching the details from session storage
    var getDetails = sessionStorage.getItem(rn);

    // Editing the same entry if present
    if (getDetails) {
        // Converting the received output to jSON
        var outputDetailsJson = JSON.parse(getDetails);

        // Updating values
        outputDetailsJson.name = $("#" + old_rn + "0").val();
        outputDetailsJson.sect = $("#" + old_rn + "2").val();
        outputDetailsJson.gen = $("#" + old_rn + "3").val();

        // Converting the object into jSON
        var inputDetailsJson = JSON.stringify(outputDetailsJson);
        // Storing the details in session storage
        sessionStorage.setItem(rn, inputDetailsJson);

        // Appending the updated details in the table
        $(par).html("\n        <td>" + outputDetailsJson.name + "</td>\n        <td>" + rn + "</td>\n        <td>" + outputDetailsJson.sect + "</td>\n        <td>" + outputDetailsJson.gen + "</td>\n        <td> <button type=\"button\" class=\"btn btn-info edit\" onclick=\"editStudent.call(this)\"> Edit <i class=\"material-icons tiny\"> edit </i></button>\n        <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteStudent.call(this)\"> Delete <i class=\"material-icons tiny\"> delete </i></button> </td>);\n    ");
    }
    // Creating a new entry if roll no. not present
    else {
            // Removing the old entry
            sessionStorage.removeItem(old_rn);
            // Creating a new entry by fetching values from the form
            var studentDetails = {
                name: $("#" + old_rn + "0").val(),
                sect: $("#" + old_rn + "2").val(),
                gen: $("#" + old_rn + "3").val()

                // Converting the object into jSON
            };var _inputDetailsJson = JSON.stringify(studentDetails);
            // Storing the details in session storage
            sessionStorage.setItem(rn, _inputDetailsJson);

            // Appending the updated details in the table
            $(par).html("\n        <td>" + studentDetails.name + "</td>\n        <td>" + rn + "</td>\n        <td>" + studentDetails.sect + "</td>\n        <td>" + studentDetails.gen + "</td>\n        <td> <button type=\"button\" class=\"btn btn-info edit\" onclick=\"editStudent.call(this)\"> Edit <i class=\"material-icons tiny\"> edit </i></button>\n        <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteStudent.call(this)\"> Delete <i class=\"material-icons tiny\"> delete </i></button> </td>\n    ");
        }

    // Disabling all editing buttons of all other entries
    if ($(".edit").prop("disabled", true)) {
        $(".edit").prop("disabled", false);
    }
}

// Function for canceling the edting of a Student entry
function cancelEditing() {

    // Storing the references of elements
    var par = $(this).parents()[1];
    var rn = $("#" + old_rn + "1").val();

    // Fetching the details from session storage
    var getDetails = sessionStorage.getItem(rn);
    // Converting the received output to jSON
    var outputDetailsJson = JSON.parse(getDetails);

    // Appending the updated details in the table
    $(par).html("\n    <td>" + outputDetailsJson.name + "</td>\n    <td>" + rn + "</td>\n    <td>" + outputDetailsJson.sect + "</td>\n    <td>" + outputDetailsJson.gen + "</td>\n    <td> <button type=\"button\" class=\"btn btn-info edit\" onclick=\"editStudent.call(this)\"> Edit <i class=\"material-icons tiny\"> edit </i></button>\n    <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteStudent.call(this)\"> Delete <i class=\"material-icons tiny\"> delete </i></button> </td>\n  ");

    // Converting the object into jSON
    var inputDetailsJson = JSON.stringify(outputDetailsJson);
    // Storing the details in session storage
    sessionStorage.setItem(rn, inputDetailsJson);

    // Disabling all editing buttons of all other entries
    if ($(".edit").prop("disabled", true)) {
        $(".edit").prop("disabled", false);
    }
}

// Function to delete all existing records
var deleteAll = function deleteAll() {

    // Emptying the existing html of the table
    $("tbody").html("");
    // Clearing the existing session storage
    sessionStorage.clear();
};