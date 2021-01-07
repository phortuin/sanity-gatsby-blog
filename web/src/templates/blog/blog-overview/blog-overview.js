import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../../../lib/helpers'
import BlogPostPreviewList from '../../../components/blog-post-preview-list/blog-post-preview-list'
import Container from '../../../components/container/container'
import GraphQLErrorList from '../../../components/graphql-error-list/graphql-error-list'
import SEO from '../../../components/seo/seo'
import Layout from '../../../containers/layout'
import localize from '../../../components/localize/localize'

export const query = graphql`
  query BlogOverviewTemplateQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      ...siteSettings
    }
    posts: allSanityPost(
      limit: 6
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

const BlogOverviewTemplate = (props) => {
  const {data, errors, pageContext} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        lang={pageContext.locale}
      />
      <Container>
        <h1>Welcome to {site.title}</h1>
        {postNodes && (
          <BlogPostPreviewList
            title='Latest blog posts'
            nodes={postNodes}
            browseMoreHref={`/${pageContext.locale}/archive/`}
          />
        )}
      </Container>
    </Layout>
  )
}

export default localize(BlogOverviewTemplate)
