import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import AboutSection from '@/components/sections/about-section';
import FeaturedProjects from '@/components/sections/featured-projects';
import HeroSection from '@/components/sections/hero-section';
import TellMeSection from '@/components/sections/tell-me-section';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  errorComponent: ({ reset }) => (
    <div className='relative flex min-h-screen w-full items-center bg-dark'>
      <Section
        id='error-home'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Home,
});

function Home() {
  return (
    <div className='relative'>
      <div className='bg-linear-to-b w-full from-dark via-dark to-black'>
        <HeroSection />
        <AboutSection />
        <ShootingStars />
        <StarsBackground />
        {/* <FeaturedProjects /> */}
      </div>
      <div className='w-full bg-black/60 bg-earth-from-space bg-cover bg-no-repeat bg-blend-hard-light'>
        <TellMeSection />
      </div>
    </div>
  );
}
