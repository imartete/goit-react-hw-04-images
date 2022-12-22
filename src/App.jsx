import React from 'react';
import { fetchPictures } from 'utils/api';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

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

  handlePagination = () => {
    this.setState({ page: this.state.page + 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pictures, page } = this.state;

    if (searchQuery !== prevState.searchQuery) {
      this.setState({ isLoading: true });
      try {
        const pictures = await fetchPictures(searchQuery, page);
        this.setState({ pictures });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (page !== prevState.page) {
      try {
        const morePictures = await fetchPictures(searchQuery, page);
        this.setState({
          pictures: [...pictures, ...morePictures],
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { pictures, isLoading } = this.state;
    const picturesExist = pictures.length > 0;
    // TODO find out when end of the array
    return (
      <div>
        <Searchbar onSubmit={this.registerSearchQuery} />
        {isLoading && <Loader />}
        <ImageGallery images={pictures} />
        {picturesExist && <Button onClick={this.handlePagination}></Button>}
      </div>
    );
  }
}
