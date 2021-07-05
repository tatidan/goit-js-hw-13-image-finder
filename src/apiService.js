export default class ApiService {
  constructor() {
    this.API_KEY = "73e9137b2a364bbb6dc0bcf09aa07979";
    this.BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";
    this.page = 1;
  }

  fetchMovies() {
    const url = `${this.BASE_URL}?api_key=${this.API_KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Something went wrong");
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
