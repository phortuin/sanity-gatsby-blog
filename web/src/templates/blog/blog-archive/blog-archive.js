import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../../../lib/helpers'
import BlogPostPreviewGrid from '../../../components/blog-post-preview-grid/blog-post-preview-grid'
import Container from '../../../components/container/container'
import GraphQLErrorList from '../../../components/graphql-error-list/graphql-error-list'
import SEO from '../../../components/seo/seo'
import Layout from '../../../containers/layout'
import localize from '../../../components/localize/localize'

import {responsiveTitle1} from '../../../components/typography/typography.module.css'

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
  }
`

const ArchivePage = (props) => {
  const {data, errors, pageContext} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      <SEO title='Archive' lang={pageContext.locale} />
      <Container>
        <h1 className={responsiveTitle1}>Archive</h1>
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  )
}

export default localize(ArchivePage)
