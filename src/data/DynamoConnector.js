export const DynamoConnector = {
  getLeaderboard: async (cursor, callback) => {
    let fetchUri = `/api/leaderboard`;

    if (cursor) {
        cursor = encodeURIComponent(cursor);
        fetchUri = `${fetchUri}?cursor=${cursor}`;
    }
    
    const results = await (await fetch(fetchUri)).json();

    callback(results);
  },
  importDeckList: async (url, statusCallback, doneCallback, errorCallback) => {
    try {
        let response = await (await fetch(`/api/import?url=${url}`)).json()
        const commanders = Object.keys(response?.deck?.commanders);
        let saltTotal = 0;
        const nodes = response.deck.cards;
        
        const cardList = [];
        const cardnameList = [];

        Object.keys(nodes).forEach((cardname) => {
            cardnameList.push(cardname);
        })

        for (let i = 0; i < cardnameList.length; i++) {
            const cardname = cardnameList[i];
            statusCallback({type: `card`, card: cardname, percentage: Math.floor((i / cardnameList.length) * 100)});

            let data = await (await fetch(`/api/card?card=${cardname}`)).json();
            if (data?.salt) {
                cardList.push({
                    name: cardname,
                    salt: data.salt,
                });

                saltTotal = saltTotal + parseFloat(data.salt);
            }
        }

        const persistResponse = await (await fetch(`/api/persist`, {
            method: "POST",
            body: JSON.stringify({
                url: response?.deck?.url,
                author: response?.deck?.author?.userName,
                authorAvatarUrl: response?.deck?.author?.profileImageUrl,
                commanders,
                title: response?.deck?.name,
                salt: saltTotal,
                source: `moxfield`,
                authorProfileUrl: `https://www.moxfield.com/users/${response?.deck?.author?.userName}`,
            })
        })).json();

        doneCallback(persistResponse.data);
    } catch (error) {
        console.log(error);
        errorCallback(error);
    }
  }
};
