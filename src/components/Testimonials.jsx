/* eslint-disable comma-dangle */
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { Helmet } from 'react-helmet';
import Item, { Flex, Square } from './Item';
import endpoints from '../constants/endpoints';
import './Testimonials.css';
import { useLanguageContext } from '../TranslateContext';

const InitialItems = (data) => data.map((d) => (
  <div className="fade-in">
    <Item className="testimonial-item" style={{ fontSize: 16 }}>
      <div className="testimonial">
        <i className="fa-solid fa-quote-left top" />
        <div>
          {d.text}
        </div>
        <i className="fa-solid fa-quote-right bottom" />
      </div>
    </Item>
    <div>
      <img style={{ height: 100, borderRadius: '50%' }} src={`images/testimonials/${d.picture}`} alt="" />
    </div>
  </div>
));

const Testimonials = () => {
  const [data, setData] = useState();
  const [testimonials, setTestimonials] = useState();
  const [items, setItems] = useState();
  const carouselRef = useRef();
  // let resetTimeout; // decalre at state level
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];
  const { t, i18n } = useLanguageContext();
  useEffect(() => {
    fetch(endpoints.testimonials, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.testimonials[i18n.language]))
      .catch((err) => err);
  }, [i18n]);

  useEffect(() => {
    if (!data) return;
    const initialItems = InitialItems(data);
    setItems(initialItems);
    setTestimonials(initialItems);
  }, [data]);

  useEffect(() => {
    if (!testimonials) return;
    const updateItemsWithDelay = () => {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < testimonials.length; index++) {
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
  }, [testimonials]);

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
        <title>
          {t('testimonials.title') + ' | ' + t('home.name')}
        </title>
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
        {t('testimonials.title')}
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

export default Testimonials;
