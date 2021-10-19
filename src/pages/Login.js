import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonIsDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        this.setState({ buttonIsDisable: this.validateButton() });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    createUser({ name });
  }

  validateButton() {
    const { name } = this.state;
    const minInputCharacters = 3;
    let buttonShouldBeDisable = true;
    if (name.length > minInputCharacters) {
      buttonShouldBeDisable = false;
    }

    return buttonShouldBeDisable;
  }

  render() {
    const { name, buttonIsDisable } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <div>
            <label htmlFor="name">
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ buttonIsDisable }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
