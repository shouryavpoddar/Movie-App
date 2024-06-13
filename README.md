# Movie App

This project is a movie application built with JavaScript, React, and Redux. It uses the Movie Database API to fetch and display movie data.

## Features

- Display trending, new release, and top-rated movies.
- Search for movies.
- View detailed information about a movie, including similar movies, director, writers, and top cast.
- Add and remove movies from a watchlist.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the application.

## Usage

The application provides a user-friendly interface to browse and search for movies. Clicking on a movie will display detailed information about the movie. Users can add movies to their watchlist for easy access later.

## Code Structure

The project is structured into several React components and Redux slices. Here are some key files:

- `src/Home.jsx`: This file contains the Home component which displays the trending, new release, and top-rated movies.
- `src/MoviePage.jsx`: This file contains the MoviePage component which displays detailed information about a selected movie.
- `src/State Manager/homePageSlice.jsx`: This file contains the Redux slice for managing the state of the home page.
- `src/State Manager/watchlistSlice.jsx`: This file contains the Redux slice for managing the watchlist.

## API

The application uses the Movie Database API to fetch movie data. The API key is included in the headers of the fetch requests.

## Dependencies

- react: ^17.0.2
- react-redux: ^7.2.6
- redux: ^4.1.1
- reduxjs/toolkit: ^1.6.2

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)