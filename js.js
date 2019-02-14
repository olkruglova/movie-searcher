function loadData() {

    var $result = $('#search-result');
    var $errorText = $('.error-text');
    var $data = $('.data');
    /* var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting'); */

    // clear out old data before new request
    /* $wikiElem.text("");
    $nytElem.text(""); */

    // load streetview
    /* var gMapsUrl ='http://maps.googleapis.com/maps/api/streetview?size=900x700&location='
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    $body.append('<img class="bgimg" src="' + gMapsUrl + address + '&key=AIzaSyCPSWk9Gj32S52481URJOAI3kcqgx3KYzk&v=3">');

    $greeting.text('So, you want to live at ' + address + '?'); */

    /***********************NYtimes AJAX request*************************/

    var TMDbUrl = 'https://api.themoviedb.org/3/movie/550?api_key=08fe9bb5845df49ca15cb554c6dcdc3d'
    /* 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    nytimesUrl += '?' + $.param({
    'q': cityStr,
    'sort': "newest",
    'api-key': "HBYuLY4wAQQEvfHkz0NzD4Edpz4Gw79I"
    }); */


    $.ajax({
        dataType: "json",
        url: TMDbUrl,
        method:'GET',             //from TMDb we 'get' JSON data. 
        error: function() {
            $errorText.text('Movie information could not be loaded');
            console.log('error');
        }
    }).done(function(data){     //when TMDb API request succeed, then it works.
            console.log("success");
            console.log(data);
            /* article = data.response.docs; */
            $data.append('<img class = "image" src = "https://image.tmdb.org/t/p/w500/'+data.poster_path+'"> <span class="title">' + data.title + '</span>');
            });
    }

$('.submit').click(loadData);