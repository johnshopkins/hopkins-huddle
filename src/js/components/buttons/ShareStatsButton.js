import React, { useState } from 'react';

import Button from '../Button';

export default ({ emojis }) => {

  const [buttonText, setButtonText] = useState('Share your results');

  const shareText = `Just finished Hopkins Huddle. Join the word puzzle fun at https://thankyou.jhu.edu
${emojis}`;

  const onClick = () => {
    window.navigator.clipboard.writeText(shareText).then(() => {
      setButtonText('Copied to clipboard');
    }).catch(error => {
      setButtonText('Failed to copy your results');
      logger.log('Failed to copy results to user clipboard', {
        level: 'warning',
        data: { error: error }
      });
    });
  };

  return <Button
    aria-live={'polite'}
    onClick={buttonText === 'Share your results' ? onClick : null}
    onBlur={() => setButtonText('Share your results')}
    text={buttonText}
    category={'Social Media'}
    action={'Copy stats'}
    label={'Copy stats'}
  />;

};
