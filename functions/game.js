const { default: axios } = require('axios')
const { REACT_APP_IGDB_CLIENT } = process.env

exports.handler = async (event, context) => {
  // check for get method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'x-reason': '1',
      },
      body: JSON.stringify({ error: 'Method not accepted' }),
    }
  }

  // do we have a bearer token?
  if (
    !event.headers.cookie ||
    event.headers.cookie.match(new RegExp('(^| )gDBT=([^;]+)')) === null
  ) {
    return {
      statusCode: 401,
      headers: {
        'x-reason': '2',
      },
      body: JSON.stringify({
        msg: 'No bearer token',
      }),
    }
  }

  // do we have an id?
  if (!event.body && !event.body.id) {
    return {
      statusCode: 400,
      headers: {
        'x-reason': '3',
      },
      body: JSON.stringify({
        msg: 'No game ID',
      }),
    }
  }

  const { id } = JSON.parse(event.body)

  // set our headers for igdb
  const defaultHeaders = {
    Accept: 'application/json',
    'Client-ID': REACT_APP_IGDB_CLIENT,
    Authorization: `Bearer ${
      event.headers.cookie.match(new RegExp('(^| )gDBT=([^;]+)'))[2]
    }`,
  }

  return axios({
    url: 'https://api.igdb.com/v4/games',
    method: 'POST',
    headers: defaultHeaders,
    data: `fields name, cover.*, first_release_date, summary, platforms.*, screenshots.*;where id = (${id});`,
  })
    .then((response) => ({
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response.data[0]),
    }))
    .catch((err) => ({
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'x-reason': '0',
      },
      body: JSON.stringify({
        error: err,
      }),
    }))
}
