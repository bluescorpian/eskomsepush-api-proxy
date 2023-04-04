import proxy from '../proxy';

export default {
  async fetch(request) {
    const headers = Array.from(request.headers.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    const response = await proxy(request.url, request.method, headers, fetch);

    const body = response.body;
    const init = { ...response };
    delete init['body'];
    return new Response(body, init);
  },
};
