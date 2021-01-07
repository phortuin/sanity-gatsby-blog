import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../containers/layout'

const IndexPage = (props) => {
  return (
    <Layout>
      <SEO title='index' description='beschrijving' />
      <Container>
        <h1>Welcome</h1>
      </Container>
    </Layout>
  )
}

export default IndexPage
