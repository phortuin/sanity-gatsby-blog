export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5fe9d21b69f90d48e17cdeb6',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-d26b94kz',
                  apiId: '8981befb-f512-4a57-b01d-d5f74c10315f'
                },
                {
                  buildHookId: '5fe9d21bb6d01ba1686fab64',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-w5h1atuj',
                  apiId: '790e0372-d5d7-46bf-bbfa-16c1c3959a44'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/phortuin/sanity-gatsby-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-gatsby-blog-web-w5h1atuj.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
