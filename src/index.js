import $ from 'jquery';

$(document).ready(function() {
  $('#input-form').on('submit', (event) => {
    event.preventDefault();
    let request = new XMLHttpRequest();

    let searchWord = $('#search-word').val();
    $('#search-word').val('');
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=${process.env.GIPHY_KEY}`;
    
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        addGif(response);
      }
    };

    request.open('GET', url, true);
    request.send();

    function addGif(response) {
      $('#output').prepend('<img src="' + response.data[0].images.original.url + '">');
    }
  });

  let nextRequest = new XMLHttpRequest();
  const nextUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_KEY}`;

  nextRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      trendGif(response);
    }
  };

  nextRequest.open("GET", nextUrl, true);
  nextRequest.send();

  function trendGif(response) {
    for(let i=0; i < 4; i++) {
      $("#trending").prepend('<img src="' + response.data[i].images.original.url + '">');
    }
  }
});