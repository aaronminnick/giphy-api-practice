import $ from 'jquery';

$(document).ready(function() {
  $('#input-form').on('submit', (event) => {
    event.preventDefault();
    let request = new XMLHttpRequest();

    let searchWord = $('#search-word').val();
    $('#search-word').val('');
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=${process.env.GIPHY_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response);
        addGif(response);
      }
    };

    request.open('GET', url, true);
    request.send();

    function addGif(response) {
      $('#output').prepend('<img src="' + response.data[0].images.original.url + '">');
    }
  });
});