import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumPreview extends React.Component {
  render() {
    const { imgUrl, name, collection, albumId } = this.props;
    return (
      <Link
        to={ `/album/${albumId}` }
        data-testid={ `link-to-album-${albumId}` }
      >
        <img src={ imgUrl } alt={ name } />
        <p>{name}</p>
        <p>{collection}</p>
      </Link>
    );
  }
}

AlbumPreview.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
};

export default AlbumPreview;
