const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', function(){
    const inputKeyword = document.querySelector('.input-keyword')

    fetch('http://www.omdbapi.com/?apikey=c20b95fc&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = ''
            movies.forEach(m => {cards += showCards(m)});

            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

            //after Show detail clicked
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            modalDetailButton.forEach(btn => btn.addEventListener('click', function(){
                const imdbID = this.dataset.imdbid;
                fetch(`http://www.omdbapi.com/?apikey=c20b95fc&i=` + imdbID)
                    .then(response => response.json())
                    .then(m =>{
                        const movieDetail = showMovieDetail(m);
                        const modalBody = document.querySelector('.modal-body');
                        modalBody.innerHTML = movieDetail;
                    })
            }));

        })
})

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