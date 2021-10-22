import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        // this.setState({ buttonIsDisable: this.validateButton() });
      });
  }

  async fetchUser() {
    const fetchedUser = await getUser();
    const { name, email, image, description } = fetchedUser;
    this.setState({ name, email, image, description, loading: false });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form action="submit">
            <div>
              <img src={ image } alt="perfil" />
              <label htmlFor="image">
                <input
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
                  type="text"
                  name="description"
                  id="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
