import React, { useEffect, useState } from 'react';
import SocialIcon from './SocialIcon';
import endpoints from '../constants/endpoints';

function Social() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      {data ? data.social.map((social) => (
        <SocialIcon
          social={social}
        />
      )) : null}
    </div>
  );
}

export default Social;
