import { useEffect, useState } from "react";
import Backend from "../services/backend";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import '../style/Stocks.css'


const Stocks = () => {
  const [stocks, setStocks] = useState([])
  const [apiRequestError, setApiRequestError] = useState()

  useEffect(() => {
    const backend = new Backend()
    backend.getStocks().then(result => {
      if (result.status === 'OK') {
        console.log(result)
        setStocks(result.results)
      } else {
        setApiRequestError(result.error)
        console.log(result)
      }
    })
  }, [])

  return (
    <div className="stocks-container">
      <h1>Stocks</h1>
      {apiRequestError ? (
        <h1>{apiRequestError}</h1>
      ) : null}
      <TableContainer component={Paper} style={{width: '80%', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '25px', padding: 20}}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Ticker</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Market</TableCell>
            <TableCell align="right">Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Link to={`/stocks/${row.ticker}`} state={{name: row.ticker}} className="table-link"><TableCell component="th" scope="row">
                {row.name}
              </TableCell></Link>
              <TableCell align="right">{row.ticker}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.market}</TableCell>
              <TableCell align="right">{row.currency_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Stocks;