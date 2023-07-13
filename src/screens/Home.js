import { useEffect, useState } from "react";
import Backend from "../services/backend";
import BalloonContainer from "../components/BalloonContainer";
import VariableToValueContainer from "../components/VariableToValueContainer";
import '../style/Home.css'


const Home = () => {
  const [status, setStatus] = useState()
  const [apiRequestError, setApiRequestError] = useState('')

  useEffect(() => {
    const backend = new Backend()
    backend.getMarketStatus().then(result => {
      console.log(result)
      if (result?.error) {
        setApiRequestError(result.error)
      } else {
        setStatus(result)
      }
    })
  }, [])

  return (
    <div className="home-container">
      {status ? (
        <div className="status-container">
          <BalloonContainer
            className="market-status"
            title={(<h1>Market Status</h1>)}
            content={(
              <div className="balloon-container-content">
                <h2>{status.serverTime.replace('T', ' | ')}</h2>
                <hr style={{width: '90%'}}></hr>

                <div className="market-statuses">
                  
                  <div className="exchanges">
                    <h2>Exchanges</h2>
                    <div className='exchange-status-container'>
                      <VariableToValueContainer variable="NASDAQ" value={status.exchanges.nasdaq.replace('-', ' ')}/>
                      <VariableToValueContainer variable="NYSE" value={status.exchanges.nyse.replace('-', ' ')} /> 
                      <VariableToValueContainer variable="OTC" value={status.exchanges.otc.replace('-', ' ')}/>
                    </div>
                  </div>

                  <div className="exchanges">
                    <h2>Currencies</h2>
                    <div className="exchange-status-container">
                      <VariableToValueContainer variable={"Crypto"} value={status.currencies.crypto} />
                      <VariableToValueContainer variable={"Forex"} value={status.currencies.fx} />
                    </div>
                  </div>

                </div>
              </div>
            )}
          />
        </div>
      ): (
          <div><h1>{ apiRequestError }</h1></div>
      )}
    </div>
  )
}

export default Home;