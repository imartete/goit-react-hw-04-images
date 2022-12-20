import React from 'react';
import fetchPictures from 'utils/api';
export class App extends React.Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
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

  render() {
    return <div></div>;
  }
}
