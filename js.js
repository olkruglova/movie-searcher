
var $data = $('.data').css('display', 'none');

function loadData() {

    var $errorText = $('.error-text');
    var $keyword = $('#searcher').val();
    var $movieInfo = $('.movie-info');

    $('.description').css('display', 'none');
    $('.hr-top').css('margin-top', '1%');
    /***********************TMDb AJAX request*************************/

    var TMDbUrl = 'https://api.themoviedb.org/3/search/movie?api_key=08fe9bb5845df49ca15cb554c6dcdc3d&language=en-US&page=1&query=' + $keyword;
    //'https://api.themoviedb.org/3/search/' + $keyword + '?api_key=08fe9bb5845df49ca15cb554c6dcdc3d&page=1';
    
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
            var movies = data.results;
            var $data = $('.data').css('display', 'block');
           for (var i=0; i < movies.length; i++) {
                var movie = movies[i];
                $data.append('<div class="movie-cover"><img class = "image" src = "https://image.tmdb.org/t/p/w200/'+movie.poster_path+'"><br><span class="title">' + movie.title + '</span></div>');
            }
            $data.append('<div id="buttons"><button>Next >>></button></div>')
            $('.movie-cover').on('click', function() {
                $(this).css('cursor', 'pointer');
                $data.css('display', 'none');
                $movieInfo.append(`
                    <div class="row">
                        <div class="col-md-4">
                            <img class = "image" src = "https://image.tmdb.org/t/p/w200/'`+movie.poster_path+`'">
                        </div>
                        <div class="col-md-8">
                            <span>` + movie.overview + `</span>
                        </div>
                    </div>
                `)
            });
});
}

$('.submit').click(loadData);
/* $('body').catchEnter('.input').on('enterkey',function(ev) { loadData }); */

