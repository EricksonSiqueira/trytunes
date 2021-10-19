import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: 'user',
    };

    this.setLoading = this.setLoading.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
  }

  componentDidMount() {
    const { userName } = this.state;
    if (userName === 'user') {
      this.updateUserName();
    }
  }

  setLoading(value) {
    this.setState({ loading: value });
  }

  async updateUserName() {
    this.setLoading(true);

    const user = await getUser();
    const userName = user.name;
    this.setState({ userName });

    this.setLoading(false);
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <header data-testid="header-component">
            <p>Trybetunes logo</p>
            <div>
              <span
                data-testid="header-user-name"
              >
                {userName}
              </span>
            </div>
            <nav>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Pesquisar</Link>
            </nav>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
