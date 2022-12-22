import React from 'react';
import { fetchPictures, fetchPictureById } from 'utils/api';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends React.Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    page: 1,
    id: null,
    showModal: false,
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
      showModal: !this.state.showModal,
    });
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
        this.setState({ pictures });
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
          pictures: [...pictures, ...morePictures],
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
          picture: picture[0],
        });
        console.log(this.state.picture);
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { pictures, isLoading, showModal, picture } = this.state;
    const picturesExist = pictures.length > 0;
    // TODO find out when end of the array
    return (
      <div>
        <Searchbar onSubmit={this.registerSearchQuery} />
        {isLoading && <Loader />}
        <ImageGallery images={pictures} getId={this.handleImageClick} />
        {picturesExist && <Button onClick={this.handlePagination}></Button>}
        {showModal && <Modal handleClose={this.toggleModal} />}
      </div>
    );
  }
}
