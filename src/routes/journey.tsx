import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { StarsBackground } from '@/components/ui/stars-background';
import { Timeline } from '@/components/ui/timeline';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const JourneyImage = ({
  src,
  width = 160,
  height = 120,
  className,
}: {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <Image
      src={src}
      alt='journey image'
      width={width}
      height={height}
      className={cn(
        'rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]',
        className,
      )}
    />
  );
};

const journeys = [
  {
    title: '2025',
    content: (
      <div className='space-y-3 lg:space-y-6'>
        <div className='flex flex-col justify-between lg:flex-row lg:items-center'>
          <div className='text-base font-semibold md:text-xl'>
            <p className='text-fg'>PT Tiga Daya Digital Indonesia</p>
            <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
              Fulltime Frontend Developer
            </p>
          </div>
          <p className='text-fg/80 text-sm md:text-base lg:max-w-36 lg:text-right'>
            January 2025 - Now
          </p>
        </div>
        <p className='text-fg text-xs font-normal md:text-base'>
          ✅ Developed an auction platform for JBA Indonesia (
          <a
            href='https://lelang.jba.co.id/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-300'
          >
            https://lelang.jba.co.id/
          </a>
          ) using React, Next.js, TypeScript, TailwindCSS, and Zustand <br />✅
          Developed an admin platform for managing the auction, featuring
          dashboards, complex data tables, and comprehensive data management
          capabilities (create, read, update, delete) <br />✅ Built responsive,
          modular UI components and optimized client-side performance <br />✅
          Integrated REST APIs, handled data fetching, caching, error states,
          and rendered structured data to the UI <br />✅ Delivered a scalable,
          maintainable frontend architecture aligned with client requirements
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764379814/me_in_asl_fj6pef.jpg' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764378195/Lelang-Elektronik-JBA-Indonesia_gqigjg.png' />
        </div>
      </div>
    ),
  },
  {
    title: '2023 - 2024',
    content: (
      <div className='space-y-3 lg:space-y-6'>
        <div className='flex flex-col justify-between lg:flex-row lg:items-center'>
          <div className='text-base font-semibold md:text-xl'>
            <p className='text-fg'>PT Bukit Vista Nusantara</p>
            <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
              Fulltime Frontend Developer
            </p>
          </div>
          <p className='text-fg/80 text-sm md:text-base lg:max-w-36 lg:text-right'>
            August 2023 - August 2024
          </p>
        </div>
        <p className='text-fg text-xs font-normal md:text-base'>
          ✅ Responsible for designing and developing UI on the web app using
          React, Redux, Context, Material UI, and TailwindCSS <br />✅
          Maintaining and enhancing performance for the web apps <br />✅
          Solving many errors and bugs that occur on the web apps <br />✅
          Implementing best practices for React development <br />✅ Doing code
          review and supervising interns <br />✅ Deploying features to
          production <br />✅ Developing custom functions inside WordPress
          website using PHP <br />✅ Working on a small project with the mobile
          application using Flutter
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731677218/DSC08857_l4mkg9.jpg' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731507569/tinker_lzjuyc.png' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731678390/Screenshot_2024-08-14_160727_eoxzxa.png' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731678675/Screenshot_2024-06-29_160042_dq7ivp.png' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731678851/bvw-event-calendar_a3isgq.png' />
        </div>
      </div>
    ),
  },
  {
    title: '2022 - 2023',
    content: (
      <div className='space-y-3 lg:space-y-6'>
        <div className='flex flex-col justify-between lg:flex-row lg:items-center'>
          <div className='text-base font-semibold md:text-xl'>
            <p className='text-fg'>PT Bukit Vista Nusantara</p>
            <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
              Part-time Frontend Developer
            </p>
          </div>
          <p className='text-fg/80 text-sm md:text-base lg:max-w-36 lg:text-right'>
            July 2022 - August 2023
          </p>
        </div>
        <p className='text-fg text-xs font-normal md:text-base'>
          ✅ Responsible for creating UI on the web app using React, Redux,
          Material UI, and TailwindCSS <br />✅ Maintaining web apps <br />✅
          Solving many errors and bugs that occur on the web apps
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679863/bigrr-bookings_weujrk.png' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731680448/guest-portal-es_ymmjyi.png' />
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div className='space-y-3 lg:space-y-6'>
        <div className='flex flex-col justify-between lg:flex-row lg:items-center'>
          <div className='text-base font-semibold md:text-xl'>
            <p className='text-fg'>PT Bukit Vista Nusantara</p>
            <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
              Frontend Developer Intern
            </p>
          </div>
          <p className='text-fg/80 text-sm md:text-base lg:max-w-36 lg:text-right'>
            February 2022 - June 2022
          </p>
        </div>
        <p className='text-fg text-xs font-normal md:text-base'>
          ✅ Responsible for creating UI on the web app using React, Redux,
          Material UI, and TailwindCSS <br />✅ Solving errors and bugs that
          occur on the web apps
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679594/ss_prop_list_new_2_bpnxlk.png' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679451/certif-intern-bv_mf1pyu.png' />
        </div>
      </div>
    ),
  },
  {
    title: '2021 - 2022',
    content: (
      <div className='space-y-3 lg:space-y-6'>
        <div className='flex flex-col justify-between lg:flex-row lg:items-center'>
          <div className='text-base font-semibold md:text-xl'>
            <p className='text-fg'>English Learner ID</p>
            <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
              Frontend Developer Intern
            </p>
          </div>
          <p className='text-fg/80 text-sm md:text-base lg:max-w-36 lg:text-right'>
            September 2021 - March 2022
          </p>
        </div>
        <p className='text-fg text-xs font-normal md:text-base'>
          ✅ Responsible for building the UI for the English Learner ID official
          website using HTML, CSS, JavaScript, and Bootstrap
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679165/Zulfa_Fatah_Akbar_Ahmad_-_EL_grufcb.png' />
          <JourneyImage src='https://res.cloudinary.com/dx34xih1p/image/upload/v1731679343/english-learner_eo7gmz.png' />
        </div>
      </div>
    ),
  },
];

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0%', 'end 70%'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className='bg-linear-to-b to-darkest relative min-h-screen w-full overflow-hidden from-black via-black'
    >
      <Section id='journey' className='z-10'>
        <div className='z-10 mx-auto px-4 py-10 md:px-0 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-5xl text-2xl md:text-4xl'>
            My Journey So Far
          </h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            Here&apos;s my timeline of 3+ years learning, growing, and working
            as a developer.
          </p>
        </div>
        <div className='relative z-10 mt-32 h-fit w-full'>
          <div className='star-anchor1 absolute left-[30px] top-[110px] size-fit'>
            <svg
              width='77'
              height='71'
              viewBox='0 0 77 71'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.741974 55.266C49.1226 1.72204 48.0168 -1.05226 49.1226 1.72204C50.2284 4.49634 73.4511 71.6344 72.3453 69.9698C71.2395 68.3052 10.6946 13.6515 12.3533 13.9289C14.0121 14.2063 81.192 18.9227 75.3864 20.3098C70.7418 21.4195 23.6882 44.0764 0.741974 55.266Z'
                stroke='#EBBF2F'
                strokeWidth='2'
              />
            </svg>
          </div>
          <p className='year-journey1 text-fg font-caveat text-4xl'>2025</p>
          <div className='journey1 text-fg h-[500px] w-1/3'>
            <div className='relative h-full w-full'>
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764379814/me_in_asl_fj6pef.jpg'
                className='-rotate-10 absolute -left-6 top-0'
              />
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764379814/me_in_asl_fj6pef.jpg'
                className='absolute left-0 top-[150px] -rotate-2'
              />
              <JourneyImage
                src='https://res.cloudinary.com/dx34xih1p/image/upload/v1764378195/Lelang-Elektronik-JBA-Indonesia_gqigjg.png'
                className='rotate-15 absolute -left-5 top-[315px]'
              />
              <div className='ml-[200px] space-y-14'>
                <div className='space-y-1'>
                  <p className='text-fg font-medium'>
                    PT Tiga Daya Digital Indonesia
                  </p>
                  <p className='bg-linear-to-r from-primary to-accent bg-clip-text text-base font-bold text-transparent md:text-xl'>
                    Fulltime Frontend Developer
                  </p>
                  <p className='text-fg/80 text-sm'>
                    January 2025 - December 2025
                  </p>
                </div>
                <div className='space-y-6'>
                  <p>
                    This is my latest company on my journey. Contributed in 3
                    projects: <br /> <br /> JBA Indonesia’s Electronic Auction
                    platform
                    <br /> JAVIS - The internal team’s app to manage content for
                    auction <br /> VISION - A new micro-frontend architectured
                    app to replace JAVIS
                  </p>
                  <div>
                    <p>Tech / Tools:</p>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='star-anchor2 absolute right-32 top-[696px] size-fit'>
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
          <div className='journey2 border-fg/80 text-fg h-fit w-fit border'>
            content 2
          </div>

          <div className='star-anchor3 absolute bottom-[1081px] left-[399px] size-fit'>
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
                stroke-width='2'
              />
            </svg>
          </div>
          <div className='journey3 border-fg/80 text-fg h-fit w-fit border'>
            content 3
          </div>

          <div className='star-anchor4 absolute bottom-[386px] left-[54px] size-fit'>
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
                stroke-width='2'
              />
            </svg>
          </div>
          <div className='journey4 border-fg/80 text-fg h-fit w-fit border'>
            content 4
          </div>

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
