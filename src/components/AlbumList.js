import React from 'react';
import PropTypes from 'prop-types';
import AlbumPreview from './AlbumPreview';

class AlbumList extends React.Component {
  creatAlbumComponent(album) {
    const {
      artistName,
      collectionName,
      artworkUrl100,
      collectionId,
    } = album;

    return (
      <AlbumPreview
        key={ collectionId }
        imgUrl={ artworkUrl100 }
        name={ artistName }
        collection={ collectionName }
      />
    );
  }

  render() {
    const { albums, artistName } = this.props;
    return (
      <section>
        <h2>{`Resultado de albúns de ${artistName}`}</h2>
        <section className="albums-list">
          {albums.map(this.creatAlbumComponent)}
        </section>
      </section>
    );
  }
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumList;
