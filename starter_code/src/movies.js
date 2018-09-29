/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
function turnHoursToMinutes(moviesArr) {
    var fixedMovies = moviesArr.map(
        function(oneMovie) {
            var durationRe = /((\d+)h)*\s*((\d+)min)*/ig;
            var timeElems = durationRe.exec(oneMovie.duration);
            var tInMinutes = 0;
            if (undefined != timeElems[2]) {
                tInMinutes += parseInt(timeElems[2]) * 60; // hours to minutes
            }
            if (undefined != timeElems[4]) {
                tInMinutes += parseInt(timeElems[4]); // minutes
            }
            // console.log(timeElems);
            // paste computed time in minutes into output
            return Object.assign({}, oneMovie, { duration: tInMinutes });;
        }
    );
    return fixedMovies;
}

// Get the average of all rates with 2 decimals 
// rounded to nearest hundredths ---REDUCE---
function ratesAverage(moviesArr) {
    var rateSum = moviesArr.reduce(function (accum, movie) {
      return accum + Number(movie.rate);
    }, 0);
    return Number((rateSum / moviesArr.length).toFixed(2));
}

// Get the average of Drama Movies
function dramaMoviesRate(movieArr) {
    var dramaMovies = movieArr.filter(
        function (movieElem) {
            return (
             movieElem.genre.indexOf('Drama')
              !== -1);
        }
    );
    var foo = ratesAverage(dramaMovies);
    if (isNaN(foo)) {
      return undefined;
    }
    return foo;
}

// Order by time duration, in growing order
function orderByDuration(moviesArray) {
    moviesArray.sort(
        function (a, b) {
            if (a.duration === b.duration) {
                if (a.title > b.title) {
                    return 1; // If durations same, order alphabetically by Title
                }
            }
            return a.duration - b.duration;
        }
    );
    return moviesArray;
  }

// How many movies did STEVEN SPIELBERG make
function howManyMovies(moviesArr) {
    if (moviesArr.length === 0) return undefined;
 
    var directorMovies = moviesArr.filter(
        function (e) {
            return (
                e.director === 'Steven Spielberg'
                && e.genre.indexOf('Drama') !== -1
            );
        }
    );
    return 'Steven Spielberg directed ' + directorMovies.length + ' drama movies!';
}

// Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    moviesArray.sort(
        function (a, b) {
            return a.title < b.title ? -1 : 1;
        }
    );
    var top20Movies = [];
    var limit = 20;
    if (moviesArray.length < 20) {
      limit = moviesArray.length;
    }
    for (var i = 0; i < limit; i++) {
      top20Movies.push(moviesArray[i].title);
    }
    return top20Movies;
  }

// Best yearly rate average
function bestYearAvg(moviesArr) {
    if (moviesArr.length === 0) return undefined;

    var ratesYear = {};
    var moviesYear = {};
    var averageYear = {};

    moviesArr.forEach(
        function (e) {
            if (ratesYear[e.year]) {
                moviesYear[e.year]++;
                ratesYear[e.year] += parseFloat(e.rate);
                averageYear[e.year] = parseFloat((ratesYear[e.year] / moviesYear[e.year]).toFixed(2));
            } else {
                ratesYear[e.year] = parseFloat(e.rate);
                moviesYear[e.year] = 1;
                averageYear[e.year] = parseFloat(e.rate);
            }
        }
    );
    var year = Object.keys(averageYear).reduce(function (a, b) {
      if (averageYear[a] === averageYear[b]) {
        if (b < a) {
          return b;
        }
        return a;
      } else if (averageYear[a] > averageYear[b]) {
        return a;
      }
      return b;
    });
    return 'The best year was ' + year + ' with an average rate of ' + averageYear[year];
}
