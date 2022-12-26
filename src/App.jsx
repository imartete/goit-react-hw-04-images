import React from 'react';
import { fetchPictures } from 'utils/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { Error } from 'components/Error/Error';

export class App extends React.Component {
  state = {
    pictures: [],
    isLoading: false,
    error: '',
    searchQuery: '',
    page: 1,
    picture: null,
    totalPages: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pictures, page } = this.state;

    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchPictures(searchQuery, page);
        const morePictures = response.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        this.setState({
          pictures: [...pictures, ...morePictures],
          error: '',
          totalPages: response.totalHits,
        });
        console.log(this.state.pictures);
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  registerSearchQuery = searchQuery => {
    this.setState({ searchQuery, page: 1, pictures: [] });
  };

  handlePagination = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleImageClick = picture => {
    this.setState({ picture });
  };

  closeModal = () => {
    this.setState({
      picture: null,
    });
  };

  render() {
    const {
      pictures,
      isLoading,
      picture,
      totalPages,
      page,
      searchQuery,
      error,
    } = this.state;

    const picturesExist = pictures.length > 0;
    const notOnLastPage = page < totalPages / 12;

    return (
      <div>
        <Searchbar onSubmit={this.registerSearchQuery} />
        {isLoading && <Loader />}
        {error && (
          <Section>
            <Error message={error} />
          </Section>
        )}
        {!pictures.length && searchQuery && !error && (
          <Section>
            <Notification />
          </Section>
        )}
        {picturesExist && (
          <Section>
            <ImageGallery images={pictures} getModal={this.handleImageClick} />
          </Section>
        )}
        {picturesExist && notOnLastPage && (
          <Section>
            <Button onClick={this.handlePagination}></Button>
          </Section>
        )}
        {picture && (
          <Modal handleClose={this.closeModal} pictureObj={picture} />
        )}
      </div>
    );
  }
}
