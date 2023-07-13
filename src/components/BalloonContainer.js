
const BalloonContainer = ({className, title, content, footer}) => {
  return (
    <div className={className} style={{ backgroundColor: 'white', borderRadius: '25px' }}>
      
      {title}

      {content}

      {footer}
      
    </div>
  )
}

export default BalloonContainer