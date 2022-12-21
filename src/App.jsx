import React from 'react';
import fetchPictures from 'utils/api';
import Searchbar from 'components/Searchbar/Searchbar';

export class App extends React.Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    searchQuery: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const pictures = await fetchPictures('swag', 1);
      this.setState({ pictures });
    } catch (error) {
      this.setState({ error });
      console.log(this.state.error);
      //TODO:
    } finally {
      this.setState({ isLoading: false });
    }
  }

  registerSearchQuery = value => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.registerSearchQuery} />
      </div>
    );
  }
}
