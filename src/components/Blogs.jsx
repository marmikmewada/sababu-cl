

import React from 'react';
import { useEffect } from 'react';
import useStore from '../zustand/store';
import BlogPost from './BlogPost';
import styles from './Blogs.module.css';

function Blogs() {
  const { latestEvents, fetchLatestEvents, isLoading } = useStore();

  // useEffect(() => {
  //   fetchLatestEvents();
  // });

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading indicator component
  }

  console.log(latestEvents);
  // console.log(latestEvents[0].images[0])
  return (
    <section className={`${'section sectionLayout'}`}>
      <p className={`${'intro'}`}>Blogs & news</p>
      <div className={styles.blogList}>
        <h1 className={`${'headingSecondary'}`}>News and Blogs</h1>
        <ul className={`${'grid gridFourCol'} ${styles.blogLayout}`}>
          {latestEvents.map((event) => (
            <BlogPost
              key={event._id} // Assuming event has an id field, adjust as per your data structure
              imgUrl={event.images[0]} // Adjust fields based on your event data structure
              title={event.name}
              author={event.author}
              postedDate={event.createdAt}
              views={event.views}
              comments={event.comments}
              likes={event.likes}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Blogs;
