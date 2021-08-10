import React, { FC } from 'react'
import kebabCase from 'lodash/kebabCase'
import { Link } from "gatsby"
import { Divider } from './ui'

type Props = {
  tags: string[]
}

const TagsList: FC<Props> = ({ tags }) => {
  return <div>
    <span>Find more posts related to {' '}</span>
    {tags.map(tag => (
      <span><Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>{tag.fieldValue}</Link>{' '}</span>
    ))}
    <Divider />
  </div>
}

export default TagsList
