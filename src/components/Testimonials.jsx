// Import Swiper React components
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import Item, { Flex, Square } from './Item';
import './Testimonials.css';

const initialItems = [
  <div className="fade-in">
    <Item className="testimonial-item" style={{ fontSize: 16 }}>
      <div className="testimonial">
        <i className="fa-solid fa-quote-left top" />
        <div>
          Lucas is a fantastic person, very polite, hardworking and attentive to
          details. Always willing to learn, teach and work hard, he combines several
          skills that a great professional and competent teams need! I&apos;m very happy
          to have participated in his trajectory and he in mine.
        </div>
        <i className="fa-solid fa-quote-right bottom" />
      </div>
    </Item>
    <div>
      <img style={{ borderRadius: '50%' }} src="https://media.licdn.com/dms/image/D4D03AQFfvXNHilJEqA/profile-displayphoto-shrink_100_100/0/1692455115822?e=1709164800&v=beta&t=NFzZ8-IIqtQBBhmemT_3mCz95tUr8lp1jG6srafufbs" alt="" />
    </div>
  </div>,
  <div className="fade-in">
    <Item className="testimonial-item" style={{ fontSize: 16 }}>
      <div className="testimonial">
        <i className="fa-solid fa-quote-left top" />
        <div>
          I had the privilege of collaborating with Lucas, and right from the start,
          I was struck by his unwavering commitment to honesty, diligence, and
          professionalism. His meticulous approach to our discussions on tasks and
          potential solutions exemplified these values, making him one of the people
          that delivers enhanced value in the field of software development.
        </div>
        <i className="fa-solid fa-quote-right bottom" />
      </div>
    </Item>
    <div>
      <img style={{ borderRadius: '50%' }} src="https://media.licdn.com/dms/image/D4D03AQGXrWoQ8s3Kvw/profile-displayphoto-shrink_100_100/0/1680769881769?e=1709164800&v=beta&t=dQFvvSzCT1rBTz74yguTEN8cZcyQr7uGQuNAwRQKCMI" alt="" />
    </div>
  </div>,
  <div className="fade-in">
    <Item className="testimonial-item" style={{ fontSize: 16 }}>
      <div className="testimonial">
        <i className="fa-solid fa-quote-left top" />
        <div>
          I had a wonderful experience working with Lucas. He&apos;s always
          ready to help, learn, and delivering excellent quality. Any
          company would be lucky to have a professional like Lucas on their team.
        </div>
        <i className="fa-solid fa-quote-right bottom" />
      </div>
    </Item>
    <div>
      <img style={{ borderRadius: '50%' }} src="https://media.licdn.com/dms/image/C4D03AQG-uSPZth8g7A/profile-displayphoto-shrink_100_100/0/1649360481409?e=1709164800&v=beta&t=lPZgD7A8y5hQHrBLb0bHL17NswM25yocXQ9ybYq8tqk" alt="" />
    </div>
  </div>,
  <div className="fade-in">
    <Item className="testimonial-item" style={{ fontSize: 16 }}>
      <div className="testimonial">
        <i className="fa-solid fa-quote-left top" />
        <div>
          Lucas is next level when it comes to service and execution. He is has a lot
          of creative ideas for my projects; www.geekster.dk and www.quizedu.dk and
          he is never afraid of thinking in new and innovative ways. I have yet to
          see a thing that Lucas can´t create and the last icing on the cake: he is a
          super nice guy to work with! Looking forward to develop a new project with him :)
          <br />
          Jesper Albinus, owner of www.geekster.dk and www.quizedu.dk
        </div>
        <i className="fa-solid fa-quote-right bottom" />
      </div>
    </Item>
    <div>
      <img style={{ borderRadius: '50%' }} src="https://media.licdn.com/dms/image/C4E03AQGxPRf2pL-NVQ/profile-displayphoto-shrink_100_100/0/1517608512601?e=1709164800&v=beta&t=ILbhMUrHqZ5qkQQam6Sjp8gb0CxWEtHJd8T52xjONgY" alt="" />
    </div>
  </div>,
];

const Testimonials = (props) => {
  const { header } = props;
  const [items, setItems] = useState(initialItems);
  const carouselRef = useRef();
  // let resetTimeout; // decalre at state level
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  useEffect(() => {
    const updateItemsWithDelay = () => {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < initialItems.length; index++) {
        const delay = index * 100;
        setTimeout(() => {
          setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = React.cloneElement(updatedItems[index], {
              className: 'fade-in testimonial-item aos-animate',
            });
            return updatedItems;
          });
        }, delay);
      }
    };
    updateItemsWithDelay();
  }, [initialItems]);

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(0);
    }
  };

  const onPrevStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(items.length);
    }
  };

  return (
    <>
      <Helmet>
        <title>Testimonials | Lucas&apos; portfolio</title>
      </Helmet>
      <h1
        style={{
          fontSize: '3em',
          fontWeight: 'bold',
          marginBottom: 0,
          lineHeight: 1.5,
          color: '#fff',
        }}
      >
        {header}
      </h1>
      <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <Carousel
          style={{ margin: 'auto' }}
          ref={carouselRef}
          breakPoints={breakPoints}
          loop
          itemsToScroll={1}
          itemsToShow={3}
          enableAutoPlay={false}
          autoPlaySpeed={3000}
          disableArrowsOnEnd={false}
          onNextStart={onNextStart}
          onPrevStart={onPrevStart}
          enableMouseSwipe
        // onNextEnd={() => {
        //   clearTimeout(resetTimeout);
        //   resetTimeout = setTimeout(() => {
        //     carouselRef?.current?.goTo(0);
        //   }, 10000); // same time
        // }}
          renderPagination={({ pages, activePage, onClick }) => (
            <Flex direction="row">
              {pages.map((page) => {
                const isActivePage = activePage === page;
                return (
                  <Square
                    key={page}
                    onClick={() => onClick(page)}
                    active={isActivePage}
                  />
                );
              })}
            </Flex>
          )}
        >
          {items}
        </Carousel>
      </div>
    </>
  );
};

Testimonials.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Testimonials;
