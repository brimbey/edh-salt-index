const fetch = require('node-fetch');
const arc = require('@architect/functions')
const AWS = require("aws-sdk")


const prettyPrintJSON = (json) => {
  console.log(`json value: \n${JSON.stringify(json, null, 4)}`);
}

function fart (data) {
  console.log(`GOT sfs :: `);
  prettyPrintJSON(data);
}


const getEdhrecCardEntry = async (cardname = '') => {
  let cached = null;
  let tables = await arc.tables();
  const category = `cards`;

  try {
    const queryParams = {
      KeyConditionExpression: 'category = :category AND id = :id',
      ExpressionAttributeValues: {
        ':category': category,
        ':id': cardname,
      }
    }
    
    const response = await tables.data.query(queryParams);
    
    cached = response.Items[0];
  } catch (error) {
    console.log(`UNABLE TO GET DATA : ${error}`);
  }

  if (!cached?.salt) {
    console.log(`NOT CACHED :: ${cardname}`);
    const requestOptions = {
      'method': 'GET',
      'hostname': 'cards.edhrec.com',
      'path': `/${cardname}`,
      'headers': {
      },
      'maxRedirects': 20
    };
  
    const response = await fetch(`https://cards.edhrec.com/${cardname}`, requestOptions);
    const text = await response.text();
    const json = JSON.parse(text);

    try {
      return await tables.data.put({
        category: 'cards',
        id: cardname,
        salt: json.salt,
        name: json.name,
      })
    } catch(error) {
      // do nothing
      console.log(`UNABLE TO SET DATA : ${error}`);
    }
  }
  
  return {
    ...cached,
  }
  
}

exports.handler = async function http (requestObject) {
  const cardname = requestObject?.queryStringParameters?.card;
  
  if (cardname?.length > 0) {
    const sanitizedCardName = cardname?.toLowerCase()
        .replace(/,|'/g, '')
        .replace(/ /g, '-')
        .replace(/-\/\/.*/g, '');

    // console.log(`sanitized card name: ${sanitizedCardName}`);

    const card = await getEdhrecCardEntry(sanitizedCardName);

    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 200,
      body: JSON.stringify({...card})
    }
  } else {
    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 404,
      body: JSON.stringify({ message: `not found` }),
    }
  }
}

