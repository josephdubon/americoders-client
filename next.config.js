const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
  images: {
    domains: ['americodersbucket.s3.us-west-2.amazonaws.com'],
  },
})
