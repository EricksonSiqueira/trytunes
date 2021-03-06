import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artistName: '',
      collectionName: '',
      loading: true,
      favoritesIds: [],
    };
    this.fetchMusics = this.fetchMusics.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.addFavoriteId = this.addFavoriteId.bind(this);
    this.verifyIfIsFavorite = this.verifyIfIsFavorite.bind(this);
    this.fetchFavorites = this.fetchFavorites.bind(this);
    this.removeFavoriteId = this.removeFavoriteId.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavorites();
  }

  setLoading(value) {
    this.setState({ loading: value });
  }

  async fetchMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id: albumId } = params;

    const fetchedMusics = await getMusics(albumId);
    const { artistName, collectionName } = fetchedMusics[0];

    this.setState({ musics: fetchedMusics, artistName, collectionName, loading: false });
  }

  async fetchFavorites() {
    const favoritesObjList = await getFavoriteSongs();
    const favoritesIdList = favoritesObjList.map((favoriteSong) => favoriteSong.trackId);
    this.setState(() => ({
      favoritesIds: favoritesIdList,
    }));
  }

  addFavoriteId(newId) {
    const { favoritesIds } = this.state;
    const isRepeated = favoritesIds.find((id) => id === newId);

    if (!isRepeated) {
      this.setState((previousState) => ({
        favoritesIds: [...previousState.favoritesIds, newId],
      }));
    }
  }

  removeFavoriteId(idToRemove) {
    const { favoritesIds } = this.state;
    const filteredFavoritesIds = favoritesIds.filter((id) => id !== idToRemove);
    this.setState({ favoritesIds: filteredFavoritesIds });
  }

  verifyIfIsFavorite(id) {
    const { favoritesIds } = this.state;
    const isFavorite = favoritesIds
      .some((favoriteIndex) => favoriteIndex === id);
    return isFavorite;
  }

  render() {
    const { artistName, collectionName, musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <section>
            <section>
              <h2 data-testid="album-name">{collectionName}</h2>
              <h3 data-testid="artist-name">{artistName}</h3>
            </section>
            <section>
              {musics.slice(1)
                .map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                    setLoading={ this.setLoading }
                    addFavoriteId={ this.addFavoriteId }
                    removeFavoriteId={ this.removeFavoriteId }
                    isFavorite={ this.verifyIfIsFavorite(music.trackId) }
                  />))}
            </section>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any),
  params: PropTypes.objectOf(PropTypes.string),
};

Album.defaultProps = {
  id: '1',
  match: {},
  params: { id: '' },
};

export default Album;
