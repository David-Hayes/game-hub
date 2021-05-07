const { default: axios } = require('axios')
const { IGDB_CLIENT } = process.env

exports.handler = async (event, context) => {
  // check for get method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: 'No bearer token',
      }),
    }
  }

  // do we have a query?
  if (!event.body && !event.body.query) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: 'No query',
      }),
    }
  }

  const { id: id, limit = 20, offset = 0 } = JSON.parse(event.body)

  // set our headers for igdb
  const defaultHeaders = {
    Accept: 'application/json',
    'Client-ID': IGDB_CLIENT,
    Authorization: `Bearer ${
      event.headers.cookie.match(new RegExp('(^| )gDBT=([^;]+)'))[2]
    }`,
  }

  return axios({
    url: 'https://api.igdb.com/v4/games',
    method: 'POST',
    headers: defaultHeaders,
    data: `fields name, cover.*, first_release_date, slug; where id = (${id}); limit ${limit}; offset ${offset};`,
  })
    .then((response) => {
      console.log(response.data)
      const data = {}
      response.data.map((i) => {
        data[i.id] = i
      })
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'x-count': response.headers['x-count'],
        },
        body: JSON.stringify(data),
      }
    })
    .catch((err) => ({
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: err,
      }),
    }))
}
