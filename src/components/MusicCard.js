import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange() {
    const { music, setLoading, addFavoriteId } = this.props;
    const { trackId } = music;
    setLoading(true);
    addFavoriteId(trackId);
    await addSong(music);
    setLoading(false);
  }

  render() {
    const { music, isFavorite } = this.props;
    const { trackName, previewUrl, trackId } = music;
    return (
      <div>
        <span>
          { trackName }
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
            checked={ isFavorite }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  setLoading: PropTypes.func.isRequired,
  addFavoriteId: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
