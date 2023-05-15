const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', async function(){
    try{
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch(err){
        alert(err);
    }
    
});

//event binding
document.addEventListener('click',async function(e){
    if (e.target.classList.contains('modal-detail-button')){
        const imdbID = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbID);
        updateUIDetail(movieDetail);
    }
});


//================function=========================

function getMovies (keyword){
    return fetch('http://www.omdbapi.com/?apikey=c20b95fc&s=' + keyword)
        .then(response => {
            if (!response.ok){
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(response => {
            if (response.Response === "False"){
                throw new Error(response.Error)
            }
            return response.Search
        });
}

function updateUI(movies){
    let cards = ''
    movies.forEach(m => {cards += showCards(m)});
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

function getMovieDetail(imdbID){
    return fetch(`http://www.omdbapi.com/?apikey=c20b95fc&i=` + imdbID)
            .then(response => response.json())
            .then(m =>m)
}

function updateUIDetail(m){
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function showCards(m){
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src=${m.Poster} class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-imdbid=${m.imdbID} data-toggle="modal" data-target="#movieDetailModal">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(results){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src=${results.Poster} class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${results.Title} (${results.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : ${results.Director}</strong></li>
                            <li class="list-group-item"><strong>Actors : ${results.Actors}</strong></li>
                            <li class="list-group-item"><strong>Writer : ${results.Wrtiter}</strong></li>
                            <li class="list-group-item"><strong>Plot : ${results.Plot}</strong><br>Test</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}