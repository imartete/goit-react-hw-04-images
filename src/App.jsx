import React from 'react';
import { useState, useEffect } from 'react';
import { fetchPictures } from 'utils/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { Error } from 'components/Error/Error';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [picture, setPicture] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    async function getPictures() {
      try {
        setLoading(true);
        const response = await fetchPictures(searchQuery, page);
        const morePictures = response.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        setPictures(prevPictures => {
          return [...prevPictures, ...morePictures];
        });
        setError('');
        setTotalPictures(response.totalHits);
      } catch (error) {
        setError('');
      } finally {
        setLoading(false);
      }
    }
    getPictures();
  }, [searchQuery, page]);

  function registerSearchQuery(query) {
    if (query !== searchQuery) {
      setPictures([]);
      setPage(1);
      setSearchQuery(query);
    }
  }

  function handlePagination() {
    setPage(page + 1);
  }

  function handleImageClick(picture) {
    setPicture(picture);
  }

  function closeModal() {
    setPicture(null);
  }

  const picturesExist = pictures.length > 0;
  const notOnLastPage = page < totalPictures / 12;

  return (
    <>
      <Searchbar onSubmit={registerSearchQuery} />
      <Section title={'Gallery'}>
        {picturesExist && (
          <ImageGallery images={pictures} getModal={handleImageClick} />
        )}
        {picturesExist && notOnLastPage && (
          <Button onClick={handlePagination}></Button>
        )}
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        {!pictures.length && searchQuery && !error && <Notification />}
      </Section>
      {picture && <Modal handleClose={closeModal} pictureObj={picture} />}
    </>
  );
}
