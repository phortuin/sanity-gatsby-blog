import React from 'react'
import Proptypes from 'prop-types'
import {createLocaleTextGetter} from '../util'
import {CurrentLocaleProvider} from '../hooks/i18n'

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
        <CurrentLocaleProvider value={this.props.pageContext.locale}>
          <Component
            {...this.props}
            data={this.getLocalizedContent(this.props.data)}
          />
        </CurrentLocaleProvider>
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
