import React from 'react';

import Link from '../Link';

export default ({ puzzleData }) => 
  <Link 
    classes={['homepage']} 
    text={'Go back to the homepage'}
    label={'Homepage'} 
    url={puzzleData.baseUrlWithYear} 
  />
