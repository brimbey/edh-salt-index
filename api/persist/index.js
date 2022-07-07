const CryptoJS = require('crypto-js');

let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser

const prettyPrintJSON = (json) => {
  console.log(`json value: \n${JSON.stringify(json, null, 4)}`);
}


const persistDeckList = async (body) => {
  console.log(`MD5 HASH => ${CryptoJS.MD5(body?.url)}`);
  const id = `${CryptoJS.MD5(body?.url)}`;
  const urlSlug = body?.url?.substring(body?.url?.lastIndexOf(`/`) + 1);

  console.log(`persisting data for decklist ${body.url}; slug: ${urlSlug}`);
  
  const deckData = {
    category: 'decks',
    id,
    salt: body.salt,
    data: { 
      ...body, 
      dateLastIndexed: ``,
      timesIndexed: ``,
    },
  }

  deckData.data.commanders = deckData.data.commanders.toString();

  try {
    let tables = await arc.tables()
    console.log(`...persisting`);
    prettyPrintJSON(deckData);
    return await tables.data.put({
      ...deckData,
    })
  } catch(error) {
    // do nothing
    console.log(`UNABLE TO SET DATA : ${error}`);
  }
}

exports.handler = async function http (requestObject) {
  try {
    const body = parseBody(requestObject); // Pass the entire request object
    const response = await persistDeckList(JSON.parse(body));
    
    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log(`[ERROR] ${error}`);
    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    }
  }
}

