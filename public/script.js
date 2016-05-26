$(() => {
  const API_URL = "https://terrrible-todo-app.firebaseio.com/task";

  function addItemToTable (item, id) {
    const row =`<tr data-id="${id}">
      <td>${item.task}</td>
      <td>
        <button class="btn btn-success complete">Complete</button>
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
    // TODO: handle completed tasks
  });

  // CREATE: form submit event to POST data to firebase
  $('form').submit(() => {
    $.post(`${API_URL}.json`, JSON.stringify({ task: "I was posted!" }));
    // TODO: grab the form text
    // TODO: make this not refresh page
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
});

// TODO:
// UPDATE: click event on complete to send PUT/PATCH to firebase


