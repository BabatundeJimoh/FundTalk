require('dotenv').config()
const polygonApiKey = process.env.POLYGON_KEY
const { restClient } = require('@polygon.io/client-js')
const rest = restClient(polygonApiKey)

const stockData = async (req, res) => {
    try {
            const stockData = await rest.stocks.aggregates("AAPL", 1, "day", "2023-10-09", "2023-10-09")
            console.log('Stock Data:', stockData);
            res.send(stockData)
            // res.json(stockData)

            // const stockSymbol = 'AAPL';
            // const fromDate = '2023-01-01';
            // const toDate = '2023-04-14';
            // const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${fromDate}/${toDate}?apiKey=${polygonApiKey}`;
    
            // const response = await axios.get(apiUrl);
            // res.json(response.data);

    } catch (error) {
        console.error('An error happened:', error);
        res.status(500).send('Internal Server Error')
    }
    
}

module.exports = stockData