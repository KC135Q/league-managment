/**
 * A utility function for making API requests with an optional Bearer Token for authorization.
 * @param {string} url - The URL of the API endpoint.
 * @param {object} [options] - Optional parameters for the fetch request, including a `token`.
 * @returns {Promise<any>} - The data from the response.
 */
async function fetchApi(url, options = {}) {
  const memberToken = localStorage.getItem('memberToken');
  // Default headers for every request
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // If a token is provided, add the Authorization header
  if (memberToken) {
    defaultHeaders['Authorization'] = `Bearer ${memberToken}`;
  }

  // Setting up the fetch options
  const config = {
    // Default method is GET, can be overridden
    method: options.method || 'GET',
    // Merge default headers with any headers provided in options
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // If method is POST (or PUT, etc.), include the body in the config
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    // Attempt to parse the response body as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Log or handle errors here
    console.error("Fetch API error:", error);
    throw error;
  }
}

export default fetchApi;
