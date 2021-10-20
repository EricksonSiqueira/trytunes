import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artistName: '',
      collectionName: '',
      loading: true,
    };
    this.fetchMusics = this.fetchMusics.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
  }

  async fetchMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id: albumId } = params;

    const fetchedMusics = await getMusics(albumId);
    const { artistName, collectionName } = fetchedMusics[0];
    const tracks = fetchedMusics.filter((obj) => obj.wrapperType === 'track');
    console.log(tracks);
    this.setState({ musics: tracks, artistName, collectionName, loading: false });
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
              {musics.map((music) => <MusicCard { ...music } key={ music.trackId } />)}
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
