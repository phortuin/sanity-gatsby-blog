const typeDefs = require('./src/lib/type-defs')
const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// TODO: find a better way to define locales here
const locales = ['en', 'nl']

const createLocalePage = (page, createPage) => {
  const {path, context, ...rest} = page

  const baseLocalePath = `/${process.env.LOCALE}${path[process.env.LOCALE]}`

  createPage({
    ...rest,
    path: baseLocalePath,
    context: {
      ...context,
      locale: process.env.LOCALE
    }
  })

  if (locales.length) {
    locales.forEach((code) => {
      const {path, context, ...rest} = page

      if (path[code]) {
        const localePath = `/${code}${path[code]}`

        createPage({
          ...rest,
          path: localePath,
          context: {
            ...context,
            locale: code
          }
        })
      }
    })
  }
}

async function createBlogOverviewPages (graphql, actions) {
  const {createPage} = actions

  let path

  if (locales.length) {
    locales.forEach((loc, index) => {
      path = {
        [loc]: '/blogs/',
        ...path
      }

      const page = {
        path,
        component: require.resolve('./src/templates/blog/blog-overview/blog-overview.js')
      }

      createLocalePage(page, createPage)
    })
  }

  path = {
    [process.env.LOCALE]: '/blogs/'
  }

  const page = {
    path,
    component: require.resolve('./src/templates/blog/blog-overview/blog-overview.js')
  }

  createLocalePage(page, createPage)
}

async function createBlogArchivePages (graphql, actions) {
  const {createPage} = actions

  let path

  if (locales.length) {
    locales.forEach((loc, index) => {
      path = {
        [loc]: '/blogs/archive/',
        ...path
      }

      const page = {
        path,
        component: require.resolve('./src/templates/blog/blog-archive/blog-archive.js')
      }

      createLocalePage(page, createPage)
    })
  }

  path = {
    [process.env.LOCALE]: '/blogs/archive/'
  }

  const page = {
    path,
    component: require.resolve('./src/templates/blog/blog-archive/blog-archive.js')
  }

  createLocalePage(page, createPage)
}

async function createBlogPostPages (graphql, actions) {
  const {createPage} = actions

  const result = await graphql(`
    {
      allSanityPost(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
            slugLocale {
              _type
              nl {
                current
              }
              en {
                current
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      let path
      const {id, slug = {}, slugLocale} = edge.node

      if (slugLocale) {
        for (const [key, value] of Object.entries(slugLocale)) {
          if (!value) return
          path = {
            [key]: `/blog/${value.current}/`,
            ...path
          }
        }
      } else {
        path = {
          [process.env.LOCALE]: `/blog/${slug.current}/`
        }
      }

      delete path._type

      const page = {
        path,
        component: require.resolve('./src/templates/blog/blog-post/blog-post.js'),
        context: {id}
      }

      createLocalePage(page, createPage)
    })
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions
  createTypes(typeDefs)
}

exports.createPages = async ({graphql, actions}) => {
  await createBlogOverviewPages(graphql, actions)
  await createBlogArchivePages(graphql, actions)
  await createBlogPostPages(graphql, actions)
}
