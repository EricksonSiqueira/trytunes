import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import FavoriteMusicCard from '../components/FavoriteMusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: true,
    };

    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.removeFavoriteSongs = this.removeFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  setLoading(value) {
    this.setState({ loading: value });
  }

  removeFavoriteSongs(songRemovedId) {
    const { favoriteSongs } = this.state;
    const newFavoriteSongs = favoriteSongs
      .filter((song) => song.trackId !== songRemovedId);
    this.setState(() => ({
      favoriteSongs: [...newFavoriteSongs],
    }));
  }

  async fetchFavoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState(() => ({
      favoriteSongs: [...favoriteSongs],
      loading: false,
    }));
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <article>
            {favoriteSongs.map((song) => (
              <FavoriteMusicCard
                key={ song.trackId }
                music={ song }
                setLoading={ this.setLoading }
                removeFavoriteSongs={ this.removeFavoriteSongs }
              />
            ))}
          </article>
        )}
      </div>
    );
  }
}

export default Favorites;
