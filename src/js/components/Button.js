import React from 'react';

import Trackable from './Trackable';

class Button extends Trackable {

  constructor(props) {
    super(props);
  }

  getTagName() {
    return 'button';
  }

  getAttributes() {
    const attributes = super.getAttributes();

    if (this.props.onBlur) {
      attributes.onBlur = this.props.onBlur;
    }
    
    return attributes;
  }
}

export default Button;
