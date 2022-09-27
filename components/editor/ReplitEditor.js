import GridItem from "../Grid/GridItem"
import Iframe from "react-iframe"

export default function ReplitEditor(iframeUrl) {
  return (
    <>
      <GridItem xs={10} sm={10} md={12} style={{ height: "800px" }}>
        <iframe
          src="https://earsketch.gatech.edu/earsketch2/"
          position="absolute"
          width="100%"
          height="100%"
          id="myId"
          className="myClassname"
        />
      </GridItem>
    </>
  )
}
