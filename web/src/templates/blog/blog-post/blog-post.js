import React from 'react'
import {graphql} from 'gatsby'
import Container from '../../../components/container/container'
import GraphQLErrorList from '../../../components/graphql-error-list/graphql-error-list'
import BlogPost from '../../../components/blog-post/blog-post'
import SEO from '../../../components/seo/seo'
import Layout from '../../../containers/layout'
import {toPlainText} from '../../../lib/helpers'
import localize from '../../../components/localize/localize'

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: {eq: $id}) {
      ...postFields
      authors {
        _key
        author {
          ...authorFields
        }
      }
    }
  }
`

const BlogPostTemplate = (props) => {
  const {data, errors, pageContext} = props
  const post = data && data.post

  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
          lang={pageContext.locale}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost {...post} />}
    </Layout>
  )
}

export default localize(BlogPostTemplate)
