import React from 'react'
import Proptypes from 'prop-types'
import {createLocaleTextGetter} from '../util'

function localize (Component) {
  return class Localize extends React.Component {
    constructor (props) {
      super(props)

      this.getLocalizedContent = createLocaleTextGetter(
        this.props.pageContext.locale || process.env.LOCALE
      )
    }
    render () {
      return (
        <Component
          {...this.props}
          data={this.getLocalizedContent(this.props.data)}
          locale={this.props.pageContext.locale}
        />
      )
    }
  }
}

localize.propTypes = {
  data: Proptypes.object,
  pageContext: Proptypes.shape({
    locale: Proptypes.string
  })
}

export default localize
