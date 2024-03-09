import React from 'react';
import PropTypes from 'prop-types';

import Trackable from './Trackable';

class Link extends Trackable {

  constructor(props) {
    super(props);
  }

  getAttributes() {
    const attributes = super.getAttributes();
    attributes.href = this.props.url;
    return attributes;
  }
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  ...Trackable.propTypes
};

export default Link;
