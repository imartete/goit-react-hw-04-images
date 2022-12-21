import React from 'react';
import { fetchPictures } from 'utils/api';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    page: 1,
  };

  registerSearchQuery = value => {
    this.setState({ searchQuery: value });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ isLoading: true });
      console.log('Component Updated');
      try {
        const pictures = await fetchPictures(
          this.state.searchQuery,
          this.state.page
        );
        this.setState({ pictures });
      } catch (error) {
        this.setState({ error });
        console.log(this.state.error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.registerSearchQuery} />
        <ImageGallery images={this.state.pictures} />
      </div>
    );
  }
}
