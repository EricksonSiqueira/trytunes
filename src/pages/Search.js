import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumList from '../components/AlbumList';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistInput: '',
      buttonIsDisable: true,
      loading: false,
      artistName: '',
      albums: [],
    };

    this.validateButton = this.validateButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        this.setState({ buttonIsDisable: this.validateButton() });
      });
  }

  async handleButton(event) {
    event.preventDefault();
    this.setLoading(true);

    const { artistInput: artistName } = this.state;
    this.setState({ artistName });
    this.resetForm();

    const albums = await searchAlbumsAPI(artistName);
    this.setState({ albums });
    this.setLoading(false);
  }

  setLoading(value) {
    this.setState({ loading: value });
  }

  resetForm() {
    const defaultState = {
      artistInput: '',
    };

    this.setState(defaultState);
  }

  validateButton() {
    const { artistInput } = this.state;
    const minCharacteres = 2;
    let buttonShouldBeDisable = true;

    if (artistInput.length >= minCharacteres) {
      buttonShouldBeDisable = false;
    }

    return buttonShouldBeDisable;
  }

  render() {
    const {
      artistInput,
      buttonIsDisable,
      artistName,
      albums,
      loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <section>
            <form>
              <label htmlFor="artist-input">
                Artista
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="artistInput"
                  id="artist-input"
                  placeholder="nome do artista"
                  value={ artistInput }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ buttonIsDisable }
                onClick={ this.handleButton }
              >
                Pesquisar
              </button>
            </form>
            <section>
              {albums.length === 0 ? 'Nenhum álbum foi encontrado' : (
                <>
                  <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
                  <AlbumList
                    albums={ albums }
                    artistName={ artistName }
                  />
                </>)}
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
