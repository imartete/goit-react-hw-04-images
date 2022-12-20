import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default async (input, count) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: '31296497-f77e3cd3a2890044dbd34d20b',
      q: input,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: count,
    },
  });

  console.log(response.data);
  return response.data;
};

// export default fetchPictures;
