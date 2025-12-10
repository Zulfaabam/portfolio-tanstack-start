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
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
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
      <div className='bg-linear-to-b from-dark via-dark w-full to-black'>
        <HeroSection />
        <AboutSection />
        {/* <FeaturedProjects /> */}
      </div>
      <div className='bg-earth-from-space w-full bg-black/60 bg-cover bg-no-repeat bg-blend-hard-light'>
        <TellMeSection />
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
