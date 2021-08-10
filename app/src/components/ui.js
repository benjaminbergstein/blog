import React, { useState } from 'react'
import kebabCase from 'lodash/kebabCase'
import { Link } from "gatsby"
import useViewport from '../hooks/useViewport'

export const Box = ({
  onMouseEnter = undefined,
  onMouseLeave = undefined,
  onClick = undefined,
  children,
  ...styles
}) => {
  const [width] = useViewport()
  const isSmall = width < 600

  const newStyles = Object.entries(styles).reduce((newStyles, [prop, val]) => {
    const isCssProp = typeof val === 'string' || typeof val === 'number'
    if (isCssProp) return { ...newStyles, [prop]: val }
    return { ...newStyles, [prop]: val[isSmall ? 0 : 1] }
  }, {})
  return <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={newStyles}>{children}</div>
}

export const boxWithStyles = (styles) => ({ children, ...otherStyles }) => (
  <Box {...styles} {...otherStyles}>{children}</Box>
)

export const Row = boxWithStyles({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: 'wrap'
})

export const Column = boxWithStyles({ width: ["100%", "32.5%"] })
export const Card = boxWithStyles({
  background: "#efefef",
  padding: "26px",
  fontWeight: "700",
  borderRadius: "10px",
  display: "flex",
  alignItems: "flex-end",
  minHeight: ["175px", "250px"],
  marginBottom: "10px",
})

export const HoverCard = ({ children, ...styles }) => {
  const [hovered, setHovered] = useState(false)
  const handleMouseEnter = () => { setHovered(true) }
  const handleMouseLeave = () => { setHovered(false) }

  return <Card
    {...styles}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    transition="0.3s transform"
    transform={`translateY(${hovered ? "-3px" : "0px"})`}
  >{children}</Card>
}

export const TagCard = ({ tag, children }) => {
  return <Link to={`/tags/${kebabCase(tag)}/`}>
    <HoverCard>
      {children}
      &nbsp;&rarr;
    </HoverCard>
  </Link>
}

export const Divider = () => (
  <Box marginTop="30px">
    <hr/>
  </Box>
)
