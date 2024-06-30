export default {
  async fetchData(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const json = await response.json();

      return json;
    } catch (error) {
      console.warn(error);
    }
  },
};
