// // import { useEffect } from "react";
// import { HashLink } from "react-router-hash-link";
// import { useMembers } from "../../components/contexts/MemberContext";

// import AppNav from "../../components/AppNav";
// import Button from "../../components/Button";
// import Blogs from "../../components/Blogs";
// import Footer from "../../components/Footer";
// import NewsLetter from "../../components/NewsLetter";
// import SababuStat from "../../components/SababuStat";
// import EventsTab from "../../components/Events";
// import HoverPopup from "../../components/HoverPopup";
// import Loading from "../../components/Loading";

// import styles from "./Home.module.css";

// function Home() {
//   const { isLoading } = useMembers();

//   if (isLoading) return <Loading />;

//   return (
//     <main className={styles.home}>
//       <HeroSection />
//       <BioSection />
//       <SababuStat />
//       <CallToAction />
//       <UpcomingEvents />
//       <BlogPosts />
//       <NewsLetter />
//       <Footer />
//     </main>
//   );
// }

// function HeroSection() {
//   return (
//     <>
//       <AppNav />
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <h1 className={`${"headingSecondary"} ${styles.tagline}`}>
//             Sababu Fund,{" "}
//             <span className={styles.taglineStyle}>
//               Uniting and Healing Communities
//             </span>
//           </h1>
//           <p className={styles.heroDescription}>
//             A community organization providing relief and emotional support and
//             awareness, and connecting members with services and opportunities in
//             communities they live.
//           </p>
//           {/* <Button></Button> */}
//           <HashLink to="/" className="cta">
//             Learn more
//           </HashLink>
//         </div>
//       </section>
//     </>
//   );
// }

// function BioSection() {
//   return (
//     <section className={`${"section sectionLayout"} ${styles.bioContainer}`}>
//       <p className={`${"intro"}`}>Who we are</p>
//       <div className={`${"grid gridTwoCol"} ${styles.bioContent}`}>
//         <div className={styles.bio}>
//           <h1 className={`${"headingSecondary"}`}>Sababu Fund Organization</h1>
//           <p>
//             Sababu Fund is a non-profit community based organization founded in
//             Herndon, Virginia in 2022. Initially focused on assisting grieving
//             families by providing essential items and resources, the
//             organization has expanded its scope to encompass a wider range of
//             services, such as covering funeral cost relief to its members, aid
//             for disadvantaged individuals, and empowerment of families to
//             overcome obstacles and attain their aspirations. Sababu Fund is
//             committed to creating a positive influence in its community and
//             offering assistance to those in need through various programs and
//             initiatives.
//           </p>
//           <div className={styles.missionVision}>
//             <h3 className={`${"headingTertiary"}`}>Our Mission</h3>
//             <ul className={styles.missionVisionList}>
//               <li className={styles.mission}>
//                 <HoverPopup
//                   content={
//                     <div>
//                       <HashLink to="/about#mission">
//                         <h1>Mission</h1>
//                       </HashLink>
//                       <p>
//                         To support members and families through challenging
//                         times with empathy and resources, fostering a sense of
//                         togetherness and resilience.
//                       </p>
//                     </div>
//                   }
//                 />
//               </li>
//               <li className={styles.vision}>
//                 <HoverPopup
//                   content={
//                     <div>
//                       <HashLink to="/about#vision">
//                         <h1>Vision</h1>
//                       </HashLink>
//                       <p>
//                         To assume a leadership role in providing support and
//                         resources for all, ensuring that Sierra Leoneans in the
//                         diaspora can thrive and access essential social
//                         services.
//                       </p>
//                     </div>
//                   }
//                 />
//               </li>
//               <li className={styles.impact}>
//                 <HoverPopup
//                   content={
//                     <div>
//                       <HashLink to="/about#impact">
//                         <h1>Our Impact in the Community</h1>
//                       </HashLink>
//                       <p>
//                         At Sababu Fund, we firmly believe in the power of
//                         compassionate support to navigate the challenges of
//                         grief and strengthen community bonds. Our unwavering
//                         commitment lies in providing essential grief support and
//                         social services to our members in need. Through our
//                         programs, we strive to make a meaningful impact on the
//                         lives of countless individuals- our members, their
//                         families, and communities, fostering resilience and
//                         solidarity during difficult times.
//                       </p>
//                       <p>
//                         Together, we can make a real difference in the lives of
//                         those in need. Join the Sababu Fund community today and
//                         help us empower communities and change lives.
//                       </p>
//                     </div>
//                   }
//                 />
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className={styles.bioImages}>
//           <img
//             src="/images/sb-bg-1.jpg"
//             alt="Two people parking boxes"
//             className={styles.bioImageOne}
//           />
//           <img
//             src="/images/sb-agm-members2-2023.jpg"
//             alt="Two people parking boxes"
//             className={styles.bioImageTwo}
//           />
//           <img
//             src="/images/sb-agm-members1-2023.jpg"
//             alt="Two people parking boxes"
//             className={styles.bioImageThree}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// function CallToAction() {
//   return (
//     <section className={`${"section sectionLayout"}`}>
//       <p className={`${"intro"}`}>Join us</p>
//       <div className={`${"grid gridTwoCol"} ${styles.join}`}>
//         <div className={styles.joinImage}>
//           <img
//             src="/images/sb-sharing-6.jpg"
//             alt="A lady smiling and helping a man with paperwork"
//           />
//         </div>
//         <div className={styles.joinContent}>
//           <h1 className={`${"headingPrimary"}`}>
//             Sababu, a Supportive Community
//           </h1>
//           <p>
//             The significance of providing emotional support to someone going
//             through grief and emotional challenges cannot be overstated.
//             Accessible peer support groups and online resources to help ease the
//             burden of loss are crucial. Our objective is to promote healing and
//             facilitate a healthy grieving process. Sababu Fund volunteers embody
//             altruism, collaborating with the organization to enhance the
//             community&apos;s future and advance its mission of positive change
//             and empowerment.
//           </p>
//           <div className={styles.joinBtns}>
//             <HashLink className="cta" to="/app/membership#top">
//               Join today
//             </HashLink>
//             <Button type="memberBtnOutline">Donate Now</Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function UpcomingEvents({ newData }) {
//   // const { eventsData } = useMembers();
//   return (
//     <section className={`${"section sectionLayout"} ${styles.upcomingEvents}`}>
//       <EventsTab newData={newData} />
//     </section>
//   );
// }

