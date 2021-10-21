import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const fetchedUser = await getUser();
    const { name, email, image, description } = fetchedUser;
    this.setState({ name, email, image, description, loading: false });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <>
            <div>
              <img data-testid="profile-image" src={ image } alt="perfil" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <h4>Nome</h4>
              <p>{name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{email}</p>
            </div>
            <div>
              <h4>Descrição</h4>
              <p>{description}</p>
            </div>
          </>

        )}
      </div>
    );
  }
}

export default Profile;
