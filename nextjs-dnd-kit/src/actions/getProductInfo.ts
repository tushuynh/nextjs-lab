const getProductInfo = async (id: string) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
};

export default getProductInfo;
