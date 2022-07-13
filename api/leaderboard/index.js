const arc = require('@architect/functions');

const parseBody = arc.http.helpers.bodyParser;
const AWS = require('aws-sdk');

const prettyPrintJSON = (json) => {
  console.log(`${JSON.stringify(json, null, 4)}`);
};

const formatSalt = (value) => Math.ceil(value * 1000) / 1000;

const getSaltList = async () => {
  const cached = null;
  const tables = await arc.tables();
  const category = 'decks';

  try {
    const queryParams = {
      Limit: 15,
      IndexName: 'bySalt',
      KeyConditionExpression: 'category = :category',
      ExpressionAttributeValues: {
        ':category': category,
      },
      ScanIndexForward: false,
    };

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

exports.handler = async function http() {
  const list = await getSaltList();

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(list),
  };
};
