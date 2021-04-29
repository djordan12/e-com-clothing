import React from 'react';
import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

/**
 * Functional Component, we don't need lifecycle methods or store any state
 */
const HomePage = () => (
    <div className='homepage'>
        <Directory/>
    </div>
)

export default HomePage;