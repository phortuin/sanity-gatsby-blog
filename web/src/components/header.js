import {Link} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'

import styles from './header.module.css'
import {useCurrentLocale} from '../hooks/i18n'

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => {
  const locale = useCurrentLocale()

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to={`/${locale}/blogs/`}>{siteTitle}</Link>
        </div>

        <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
          <Icon symbol='hamburger' />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            <li>
              <Link to={`/${locale}/blogs/archive/`}>Archive</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
