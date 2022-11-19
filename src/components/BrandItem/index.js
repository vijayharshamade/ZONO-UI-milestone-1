import './index.css'

const BrandItem = props => {
  const {apiData} = props
  const {id, brand} = apiData

  return (
    <>
      <div className="brand-container">
        <div className="brand-item-container">
          <div className="brand-icon-container">
            <p className="brand-icon-heading">{id[0]}</p>
          </div>
          <div className="brand-description-container">
            <h1 className="brand-description-heading">{id}</h1>
            <p>product count: {brand.length}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default BrandItem
