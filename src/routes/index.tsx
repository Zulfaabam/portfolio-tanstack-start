import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import BentoGridSection from '@/components/sections/bento-grid-section';
import HeroSection from '@/components/sections/hero-section';
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
    <div className='relative pb-24'>
      <div className='bg-linear-to-b to-darkest w-full from-black via-black'>
        <HeroSection />
        <BentoGridSection />
      </div>
      <div className='bg-earth-from-space bg-darkest/60 absolute bottom-0 h-96 w-full bg-cover bg-no-repeat bg-blend-hard-light'></div>
      <ShootingStars />
      <StarsBackground starDensity={0.0003} />
    </div>
  );
}
