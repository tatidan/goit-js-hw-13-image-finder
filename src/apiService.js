export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchGalleryCards() {
    const options = {
      BASE_URL: 'https://pixabay.com/api/',
      API_KEY: '22378811-a58ebb6e61fd3d97b045a8b50',
    };

    const url = `${options.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${options.API_KEY}`;
    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Something went wrong');
      })
      .then(data => {
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
