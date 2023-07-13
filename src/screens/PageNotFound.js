import { useNavigate } from "react-router-dom";


const PageNotFound = () => {
  const history = useNavigate();
  console.log(history)
  return (
    <div className="404">
      <h1>404 Not Found</h1>
      <button className="btn-link" onClick={() => history(-1)}>Go Back</button>
    </div>
  )
}

export default PageNotFound;