// function BlogPosts() {
//   return (
//     <div id="blogs">
//       <Blogs />
//     </div>
//   );
// }

// export default Home;


import React, { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import useStore from '../../zustand/store';
import AppNav from '../../components/AppNav';
import Button from '../../components/Button';
import Blogs from '../../components/Blogs';
import Footer from '../../components/Footer';
import NewsLetter from '../../components/NewsLetter';
import SababuStat from '../../components/SababuStat';
// import EventsTab from '../../components/Events';
import HoverPopup from '../../components/HoverPopup';
import Loading from '../../components/Loading';

import styles from './Home.module.css';

function Home() {
  const { isLoading, latestEvents, fetchLatestEvents } = useStore();

  useEffect(() => {
    fetchLatestEvents();
  }, [fetchLatestEvents]);

  if (isLoading) return <Loading />;

  return (
    <main className={styles.home}>
      <HeroSection />
      <BioSection />
      <SababuStat />
      <CallToAction />
      <UpcomingEvents newData={latestEvents} />
      <BlogPosts />
      <NewsLetter />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <>
      <AppNav />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${'headingSecondary'} ${styles.tagline}`}>
            Sababu Fund,{" "}
            <span className={styles.taglineStyle}>Uniting and Healing Communities</span>
          </h1>
          <p className={styles.heroDescription}>
            A community organization providing relief and emotional support and awareness, and
            connecting members with services and opportunities in communities they live.
          </p>
          <HashLink to="/" className="cta">
            Learn more
          </HashLink>
        </div>
      </section>
    </>
  );
}

function BioSection() {
  return (
    <section className={`${'section sectionLayout'} ${styles.bioContainer}`}>
      <p className={`${'intro'}`}>Who we are</p>
      <div className={`${'grid gridTwoCol'} ${styles.bioContent}`}>
        <div className={styles.bio}>
          <h1 className={`${'headingSecondary'}`}>Sababu Fund Organization</h1>
          <p>
            Sababu Fund is a non-profit community based organization founded in Herndon, Virginia in
            2022. Initially focused on assisting grieving families by providing essential items and
            resources, the organization has expanded its scope to encompass a wider range of
            services, such as covering funeral cost relief to its members, aid for disadvantaged
            individuals, and empowerment of families to overcome obstacles and attain their
            aspirations. Sababu Fund is committed to creating a positive influence in its community
            and offering assistance to those in need through various programs and initiatives.
          </p>
          <div className={styles.missionVision}>
            <h3 className={`${'headingTertiary'}`}>Our Mission</h3>
            <ul className={styles.missionVisionList}>
              <li className={styles.mission}>
                <HoverPopup
                  content={
                    <div>
                      <HashLink to="/about#mission">
                        <h1>Mission</h1>
                      </HashLink>
                      <p>
                        To support members and families through challenging times with empathy and
                        resources, fostering a sense of togetherness and resilience.
                      </p>
                    </div>
                  }
                />
              </li>
              <li className={styles.vision}>
                <HoverPopup
                  content={
                    <div>
                      <HashLink to="/about#vision">
                        <h1>Vision</h1>
                      </HashLink>
                      <p>
                        To assume a leadership role in providing support and resources for all,
                        ensuring that Sierra Leoneans in the diaspora can thrive and access essential
                        social services.
                      </p>
                    </div>
                  }
                />
              </li>
              <li className={styles.impact}>
                <HoverPopup
                  content={
                    <div>
                      <HashLink to="/about#impact">
                        <h1>Our Impact in the Community</h1>
                      </HashLink>
                      <p>
                        At Sababu Fund, we firmly believe in the power of compassionate support to
                        navigate the challenges of grief and strengthen community bonds. Our unwavering
                        commitment lies in providing essential grief support and social services to our
                        members in need. Through our programs, we strive to make a meaningful impact on
                        the lives of countless individuals- our members, their families, and communities,
                        fostering resilience and solidarity during difficult times.
                      </p>
                      <p>
                        Together, we can make a real difference in the lives of those in need. Join the
                        Sababu Fund community today and help us empower communities and change lives.
                      </p>
                    </div>
                  }
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bioImages}>
          <img
            src="/images/sb-bg-1.jpg"
            alt="Two people parking boxes"
            className={styles.bioImageOne}
          />
          <img
            src="/images/sb-agm-members2-2023.jpg"
            alt="Two people parking boxes"
            className={styles.bioImageTwo}
          />
          <img
            src="/images/sb-agm-members1-2023.jpg"
            alt="Two people parking boxes"
            className={styles.bioImageThree}
          />
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={`${'section sectionLayout'}`}>
      <p className={`${'intro'}`}>Join us</p>
      <div className={`${'grid gridTwoCol'} ${styles.join}`}>
        <div className={styles.joinImage}>
          <img
            src="/images/sb-sharing-6.jpg"
            alt="A lady smiling and helping a man with paperwork"
          />
        </div>
        <div className={styles.joinContent}>
          <h1 className={`${'headingPrimary'}`}>
            Sababu, a Supportive Community
          </h1>
          <p>
            The significance of providing emotional support to someone going through grief and
            emotional challenges cannot be overstated. Accessible peer support groups and online
            resources to help ease the burden of loss are crucial. Our objective is to promote
            healing and facilitate a healthy grieving process. Sababu Fund volunteers embody
            altruism, collaborating with the organization to enhance the community's future and
            advance its mission of positive change and empowerment.
          </p>
          <div className={styles.joinBtns}>
            <HashLink className="cta" to="/app/membership#top">
              Join today
            </HashLink>
            <Button type="memberBtnOutline">Donate Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// function UpcomingEvents({ newData }) {
//   return (
//     <section className={`${'section sectionLayout'} ${styles.upcomingEvents}`}>
//       <EventsTab newData={newData} />
//     </section>
//   );
// }
function UpcomingEvents({ newData }) {
  console.log(newData)
  return (
    <section className={`${'section sectionLayout'} ${styles.upcomingEvents}`}>
      {/* <EventsTab newData={newData} /> */}
    </section>
  );
}


function BlogPosts() {
  return (
    <div id="blogs">
      <Blogs />
    </div>
  );
}

export default Home;


