import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Backend from "../services/backend";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend  } from "recharts";
import '../style/StockInfo.css'
import { Text } from "recharts";
import VariableToValueContainer from "../components/VariableToValueContainer";

const StockInfo = () => {
  const [stock, setStock] = useState(null)
  const [aggregates, setAggregates] = useState(null)
  const [apiRequestError, setApiRequestError] = useState('')

  const params = useParams()

  function convertUnixToDate({x, y, payload}) {
    let date = new Date(payload.value).toLocaleDateString("en-US")
    return (<Text
      fontSize={"14px"}
      width={"12px"}
      x={x} 
      y={y} 
      textAnchor="middle" 
      verticalAnchor="start"
  >{date}</Text>)
  }
  
  useEffect(() => {
    const backend = new Backend()
    backend.getStockInfo(params.stockName).then(result => {
      if (result.status === 'OK') {
        setStock(result.results)
      } else {
        setApiRequestError(result.error)
        console.log(result)
      }
    })

    backend.getStockAggregates(params.stockName).then(result => {
      if (result.status === 'OK' || result.status === 'DELAYED') {
        setAggregates(result.results)
      } else {
        setApiRequestError(result.error)
        console.log(result)
      }
    })
  }, [])
  return (
    <div className='stock-container'>
      {stock ? (
        <div>
          <div className="branding">
            <h1>{stock.name}</h1>
          </div>
          <div className="current-information">
            <div className="current-price">
              <h4>{stock.ticker}</h4>
              <h2>{
                stock.market_cap && stock.stock_weighted_shares_outstanding ? `$${(stock.market_cap / stock.weighted_shares_outstanding)}`
                  : aggregates ? `$${aggregates.slice(-1)[0].c}` : ""
              }</h2>
            </div>

            <div className="current-stock-info">
              {aggregates ? (
                <div className="prices-container">

                  <VariableToValueContainer
                    className={'price-container'}
                    variable={"Today's closing price"}
                    value={`$${aggregates.slice(-1)[0].c}`}
                  />

                  <VariableToValueContainer
                    className={'price-container'}
                    variable={"Today's opening price"}
                    value={`$${aggregates.slice(-1)[0].o}`}
                  />

                  <VariableToValueContainer
                    className={'price-container'}
                    variable={"Today's highest price"}
                    value={`$${aggregates.slice(-1)[0].h}`}
                  />

                  <VariableToValueContainer
                    className={'price-container'}
                    variable={"Today's lowest price"}
                    value={`$${aggregates.slice(-1)[0].l}`}
                  />

                  
                </div>
              ): (
                  <div></div>
              )}
            </div>
          </div>

          <div className="current-information">
            <div className="graph">
              <h1>Graphs</h1>
              {aggregates ? (
                <div className="aggregates-graph">
                  <LineChart width={700} height={550} data={aggregates}>
                    <Line type='monotone' name='Closing' dataKey='c' stroke="orange"></Line>
                    <Line type='monotone' name='Opening' dataKey='o' stroke="green"></Line>
                    <Line type='monotone' name='Highest' dataKey='h' stroke="purple"></Line>
                    <Line type='monotone' name='Lowest' dataKey='l' stroke="red"></Line>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey={'t'} tick={convertUnixToDate} interval="preserveStartEnd" />
                    <YAxis type="number" domain={[Math.min(aggregates), "auto"]} allowDataOverflow={true} />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </div>
              ): (
                  <div></div>
              )}
            </div>

            <div className="contact">
              <div className="contact-title">
                <h2>Contact</h2>
                <a href={stock.homepage_url}>{stock.homepage_url}</a>
                <h4>{stock.phone_number}</h4>
                {stock.address ? (
                  <div>
                    <h4>{stock.address.city}, {stock.address.state}</h4>
                    <h4>{stock.address.address1}, {stock.address.postal_code}</h4>
                  </div>
                ): (
                    <div><h4>No address information available</h4></div>
                )}
              </div>

              <div className="contact-description">
                <h2>Details</h2>
                <p>{stock.list_date}</p>
                <p>{stock.description}</p>
                <hr></hr>
                <div className="market-info">
                  <p>Market:</p>
                  <p>{stock.market}</p>
                </div>

                <div className="market-info">
                  <p>Market Cap:</p>
                  <p>{stock.market_cap}</p>
                </div>

                <div className="market-info">
                  <p>Shares outstanding:</p>
                  <p>{stock.share_class_shares_outstanding}</p>
                </div>

                <div className="market-info">
                  <p>Employees:</p>
                  <p>{stock.total_employees}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      ): (
          <div><h1>{apiRequestError}</h1></div>
      )}
    </div>
  )
}

export default StockInfo;