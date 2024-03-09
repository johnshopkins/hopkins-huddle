import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ autoRedirect, message, redirect, seconds, testing }) => {

  if (redirect) {
    message += ` <a href=${redirect}>Click here</a> to pick up where you left off`
  }

  if (autoRedirect) {
    message += `; otherwise, you will be redirected in ${seconds} seconds.`;
    if (!testing) {
      setTimeout(() => window.location.href = redirect,seconds * 1000);
    }
  } else {
    message += '.';
  }

  if (seconds === 0 ) {
    return !testing ? null : <p>Redirect instantly to {redirect}.</p>;
  }

  return (
    <>
      <div className="big-message force">
        <h1>Whoa, slow down.</h1>
      </div>
      <div className="little-message force">
        <p className={'error'} dangerouslySetInnerHTML={{__html: message}} />
      </div>
    </>
  )
}

Error.defaultProps = {
  autoRedirect: true,
  redirect: false,
  seconds: 5,
};

Error.propTypes = {
  autoRedirect: PropTypes.bool,
  message: function(props, propName) {
    if ((props['redirect'] === false && (props[propName] == undefined || typeof(props[propName]) !== 'string'))) {
      return new Error('Please provide a message.');
    }
  },
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  seconds: PropTypes.number,
};

export default Error;
