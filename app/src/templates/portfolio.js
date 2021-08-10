import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Swiper from 'react-id-swiper'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import 'swiper/css/swiper.css';
import './portfolio.css';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const [focusedImage, setFocusedImage] = useState(false)
  const images = data.allFile.edges
  const { previous, next } = pageContext

  const handleClick = (src) => {
    window.location.hash = src
  }

  const updateImageFromHash = () => {
    setFocusedImage(window.location.hash.replace(/^[#]/, ''))
  }

  const clearImage = () => {
    window.location.hash = ""
  }
  useEffect(() => {
    window.addEventListener('hashchange', updateImageFromHash)
    return () => {
      window.removeEventListener('hashchange', updateImageFromHash)
    }
  })

  useEffect(updateImageFromHash, [])

  return (
    <Layout location={location} title="Ben Bergstein · Photography" isFull>
      <SEO
        title="Photography"
        description="Photos taken around the world, mostly in Southeast Asia"
        meta={[{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]}
      />
      <div className="portfolio__wrapper">
	{images.map(({ node: { base, childImageSharp: img } }) => (
	  <div className="portfolio__photo">
	    <a onClick={() => handleClick(img.original.src)}>
	      <img src={img.thumbnail.src} width="100%" />
	    </a>
	  </div>
	))}
      </div>

      {focusedImage && <div
	style={{
	  position: 'fixed',
	  top: 0,
	  left: 0,
	  width: "100%",
	  height: "100%",
	  background: "black",
	  zIndex: 1000,
	}}
	onClick={clearImage}
      >
	<div className="portfolio__focus__wrapper">
	  <img src={focusedImage} className="portfolio__focus__image" style={{ margin: 0 }}/>
	</div>
      </div>}
      <footer>
	<Bio />
      </footer>
    </Layout>
  )
}

export default BlogPostTemplate

export const portfolioQuery = graphql`
  query PortfolioQuery {
    allFile(
      filter: { absolutePath: { regex: "/portfolio.+JPG/" } }
      sort: { fields: [absolutePath], order: DESC }
    ) {
      edges {
	node {
	  base
	  childImageSharp {
	    thumbnail: fluid(maxWidth: 1024) {
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
