export const DynamoConnector = {
  getLeaderboard: async (callback) => {
    const results = await (await fetch('/api/leaderboard')).json();

    callback(results.items);
  },
  importDeckList: async (url, statusCallback, doneCallback, errorCallback) => {
        let data = await (await fetch(`/api/import?url=${url}`)).json()
        const commanders = Object.keys(data?.deck?.commanders);
        let saltTotal = 0;
        const nodes = data.decks.cards;

        const cardnameList = [];
        Object.keys(nodes).forEach((cardname) => {
            cardnameList.push(cardname);
        })

        for (let i = 0; i < nodes.length; i++) {
            const cardname = cardnameList[i];
            statusCallBack({type: `card`, card: cardname, percentage: Math.floor((i / cardnameList.length) * 100)});

            let data = await (await fetch(`/api/card?card=${cardname}`)).json();
            if (data?.salt) {
                this.cardList.push({
                    name: cardname,
                    salt: data.salt,
                });

                saltTotal = saltTotal + parseFloat(data.salt);
            }
        }

        const cardList = [];

        
        

        console.log(`SALT TOTAL ${saltTotal}`);

        return saltTotal;
  }
};
