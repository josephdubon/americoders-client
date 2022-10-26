import GridItem from "../Grid/GridItem"
import Iframe from "react-iframe"

export default function EarSketch(iframeUrl) {
  return (
    <>
    <GridItem xs={12} sm={12} md={12} style={{ height: "80vh", width: '100%', margin: '2rem 0'}}>
        <iframe
          src="https://earsketch.gatech.edu/earsketch2/"
          width="100%"
          height="100%"
          id="earSketch"
        />
      </GridItem>
    </>
  )
}
