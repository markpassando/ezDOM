// Execute when the DOM has loaded
$ez(() => {
  // Add Weather Widget
  $ez('#weather-submit').on('click', (e) => {
    e.preventDefault();
    console.log("fire off");
    let query = $ez('#weather-input').nodes[0].value;
    $ez('#weather-input').nodes[0].value = "";

    $ez.ajax({
      method: "GET",
      url:  "http://api.openweathermap.org/data/2.5/weather",
      data: { appid: "6593357a84983f34982acc13f791e08d", q: query },
      success(data) {
        console.log(data);
        const response = JSON.parse(data);
        const temp = Math.round((response.main.temp - 273.15) * 9/5 + 32);
        $ez('#weather').empty();
        $ez('#weather').append(`<div class="city">${response.name}</div>`);
        $ez('#weather').append(`<div class="temp">${temp} &deg; F</div>`);
        $ez('#weather').append(`<div class="forecast">Forecast: ${response.weather[0].main}</div>`);

      },
      error(err) {
        $ez('#weather').empty();
        $ez('#weather').append(`<div>No Results...</div>`);
      }
    });

  });


  // Create Todo Widget
  $ez('#todo-submit').on('click', (e) => {
    e.preventDefault();
    let value = $ez('#todo-input').nodes[0].value;
    $ez('#todo-input').nodes[0].value = "";

    // Valid Todo
    if (value !== '') {
      let todoId = $ez('#todo-list').children().nodes.length;
      $ez('#todo-list').append(`<li id="todo-${todoId}"><div>${value}</div><div><button type="button" class="todo-complete" id="${todoId}">Mark as Complete</button><div></li>`);

      // Mark as Complete
      $ez('.todo-complete').on('click', (e) => {
        e.preventDefault();
        let todoId = $ez(e.currentTarget).attr('id');
        $ez(`#todo-${todoId}`).remove();
      });
    }
  });

  // Set Up Weather Default
  $ez.ajax({
    method: "GET",
    url:  "http://api.openweathermap.org/data/2.5/weather",
    data: { appid: "6593357a84983f34982acc13f791e08d", q: "NY,NY" },
    success(data) {
      const response = JSON.parse(data);
      const temp = Math.round((response.main.temp - 273.15) * 9/5 + 32);

      $ez('#weather').append(`<div class="city">${response.name}</div>`);
      $ez('#weather').append(`<div class="temp">${temp} &deg; F</div>`);
      $ez('#weather').append(`<div class="forecast">Forecast: ${response.weather[0].main}</div>`);

    }
  });

  $ez('.todo-complete').on('click', (e) => {
    e.preventDefault();
    let todoId = $ez(e.currentTarget).attr('id');
    $ez(`#todo-${todoId}`).remove();
  });

});
