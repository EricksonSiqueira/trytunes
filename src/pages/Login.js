import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonIsDisable: true,
      loadingRequest: false,
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

  async handleSubmit(event) {
    event.preventDefault();
    const { setLoged } = this.props;
    this.setState({ loadingRequest: true });
    const { name } = this.state;
    await createUser({ name });
    setLoged(true);
  }

  validateButton() {
    const { name } = this.state;
    const minInputCharacters = 3;
    let buttonShouldBeDisable = true;
    if (name.length >= minInputCharacters) {
      buttonShouldBeDisable = false;
    }

    return buttonShouldBeDisable;
  }

  render() {
    const { name, buttonIsDisable, loadingRequest } = this.state;
    return (
      <div data-testid="page-login">
        {loadingRequest ? <Loading /> : (
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
        )}
      </div>
    );
  }
}

Login.propTypes = {
  setLoged: PropTypes.func.isRequired,
};

export default Login;
