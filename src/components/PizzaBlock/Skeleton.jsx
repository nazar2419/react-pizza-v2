import React from "react"
import ContentLoader from "react-content-loader"


const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block" 
    speed={0}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="122" cy="123" r="121" /> 
    <rect x="5" y="271" rx="10" ry="10" width="237" height="20" /> 
    <rect x="5" y="313" rx="10" ry="10" width="240" height="74" /> 
    <rect x="0" y="413" rx="10" ry="10" width="92" height="30" /> 
    <rect x="121" y="409" rx="25" ry="25" width="124" height="41" />
  </ContentLoader>
)

export default Skeleton

