import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistInput: '',
      buttonIsDisable: true,
    };

    this.validateButton = this.validateButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        this.setState({ buttonIsDisable: this.validateButton() });
      });
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
    const { artistInput, buttonIsDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <div>
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
          </div>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonIsDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
