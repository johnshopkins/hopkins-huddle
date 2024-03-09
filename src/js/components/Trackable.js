import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Trackable extends Component {

  constructor(props) {
    super(props);
  }

  getAttributes() {

    const attributes = {};
    const classes = this.props.classes;

    // for analytics tracking
    if (this.props.action && this.props.category && this.props.label) {
      classes.push('gtm-click');
      attributes['data-action'] = this.props.action;
      attributes['data-category'] = this.props.category;
      attributes['data-label'] = this.props.label;
    }

    if (this.props.onClick) attributes.onClick = this.props.onClick;
    if (this.props.onMouseOut) attributes.onMouseOut = this.props.onMouseOut;
    if (this.props.onMouseOver) attributes.onMouseOver = this.props.onMouseOver;
    
    if (this.props.classes.length > 0) attributes.className = classes.join(' ');

    return attributes;
  }

  getTagName() {
    return 'a';
  }

  render() {

    const TagName = this.getTagName();
    const attributes = this.getAttributes();

    return <TagName {...attributes}>{this.props.text}</TagName>
  }

}

Trackable.defaultProps = {
  action: 'Click',
  category: 'Content Area',
  classes: [],
  label: null,
  text: 'Click here',
};

Trackable.propTypes = {
  action: PropTypes.string,
  category: PropTypes.string,
  classes: PropTypes.array,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  // text: PropTypes.string,
};

export default Trackable;
