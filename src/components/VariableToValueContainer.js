
const VariableToValueContainer = ({className, variable, value}) => {
  return (
    <div className={className}>
      <h4>{variable}</h4>
      <h2>{ value }</h2>
    </div>
  )
}

export default VariableToValueContainer;