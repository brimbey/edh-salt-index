const arc = require('@architect/functions');

const parseBody = arc.http.helpers.bodyParser;
const AWS = require('aws-sdk');

const prettyPrintJSON = (json) => {
  console.log(`${JSON.stringify(json, null, 4)}`);
};

const formatSalt = (value) => Math.ceil(value * 1000) / 1000;

const getSaltList = async (cursor) => {
  const cached = null;
  const tables = await arc.tables();
  const category = 'decks';

  try {
    const queryParams = {
      Limit: 50,
      IndexName: 'bySalt',
      KeyConditionExpression: 'category = :category AND salt > :salt',
      ExpressionAttributeValues: {
        ':category': category,
        ':salt': 0,
      },
      ScanIndexForward: false,
    };

    if (cursor) {
      // console.log(`CURSOR :: ${prettyPrintJSON(cursor)}`);
      queryParams.ExclusiveStartKey = {
        category: cursor.category,
        id: cursor.id,
        salt: parseFloat(cursor.salt)
      };

      console.log(`QUERY :: ${prettyPrintJSON(queryParams)}`);
    }

    const results = await tables.data.query(queryParams);

    if (results?.LastEvaluatedKey) {
      console.log(`key :: ${prettyPrintJSON(results.LastEvaluatedKey)}`);
    }

    return await tables.data.query(queryParams).then((data) => ({
      count: data.Count,
      lastEvaluatedKey: data.LastEvaluatedKey,
      items: data.Items.map((deck) => ({
        ...deck.data,
        id: deck.id,
        salt: formatSalt(deck.data.salt),
      })),
    }));
  } catch (error) {
    console.log(`UNABLE TO GET DATA : ${error}`);
  }

  return [];
};

exports.handler = async function http(requestObject) {
  let cursor = requestObject?.queryStringParameters?.cursor;
  if (cursor) {
    const decodeString = `{"${decodeURI(cursor).replace(/=/g, '":"').replace(/&/g, '","')}"}`;
    cursor = JSON.parse(decodeString);
  }

  const list = await getSaltList(cursor);

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(list),
  };
};
