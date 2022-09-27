import GridItem from "../Grid/GridItem"
import Iframe from "react-iframe"

export default function EarSketch(iframeUrl) {
  return (
    <>
    <GridItem xs={10} sm={10} md={12} style={{ height: "80vh", margin: '2rem'}}>
        <iframe
          src="https://earsketch.gatech.edu/earsketch2/"
          position="absolute"
          width="100%"
          height="100%"
          id="earSketch"
        />
      </GridItem>
    </>
  )
}
