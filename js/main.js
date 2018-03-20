// Fetching data from the form and making a new entry
function newStudent() {
    event.preventDefault();

  let rn = $('#rnumber').val();
  let studentDetails = {
    name : $('#fname').val(),
    sect: $('input:radio[name=section]:checked').val(),
    gen: $('input:radio[name=gender]:checked').val()
  }

  let inputDetailsJson = JSON.stringify(studentDetails);
  sessionStorage.setItem(rn, inputDetailsJson);

  let getDetails = sessionStorage.getItem(rn);
  let outputDetailsJson = JSON.parse(getDetails);

  $("tbody").append(`
  <tr>
      <td> ${outputDetailsJson.name} </td>
      <td>${rn}</td>
      <td> ${outputDetailsJson.sect} </td>
      <td> ${outputDetailsJson.gen} </td>
      <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
      <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>
  </tr>`);
}


function deleteStudent() {
  //console.log(this);
  //console.log($(this).parents()[1]);
  //console.log($(sib).html());

  let par = $(this).parents()[1];
  let sib = $(par).children()[1];
  let rn = $(sib).html();

  sessionStorage.removeItem(rn);
  par.remove();
}


function editStudent() {

  let par = $(this).parents()[1];
  let sib = $(par).children();

  //console.log(Object.keys(sib).length);
  for(i = 0; i < Object.keys(sib).length - 3; i++) {
    let vl = $(sib[i]).html();
    $(sib[i]).html(`<input type="text" class="form-control" id=${i} placeholder="Enter Full Name" name="fullname" value= ${vl}>`);

    //console.log(vl);
  }
  $(sib[i]).html(`
    <button type="button" class="btn btn-success" onclick="saveEditing.call(this)"> Save <i class="material-icons tiny"> save </i></button>
    <button type="button" class="btn btn-warning" onclick="cancelEditing()"> Cancel <i class="material-icons tiny"> cancel </i></button>
  `);



}

function saveEditing() {

  let par = $(this).parents()[1];
  let rn = $("#1").val();
  console.log(rn);
  let getDetails = sessionStorage.getItem(rn);

  console.log(sessionStorage.getItem(rn));

  if(getDetails) {
    let outputDetailsJson = JSON.parse(getDetails);

    outputDetailsJson.name = $("#0").val();
    outputDetailsJson.sect = $("#2").val();
    outputDetailsJson.gen = $("#3").val();

    let inputDetailsJson = JSON.stringify(outputDetailsJson);
    sessionStorage.setItem(rn, inputDetailsJson);

    $(par).html(`
        <td> ${outputDetailsJson.name} </td>
        <td>${rn}</td>
        <td> ${outputDetailsJson.sect} </td>
        <td> ${outputDetailsJson.gen} </td>
        <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
        <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>);
    `);
  }
  else {
    //sessionStorage.removeItem(rn);
    let studentDetails = {
      name : $('#0').val(),
      sect: $('#1').val(),
      gen: $('#3').val()
    }

    let inputDetailsJson = JSON.stringify(studentDetails);
    sessionStorage.setItem(rn, inputDetailsJson);

    $(par).html(`
        <td> ${studentDetails.name} </td>
        <td>${rn}</td>
        <td> ${studentDetails.sect} </td>
        <td> ${studentDetails.gen} </td>
        <td> <button type="button" class="btn btn-info" onclick="editStudent.call(this)"> Edit <i class="material-icons tiny"> edit </i></button>
        <button type="button" class="btn btn-danger" onclick="deleteStudent.call(this)"> Delete <i class="material-icons tiny"> delete </i></button> </td>);
    `);
  }
  //console.log(sessionStorage.getItem(rn));
}

function cancelEditing() {



}

//sessionStorage.clear();
