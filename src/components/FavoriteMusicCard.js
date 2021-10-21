import React from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';

class FavoriteMusicCard extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    const { music, setLoading, removeFavoriteSongs } = this.props;
    const { trackId } = music;
    const { checked } = target;

    setLoading(true);
    if (!checked) {
      await removeSong(music);
      await removeFavoriteSongs(trackId);
    }
    setLoading(false);
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId, artworkUrl60 } = music;
    return (
      <div>
        <img src={ artworkUrl60 } alt={ trackName } />
        <span>
          {trackName}
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteSong">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favoriteSong"
            id="favoriteSong"
            checked
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

FavoriteMusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  setLoading: PropTypes.func.isRequired,
  removeFavoriteSongs: PropTypes.func.isRequired,
};

export default FavoriteMusicCard;
