const fetchData = async (url, config) => {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = response.json();

    return data;
  } catch (error) {
    throw Error("Network failed");
  }
};

export default fetchData;
