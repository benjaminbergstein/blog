import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

      // <SEO
      //   title="Gallery"
      //   description="Available Images"
      // />
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const images = data.allFile.edges
  const { previous, next } = pageContext

  return (
    <Layout location={location} title="Gallery">
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {images.map(({ node: { base, childImageSharp: img } }) => (
	<div style={{ flexBasis: "32%", margin:  "0.5%" }}>
	  <a href={img.original.src} target="_BLANK">
	    <img src={img.thumbnail.src} />
	  </a>
	  {base}
	</div>
      ))}
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const galleryQuery = graphql`
  query GalleryQuery {
    allFile(
      filter: { absolutePath: { regex: "/photos.+JPG/" } }
      sort: { fields: [absolutePath], order: ASC }
    ) {
      edges {
	node {
	  base
	  childImageSharp {
	    thumbnail: fluid(maxWidth: 300, maxHeight: 200) {
	      src
	    }
	    original {
	      width
	      height
	      src
	    }
	  }
	}
      }
    }
  }
`
