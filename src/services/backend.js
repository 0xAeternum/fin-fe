export default class Backend {
  constructor(bearer_token) {
    this.bearer_token = bearer_token

    this.base_url = 'http://localhost:3001'

    this.stocks_prefix = '/stock'

    this.tickers_prefix = '/tickers/'

    this.market_status_prefix = '/status/'

    this.aggregates_prefix = '/aggregates/'

    this.request_headers = new Headers({"Content-type": "application/json"})
  }


  async getStocks() {
    let json = await this.perform_request(this.base_url + this.stocks_prefix + this.tickers_prefix, 'get', this.request_headers)
    return json
  }

  async getStockInfo(ticker) {
    let json = await this.perform_request(this.base_url + this.stocks_prefix + '/' + ticker, 'get')
    return json
  }

  async getMarketStatus() {
    let json = await this.perform_request(this.base_url + this.stocks_prefix + this.market_status_prefix, 'get')
    return json
  }

  async getStockAggregates(ticker) {
    let json = await this.perform_request(this.base_url + this.stocks_prefix + this.aggregates_prefix + ticker, 'get')
    return json
  }

  async perform_request(url, req_method, req_headers) {
    try {
      let results = await fetch(url, { method: req_method, headers: req_headers })
      let json = results.json()
      return json;
    } catch (err) {
      console.log(err)
    }
  }
}