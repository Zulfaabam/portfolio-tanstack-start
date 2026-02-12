import ErrorContent from '@/components/error-content';
import JourneyImage from '@/components/journey-image';
import Section from '@/components/section';
import { StarsBackground } from '@/components/ui/stars-background';
import { createFileRoute } from '@tanstack/react-router';
import {
  motion,
  Transition,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from 'motion/react';
import { useRef } from 'react';

export const Route = createFileRoute('/journey')({
  errorComponent: ({ reset }) => (
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
      <Section
        id='error-journey'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Journey,
});

function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);
  const star4Ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0%', 'end 70%'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isStar1Visible = useInView(star1Ref, { amount: 1, once: true });
  const isStar2Visible = useInView(star2Ref, { amount: 1, once: true });
  const isStar3Visible = useInView(star3Ref, { amount: 1, once: true });
  const isStar4Visible = useInView(star4Ref, { amount: 1, once: true });

  const contentTransition: Transition = {
    duration: 1,
    ease: [0.7, 0, 0.3, 1],
  };

  const journey1Variants = {
    image1: {
      hidden: { scale: 0, x: -100, y: 150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text1: {
      hidden: { x: -200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image2: {
      hidden: { scale: 0, x: -100, y: 0 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text2: {
      hidden: { x: -200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image3: {
      hidden: { scale: 0, x: -100, y: -150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text3: {
      hidden: { x: -200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
  } as const satisfies Record<string, Variants>;

  const journey2Variants = {
    image1: {
      hidden: { scale: 0, x: 100, y: 150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text1: {
      hidden: { x: 200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image2: {
      hidden: { scale: 0, x: 100, y: 0 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text2: {
      hidden: { x: 200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image3: {
      hidden: { scale: 0, x: 100, y: -150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text3: {
      hidden: { x: 200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
  } as const satisfies Record<string, Variants>;

  const journey3Variants = {
    image1: {
      hidden: { scale: 0, x: 100, y: 150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text1: {
      hidden: { x: 200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image2: {
      hidden: { scale: 0, x: 100, y: 0 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text2: {
      hidden: { x: 200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image3: {
      hidden: { scale: 0, x: 100, y: -150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text3: {
      hidden: { x: 200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
  } as const satisfies Record<string, Variants>;

  const journey4Variants = {
    image1: {
      hidden: { scale: 0, x: -100, y: 150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text1: {
      hidden: { x: -200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image2: {
      hidden: { scale: 0, x: -100, y: 0 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text2: {
      hidden: { x: -200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
    image3: {
      hidden: { scale: 0, x: -100, y: -150 },
      visible: { scale: 1, x: 0, y: 0, transition: contentTransition },
    },
    text3: {
      hidden: { x: -200, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: contentTransition },
    },
  } as const satisfies Record<string, Variants>;

  return (
    <div
      ref={containerRef}
      className='bg-linear-to-b to-darkest relative min-h-screen w-full overflow-hidden from-black via-black'
    >
      <Section id='journey' className='z-10 w-full'>
        <div className='relative z-10 mx-auto py-10 md:px-0 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-5xl text-2xl md:text-4xl'>
            My Journey So Far
          </h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            Here&apos;s my timeline of 3+ years learning, growing, and working
            as a developer.
          </p>
        </div>

        <div className='relative z-10 mt-32 h-fit w-full overflow-x-hidden'>
          <div
            ref={star1Ref}
            className='star-anchor1 absolut left-4 top-[110px] size-fit md:left-[30px]'
          >
            <svg
              width='77'
              height='71'
              viewBox='0 0 77 71'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-8 md:w-[77px]'
            >
              <path
                d='M0.741974 55.266C49.1226 1.72204 48.0168 -1.05226 49.1226 1.72204C50.2284 4.49634 73.4511 71.6344 72.3453 69.9698C71.2395 68.3052 10.6946 13.6515 12.3533 13.9289C14.0121 14.2063 81.192 18.9227 75.3864 20.3098C70.7418 21.4195 23.6882 44.0764 0.741974 55.266Z'
                stroke='#EBBF2F'
                strokeWidth='2'
              />
            </svg>
          </div>
          <p className='year-journey1 text-fg font-caveat text-lg md:text-4xl'>
            2025
          </p>
          <motion.div
            initial='hidden'
            animate={isStar1Visible ? 'visible' : 'hidden'}
            className='content1-journey1 flex items-start gap-4 lg:gap-8'
          >
            <motion.div
              variants={journey1Variants.image1}
              className='-rotate-10'
            >
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764379814/me_in_asl_fj6pef.jpg' />
            </motion.div>
            <motion.div
              variants={journey1Variants.text1}
              className='space-y-0.5 md:space-y-1'
            >
              <p className='text-fg text-xs font-medium md:text-base'>
                PT Tiga Daya Digital Indonesia
              </p>
              <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-base font-bold text-transparent md:text-xl'>
                Frontend Developer
              </p>
              <p className='text-fg/80 text-[10px] md:text-sm'>
                January 2025 - December 2025
              </p>
            </motion.div>
          </motion.div>
          <motion.div className='content2-journey1 flex items-start gap-2 md:items-center md:gap-8'>
            <motion.div
              initial='hidden'
              animate={isStar1Visible ? 'visible' : 'hidden'}
              variants={journey1Variants.image2}
              className='-rotate-2'
            >
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764379814/me_in_asl_fj6pef.jpg' />
            </motion.div>
            <motion.div
              initial='hidden'
              animate={isStar1Visible ? 'visible' : 'hidden'}
              variants={journey1Variants.text2}
              className='text-fg max-w-44 space-y-2 text-xs md:max-w-md md:text-base'
            >
              <p>Contributed in 3 projects:</p>
              <ul className='list-disc pl-6'>
                <li>JBA Indonesia’s Electronic Auction platform</li>
                <li>
                  JAVIS - The internal team’s app to manage content for auction
                </li>
                <li>
                  VISION - A new micro-frontend architectured app to replace
                  JAVIS
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <div className='content3-journey1 flex flex-col gap-7 md:flex-row md:items-end'>
            <motion.div
              initial='hidden'
              animate={isStar1Visible ? 'visible' : 'hidden'}
              variants={journey1Variants.image3}
            >
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764378195/Lelang-Elektronik-JBA-Indonesia_gqigjg.png'
                className='rotate-15'
              />
            </motion.div>
            <motion.div
              initial='hidden'
              animate={isStar1Visible ? 'visible' : 'hidden'}
              variants={journey1Variants.text3}
              className='text-fg max-w-40 space-y-2 text-xs md:max-w-md md:text-base'
            >
              <p>Tech / Tools:</p>
              <div className='flex flex-wrap gap-1 md:gap-2'>
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Tailwind CSS',
                  'Storybook',
                  'BitBucket',
                  'Jira',
                ].map((tech) => (
                  <div key={tech} className='chip'>
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div
            ref={star2Ref}
            className='star-anchor2 absolute right-32 top-[696px] size-fit'
          >
            <svg
              width='75'
              height='67'
              viewBox='0 0 75 67'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.889862 65.7812C33.8197 1.56855 32.0356 -0.826563 33.8197 1.56855C35.6038 3.96366 75.3605 62.8382 73.8627 61.5152C72.3649 60.1923 -0.23006 23.0078 1.44413 22.8479C3.11831 22.688 69.241 9.91374 63.9897 12.7517C59.7886 15.022 20.1727 49.0507 0.889862 65.7812Z'
                stroke='#76C1FF'
                strokeWidth='2'
              />
            </svg>
          </div>
          <p className='year-journey2 text-fg font-caveat max-w-24 text-4xl'>
            2023 - 2024
          </p>
          <motion.div
            initial='hidden'
            animate={isStar2Visible ? 'visible' : 'hidden'}
            className='content1-journey2 flex items-start gap-8'
          >
            <motion.div variants={journey2Variants.text1} className='space-y-1'>
              <p className='text-fg font-medium'>PT Bukit Vista Nusantara</p>
              <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-base font-bold text-transparent md:text-xl'>
                Fulltime Frontend Developer
              </p>
              <p className='text-fg/80 text-sm'>August 2023 - August 2024</p>
            </motion.div>
            <motion.div
              variants={journey2Variants.image1}
              className='rotate-12'
            >
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731677218/DSC08857_l4mkg9.jpg' />
            </motion.div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate={isStar2Visible ? 'visible' : 'hidden'}
            className='content2-journey2 flex items-center gap-8'
          >
            <motion.div
              variants={journey2Variants.text2}
              className='text-fg max-w-xl space-y-2'
            >
              <ul className='list-disc pl-6'>
                <li>
                  Maintained BIGRR - Bukit Vista's internal app to manage
                  properties, booking calendar, finance, and more
                </li>
                <li>
                  Built Tinker - a debugging tool for Bukit Vista's AI called
                  Gaia
                </li>
                <li>
                  Small contribution in BVGO app using Flutter and Bukit Vista's
                  Website using WordPress
                </li>
              </ul>
            </motion.div>
            <motion.div variants={journey2Variants.image2} className='rotate-2'>
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731678675/Screenshot_2024-06-29_160042_dq7ivp.png' />
            </motion.div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate={isStar2Visible ? 'visible' : 'hidden'}
            className='content3-journey2 flex gap-7'
          >
            <motion.div
              variants={journey2Variants.text3}
              className='text-fg max-w-96 space-y-2'
            >
              <p>Tech / Tools:</p>
              <div className='flex flex-wrap gap-2'>
                {[
                  'React',
                  'JavaScript',
                  'Tailwind CSS',
                  'Material UI',
                  'Redux',
                  'WordPress',
                  'Flutter',
                  'GitHub',
                  'Trello',
                ].map((tech) => (
                  <div key={tech} className='chip'>
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={journey2Variants.image3}>
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731507569/tinker_lzjuyc.png'
                className='-rotate-5'
              />
            </motion.div>
          </motion.div>

          <div
            ref={star3Ref}
            className='star-anchor3 absolute bottom-[1081px] left-[399px] size-fit'
          >
            <svg
              width='85'
              height='80'
              viewBox='0 0 85 80'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.356745 32.5715C67.7718 6.82545 68.0459 3.85148 67.7718 6.82545C67.4977 9.79943 57.7117 80.1631 57.482 78.1779C57.2523 76.1927 28.116 0.0100949 29.4681 1.0103C30.8201 2.01051 88.538 36.7098 82.7353 35.3103C78.0931 34.1906 25.882 33.0179 0.356745 32.5715Z'
                stroke='#76C1FF'
                strokeWidth='2'
              />
            </svg>
          </div>
          <p className='year-journey3 text-fg font-caveat text-4xl'>
            2022 - 2023
          </p>
          <motion.div
            initial='hidden'
            animate={isStar3Visible ? 'visible' : 'hidden'}
            className='content1-journey3 flex items-start gap-8'
          >
            <motion.div
              variants={journey3Variants.image1}
              className='-rotate-9'
            >
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679863/bigrr-bookings_weujrk.png' />
            </motion.div>
            <motion.div variants={journey3Variants.text1} className='space-y-1'>
              <p className='text-fg font-medium'>PT Bukit Vista Nusantara</p>
              <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-base font-bold text-transparent md:text-xl'>
                Part-time Frontend Developer
              </p>
              <p className='text-fg/80 text-sm'>July 2022 - August 2023</p>
            </motion.div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate={isStar3Visible ? 'visible' : 'hidden'}
            className='content2-journey3 flex flex-col-reverse items-center gap-4'
          >
            <motion.div
              variants={journey3Variants.text2}
              className='text-fg max-w-xl space-y-2'
            >
              <ul className='list-disc pl-6'>
                <li>
                  Maintained BIGRR - Bukit Vista's internal app to manage
                  properties, booking calendar, finance, and more
                </li>
                <li>
                  Refactored almost all of BIGRR's features using modern React
                  best practices: lazy loading, code splitting, Context API, and
                  more
                </li>
              </ul>
            </motion.div>
            <motion.div variants={journey3Variants.image2} className='rotate-4'>
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731680448/guest-portal-es_ymmjyi.png' />
            </motion.div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate={isStar3Visible ? 'visible' : 'hidden'}
            className='content3-journey3 flex items-end gap-7'
          >
            <motion.div
              variants={journey3Variants.text3}
              className='text-fg max-w-60 space-y-2'
            >
              <p>Tech / Tools:</p>
              <div className='flex flex-wrap gap-2'>
                {[
                  'React',
                  'JavaScript',
                  'Tailwind CSS',
                  'Material UI',
                  'Redux',
                  'GitHub',
                  'Trello',
                ].map((tech) => (
                  <div key={tech} className='chip'>
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={journey3Variants.image3}>
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731678851/bvw-event-calendar_a3isgq.png'
                className='-rotate-2'
              />
            </motion.div>
          </motion.div>

          <div
            ref={star4Ref}
            className='star-anchor4 absolute bottom-[386px] left-[54px] size-fit'
          >
            <svg
              width='75'
              height='70'
              viewBox='0 0 75 70'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.787176 58.4891C45.2928 1.68328 43.995 -1.00662 45.2928 1.68328C46.5905 4.37318 74.4654 69.7169 73.2455 68.134C72.0256 66.551 7.79618 16.2789 9.47032 16.4393C11.1445 16.5997 78.4898 16.592 72.7957 18.383C68.2404 19.8158 22.892 45.7174 0.787176 58.4891Z'
                stroke='#76C1FF'
                strokeWidth='2'
              />
            </svg>
          </div>
          <p className='year-journey4 text-fg font-caveat text-4xl'>2022</p>
          <motion.div
            initial='hidden'
            animate={isStar4Visible ? 'visible' : 'hidden'}
            className='content1-journey4 flex items-start gap-8'
          >
            <motion.div
              variants={journey4Variants.image1}
              className='-rotate-10'
            >
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679451/certif-intern-bv_mf1pyu.png' />
            </motion.div>
            <motion.div variants={journey4Variants.text1} className='space-y-1'>
              <p className='text-fg font-medium'>PT Bukit Vista Nusantara</p>
              <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-base font-bold text-transparent md:text-xl'>
                Frontend Developer Intern
              </p>
              <p className='text-fg/80 text-sm'>February 2022 - June 2022</p>
            </motion.div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate={isStar4Visible ? 'visible' : 'hidden'}
            className='content2-journey4 flex items-center gap-8'
          >
            <motion.div
              variants={journey4Variants.image2}
              className='-rotate-2'
            >
              <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679594/ss_prop_list_new_2_bpnxlk.png' />
            </motion.div>
            <motion.div
              variants={journey4Variants.text2}
              className='text-fg w-md space-y-2'
            >
              <ul className='list-disc pl-6'>
                <li>
                  Refactored some of BIGRR's features by splitting code logic,
                  create and use reusable components, better Redux state
                  management
                </li>
                <li>Learning and implementing React best practices</li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate={isStar4Visible ? 'visible' : 'hidden'}
            className='content3-journey4 flex items-start gap-7'
          >
            <motion.div variants={journey4Variants.image3}>
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731678390/Screenshot_2024-08-14_160727_eoxzxa.png'
                className='rotate-15'
              />
            </motion.div>
            <motion.div
              variants={journey4Variants.text3}
              className='text-fg max-w-52 space-y-2'
            >
              <p>Tech / Tools:</p>
              <div className='flex flex-wrap gap-2'>
                {[
                  'React',
                  'JavaScript',
                  'Tailwind CSS',
                  'Material UI',
                  'Redux',
                  'GitHub',
                  'Trello',
                ].map((tech) => (
                  <div key={tech} className='chip'>
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <svg
            width='908'
            height='2429'
            viewBox='0 0 908 2429'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.path
              id='constellation-line'
              d='M13.7204 356.651L72.7204 135.651L375.72 29.6506L692.22 10.6506L845.72 223.651L863.72 721.651L671.72 1076.15L448.72 1295.65L172.72 1621.65L93.7204 2000.65L391.22 2204.65M391.22 2204.65L729.22 2229.15M391.22 2204.65L582.72 2341.15M391.22 2204.65L460.72 2423.15'
              stroke='#EAF0F5'
              strokeOpacity='0.8'
              strokeDasharray='2 2'
              style={{ pathLength }}
            />

            {/* LITTLE STARS */}
            <path
              d='M452.72 2427.65L461.22 2415.15L470.22 2427.65L452.72 2420.15H470.22L452.72 2427.65Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M582.22 2347.15L575.22 2329.15L588.72 2341.15H568.72L588.72 2329.15L582.22 2347.15Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M717.72 2236.15L727.22 2215.65L734.22 2236.15L711.22 2222.65L742.72 2226.65L717.72 2236.15Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M386.22 2209.65L394.72 2195.65L398.22 2214.65C391.554 2210.82 378.72 2203.15 380.72 2203.15C382.72 2203.15 397.554 2200.82 404.72 2199.65L386.22 2209.65Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M159.72 1624.65L177.72 1616.15L180.72 1629.65L164.72 1616.15L186.22 1620.65L159.72 1624.65Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M669.72 1084.15C669.72 1082.15 663.72 1064.15 666.72 1066.15C669.12 1067.75 682.054 1075.82 688.22 1079.65C678.22 1078.15 658.82 1075.15 661.22 1075.15C663.62 1075.15 675.887 1070.82 681.72 1068.65L669.72 1084.15Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M839.807 229.984L844.393 214.651L854.22 232.651L835.22 221.317H854.22L839.807 229.984Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M680.72 15.1506L695.72 1.15063V21.6506L680.72 1.15063L706.72 9.15063L680.72 15.1506Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M368.72 38.1506L374.72 23.1506L388.22 38.1506L359.72 28.1506L388.22 23.1506L368.72 38.1506Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />
            <path
              d='M1.72043 361.651L13.7204 350.151L19.2204 364.651L4.22043 352.651C12.5538 353.484 28.6204 355.251 26.2204 355.651C23.8204 356.051 8.88709 359.817 1.72043 361.651Z'
              stroke='#EAF0F5'
              strokeOpacity='0.6'
            />

            {/* BIG STARS */}
            {/* <path
              d='M31.2204 165.916C79.6011 112.372 78.4952 109.598 79.6011 112.372C80.7069 115.147 103.93 182.285 102.824 180.62C101.718 178.956 41.173 124.302 42.8318 124.579C44.4905 124.857 111.67 129.573 105.865 130.96C101.22 132.07 54.1667 154.727 31.2204 165.916Z'
              stroke='#EBBF2F'
              strokeWidth='2'
              className='star-anchor1'
            /> */}
            {/* <path
              d='M831.22 760.684C864.15 696.471 862.365 694.076 864.15 696.471C865.934 698.866 905.69 757.741 904.193 756.418C902.695 755.095 830.1 717.91 831.774 717.75C833.448 717.591 899.571 704.816 894.32 707.654C890.119 709.925 850.503 743.953 831.22 760.684Z'
              stroke='#76C1FF'
              strokeWidth='2'
              className='star-anchor2'
            /> */}
            {/* <path
              d='M398.909 1302C466.324 1276.26 466.598 1273.28 466.324 1276.26C466.05 1279.23 456.264 1349.59 456.034 1347.61C455.805 1345.62 426.668 1269.44 428.02 1270.44C429.373 1271.44 487.09 1306.14 481.288 1304.74C476.646 1303.62 424.434 1302.45 398.909 1302Z'
              stroke='#76C1FF'
              strokeWidth='2'
              className='star-anchor3'
            /> */}
            {/* <path
              d='M54.0269 2033.08C98.5325 1976.28 97.2348 1973.59 98.5325 1976.28C99.8302 1978.97 127.705 2044.31 126.485 2042.73C125.265 2041.14 61.0359 1990.87 62.7101 1991.03C64.3842 1991.19 131.73 1991.18 126.035 1992.98C121.48 1994.41 76.1317 2020.31 54.0269 2033.08Z'
              stroke='#76C1FF'
              strokeWidth='2'
              className='star-anchor4'
            /> */}
          </svg>
        </div>
      </Section>
      <StarsBackground />
    </div>
  );
}
