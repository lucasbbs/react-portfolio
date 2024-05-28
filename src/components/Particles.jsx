import Particles from 'react-particles-js';
import React, { useEffect, useRef } from 'react';

const ParticlesComponent = () => {
  const options = {
    particles: {
      number: {
        value: 50,
      },
    },
    size: {
      value: 8,
      anim: {
        enable: true,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        resize: true,
      },
    },
  };
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [window.innerHeight, window.innerWidth]);

  return (
    <Particles
      width="100vw"
      height="100vh"
      params={options}
    />
  );
};

export default ParticlesComponent;
