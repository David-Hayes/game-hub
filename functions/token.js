const { default: axios } = require('axios')
const { IGDB_CLIENT, IGDB_SECRET } = process.env

exports.handler = async (event, context) => {
  // check for get method
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not accepted' }),
    }
  }

  // have we already got a token? no point getting one if we have!
  if (event.headers.cookie && event.headers.cookie.match('gDBT') !== null) {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Token exists' }),
    }
  }

  return axios({
    url: 'https://id.twitch.tv/oauth2/token',
    method: 'POST',
    params: {
      client_id: IGDB_CLIENT,
      client_secret: IGDB_SECRET,
      grant_type: 'client_credentials',
    },
  })
    .then((response) => ({
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      multiValueHeaders: {
        'Set-Cookie': [
          `gDBT=${response.data.access_token}; Max-Age=${response.data.expires_in}; HttpOnly; Path=/; SameSite=Strict;`,
          `gDBTF=1; Max-Age=${response.data.expires_in}; Path=/; SameSite=Strict;`,
        ],
      },
      body: JSON.stringify({ msg: 'Token created' }),
    }))
    .catch((err) => ({
      statusCode: 400,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: err }),
    }))
}
