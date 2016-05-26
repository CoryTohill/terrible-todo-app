$(() => {
  const API_URL = "https://terrrible-todo-app.firebaseio.com/task";

  function addItemToTable (item, id) {
    let disabled = "";
    if (item.completed) {
      disabled = "disabled";
    }

    const row =`<tr data-id="${id}">
      <td>${item.task}</td>
      <td>
        <button class="btn btn-success complete" ${disabled}>Complete</button>
        <button class="btn btn-danger delete">Delete</button>
      </td>
    </tr>`;

    $('tbody').append(row);
  }

  // READ: GET data from firebase and display in table
  $.get(`${API_URL}.json`).done((data) => {
    if (data) {
      Object.keys(data).forEach((id) => {
        addItemToTable(data[id], id);
      });
    }
  });

  // CREATE: form submit event to POST data to firebase
  $('.new form').submit(() => {
    const userText = $('.userText').val();
    $.post(`${API_URL}.json`, JSON.stringify({ task: userText, completed: false}));
    // TODO: make this not refresh page
    addItemToTable(null, data.name);
    // return false;
  });

  // DELETE: click event on delete to send DELETE to firebase
  $('tbody').on("click", ".delete", (e) => {
    const row = $(e.target).closest('tr');
    const id = $(e.target).closest('tr').data('id');
    $.ajax({
      url: `${API_URL}/${id}.json`,
      method: 'DELETE'
    }).done(() => {
      row.remove();
    });
  });

  // UPDATE: click event on complete to send PUT/PATCH to firebase
  $('tbody').on("click", ".complete", (e) => {
    const id = $(e.target).closest('tr').data('id');
    $(e.target).prop("disabled", true);
    $.ajax({
      url: `${API_URL}/${id}.json`,
      method: "PATCH",
      data: JSON.stringify({completed: true})
    });
  });

  firebase.initializeApp({
    apiKey: "AIzaSyBEgZ4sdyeVhuwazXiVsZMdVgZzThFNhas",
    authDomain: "terrrible-todo-app.firebaseapp.com",
    databaseURL: "https://terrrible-todo-app.firebaseio.com",
    storageBucket: "terrrible-todo-app.appspot.com",
  });
});

// TODO:


