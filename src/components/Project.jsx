import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import leftStyles from './project.module.css';

function Project(props) {
  const { header } = props;

  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch README content from GitHub API
        const response = await axios.get(`https://api.github.com/repos/lucasbbs/${header}/readme`, {
          headers: {
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        setMarkdownContent(response.data);
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    };

    fetchData();
  }, [props]);

  return (
    <div className={leftStyles.left}>
      <Helmet>
        <title>
          { header }
          {' '}
          | Lucas&apos; Portfolio
        </title>
      </Helmet>
      <ReactMarkdown
        style={{ textAlign: 'right' }}
        transformImageUri={(uri) => `https://github.com/lucasbbs/beginning-php-and-mysql-5e/raw/master/${uri}`}
      >
        {markdownContent}

      </ReactMarkdown>

    </div>
  );
}

Project.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Project;
