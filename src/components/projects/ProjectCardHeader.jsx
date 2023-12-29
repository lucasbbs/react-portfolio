import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const ProjectCardHeader = (props) => {
  const { topics, devicons } = props;
  const [entered, setEntered] = useState(false);
  const styles = {
    triangle: {
      borderLeft: '22px solid transparent',
      borderRight: '22px solid #149ddd',
      borderBottom: '22px solid transparent',
      borderTop: '22px solid #149ddd',
      display: 'inline-block',
    },
  };
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', overflow: 'hidden', position: 'relative', minHeight: '22px',
    }}
    >
      <div
        className="card-code-header"
        onMouseEnter={() => setEntered(true)}
        onMouseLeave={() => setEntered(false)}
      >
        <div style={styles.triangle}>
          <i
            style={{
              color: '#000000', backgroundColor: '#149ddd', border: 'none', lineHeight: '22px', transform: 'translateY(-22px)', opacity: entered ? 0 : 1,
            }}
            className="fa-solid fa-code"
          />
          <>
            {entered && (
              <div style={{ transform: 'translateY(-44px)' }}>
                {topics.map((topic) => (
                  <OverlayTrigger
                    key={topic}
                    trigger={['hover', 'focus']}
                    placement="top"
                    overlay={(<Popover style={{ color: 'black', padding: '0 10px', textTransform: 'capitalize' }}>{topic}</Popover>)}
                  >
                    <i
                      style={{
                        marginLeft: 5, color: '#000000', backgroundColor: '#149ddd', border: 'none', lineHeight: '22px', transform: 'translateY(-44px)',
                      }}
                      className={`devicon-${topic}-${devicons[topic]}`}
                    />
                  </OverlayTrigger>
                ))}
              </div>
            )}

          </>
        </div>
      </div>

    </div>
  );
};

ProjectCardHeader.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  devicons: PropTypes.object.isRequired,
};

export default ProjectCardHeader;
