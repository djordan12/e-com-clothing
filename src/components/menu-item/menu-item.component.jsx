import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

/**
 * Function Component
 * string interpolation with adding css styles and image urls
 */
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <div
        className={`${size} menu-item`}
        onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div
            className='background-image'
            style={{ backgroundImage: `url(${imageUrl})` }}>
        </div>
        <div
            className='content'>
            <h1
                className='title'>{title.toUpperCase()}
            </h1>
            <span
                className='subtitle'>SHOP NOW
            </span>
        </div>
    </div>
)

// supercharge this component with withRouter which gets me the location, match, history parameters
export default withRouter(MenuItem);