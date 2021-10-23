import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      buttonIsDisable: true,
      update: false,
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        this.setState({ buttonIsDisable: !this.toggleButton() });
      });
  }

  async handleClick(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    const userObj = {
      name,
      email,
      description,
      image,
    };
    await updateUser(userObj);
    this.setState({ update: true });
  }

  toggleButton() {
    const { email } = this.state;
    const stateObjValues = Object.values(this.state);
    const onlyStringStates = stateObjValues.filter((state) => typeof state === 'string');
    const isFilled = onlyStringStates.every((inputValue) => inputValue.length > 0);
    const isEmailValid = email.includes('@');

    const formIsValid = isFilled && isEmailValid;

    return (formIsValid);
  }

  async fetchUser() {
    const fetchedUser = await getUser();
    const { name, email, image, description } = fetchedUser;
    this.setState({ name, email, image, description }, () => {
      this.setState({ loading: false, buttonIsDisable: !this.toggleButton() });
    });
  }

  render() {
    const { loading,
      name,
      email,
      image,
      description,
      buttonIsDisable,
      update } = this.state;

    if (update) {
      return <Redirect to="/profile" />;
    }

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <div>
              <img src={ image } alt="perfil" />
              <label htmlFor="image">
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Name
                <p>Fique à vontade para usar seu nome social</p>
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                E-mail
                <p>Escolha um email que consulte diariamente</p>
                <input
                  data-testid="edit-input-email"
                  type="text"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                Descrição
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  name="description"
                  id="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <button
              type="submit"
              data-testid="edit-button-save"
              onClick={ this.handleClick }
              disabled={ buttonIsDisable }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
