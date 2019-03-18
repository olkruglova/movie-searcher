
var $data = $('.data').css('display', 'none');
$('.movie-info').css('display', 'none');

function loadData() {

    var $errorText = $('.error-text');
    var $keyword = $('#searcher').val();
    var $movieInfo = $('.movie-info');

    $('.description').css('display', 'none');
    $('.hr-top').css('margin-top', '4%');

    /***********************TMDb AJAX request*************************/

    var TMDbUrl = 'https://api.themoviedb.org/3/search/movie?api_key=08fe9bb5845df49ca15cb554c6dcdc3d&language=en-US&page=1&query=' + $keyword;


    $.ajax({
        dataType: "json",
        url: TMDbUrl,
        method:'GET',             //from TMDb we 'get' JSON data.
        error: function() {
            $errorText.text('Movie information could not be loaded. Please, enter a movie title in search bar.');
            console.log('error');
        }
    }).done(function(data){     //when TMDb API request succeed, then it works.
            console.log("success");
            console.log(data);
            let movies = data.results;
            let $data = $('.data').css('display', 'block');
            let poster, title, ranking, release, overview;
            for (var i=0; i < movies.length; i++) {
                    var movie = movies[i];
                    $data.append('<div id="'+movie.id+'"class="movie-cover"><img class = "image" src = "https://image.tmdb.org/t/p/w200/'+movie.poster_path+'"><br><span class="title">' + movie.title + '</span></div>');
                }
            $('.movie-cover').on('click', function() {
                $('.movie-info').css('display', 'block');
                $(this).css('cursor', 'pointer');
                $data.css('display', 'none');
                $('#nav').css('display', 'none');

                let id = $(this).attr('id');
                for (let j=0; j<movies.length; j++) {
                    let dataId = movies[j].id;
                    if (id == dataId) {
                        $movieInfo.append(`
                            <div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <img class = "image" src = "https://image.tmdb.org/t/p/w200/${movies[j].poster_path}">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="movie-title">${movies[j].title}</div>
                                        <div class="release-info">Date of release: ${movies[j].release_date}</div>
                                        <div class="rating">Rating: ${movies[j].vote_average}/10</div>
                                        <div class="info-txt">${movies[j].overview}</div>
                                    </div>
                                </div>

                                <div class="row">
                                <div class="col-12 btn-box">
                                    <button class="btn btn-success btn-back" onclick="goBack()"><< Back To Search</button>
                                </div>
                                </div>
                            </div>
                        `)
                    }
                }

            });
    });
}


$('.submit').click(function (event) {
    event.preventDefault();
    $('.data').empty();
    $('.data').css('display', 'none');
    loadData();
    $('#searcher').val('');
    $('.error-text').empty();
});

function goBack() {
    $('.movie-info').css('display', 'none');
    $data.css('display', 'block');
    $('#searcher').val('');
    $('.movie-info').empty();
    $('#nav').css('display', 'block');
};