import React from 'react';
import { fetchPictures, fetchPictureById } from 'utils/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';

export class App extends React.Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    page: 1,
    id: null,
    showModal: false,
    picture: [],
    totalPages: null,
  };

  registerSearchQuery = searchQuery => {
    this.setState({ searchQuery });
  };

  handlePagination = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleImageClick = id => {
    this.setState({
      id,
    });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pictures, page, id } = this.state;

    if (searchQuery !== prevState.searchQuery) {
      this.setState({ isLoading: true });
      try {
        const pictures = await fetchPictures(searchQuery, page);
        this.setState({
          pictures: pictures.hits,
          totalPages: pictures.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const morePictures = await fetchPictures(searchQuery, page);
        this.setState({
          pictures: [...pictures, ...morePictures.hits],
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (id !== prevState.id) {
      this.setState({ isLoading: true });
      try {
        const picture = await fetchPictureById(id);
        this.setState({
          picture: picture,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const {
      pictures,
      isLoading,
      showModal,
      picture,
      totalPages,
      page,
      searchQuery,
    } = this.state;

    const picturesExist = pictures.length > 0;
    const notOnLastPage = page < totalPages / 12;

    return (
      <div>
        <Searchbar onSubmit={this.registerSearchQuery} />
        {isLoading && <Loader />}
        {!pictures.length && searchQuery && (
          <Section>
            <Notification />
          </Section>
        )}
        {picturesExist && (
          <Section>
            <ImageGallery images={pictures} getId={this.handleImageClick} />
          </Section>
        )}
        {picturesExist && notOnLastPage && (
          <Section>
            <Button onClick={this.handlePagination}></Button>
          </Section>
        )}
        {showModal && (
          <Modal handleClose={this.toggleModal} pictureArr={picture} />
        )}
      </div>
    );
  }
}
