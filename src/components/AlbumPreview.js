import React from 'react';
import PropTypes from 'prop-types';

class AlbumPreview extends React.Component {
  render() {
    const { imgUrl, name, collection } = this.props;
    return (
      <article>
        <img src={ imgUrl } alt={ name } />
        <p>{name}</p>
        <p>{collection}</p>
      </article>
    );
  }
}

AlbumPreview.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
};

export default AlbumPreview;
