$(() => {
  const API_URL = "https://terrrible-todo-app.firebaseio.com/task.json";

// READ: GET data from firebase and display in table
  $.get(API_URL).done((data) => {
    if (data) {
      Object.keys(data).forEach((key) => {
        addItemToTable(data[key]);
      });
    }
  });

  $('form').submit(() => {
    $.post(API_URL, JSON.stringify({ task: "I was posted!" }));
    // TODO: grab the form text
    // TODO: make this nor refresh page
  });
});

// TODO:
// CREATE: form submit event to POST data to firebase
// DELETE: click event on delete to send DELETE to firebase
// UPDATE: click event on complete to send PUT/PATCH to firebase


function addItemToTable (item) {
  const row =`<tr>
    <td>${item.task}</td>
    <td>
      <button class="btn btn-success">Complete</button>
      <button class="btn btn-danger">Delete</button>
    </td>
  </tr>`;

  $('tbody').append(row);
}
