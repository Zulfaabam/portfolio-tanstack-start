import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import BentoGridSection from '@/components/sections/bento-grid-section';
import HeroSection from '@/components/sections/hero-section';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  errorComponent: ({ reset }) => (
    <div className='bg-bg relative flex min-h-screen w-full items-center'>
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
    <main className='bg-bg relative pb-24'>
      <BentoGridSection />
    </main>
  );
}
