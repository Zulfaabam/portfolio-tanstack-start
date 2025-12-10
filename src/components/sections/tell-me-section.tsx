import Section from '../section';
import { IconMail } from '@tabler/icons-react';
import { socmedList } from '@/lib/consts';

export default function TellMeSection() {
  return (
    <Section id='tell-me' className='py-6!'>
      <div className='bg-darker border-fg text-fg rounded-2xl border px-4 pb-4 pt-5 md:px-6 md:pb-[18px] md:pt-9'>
        <div className='mx-auto max-w-96 space-y-6 text-center'>
          <h2 className='mx-auto max-w-52 text-center text-3xl font-semibold md:max-w-full md:text-4xl'>
            Tell me about your{' '}
            <span className='relative'>
              Next{' '}
              <span className='-rotate-30 text-dark absolute -right-12 bottom-0 flex h-4 w-16 items-center justify-center bg-[#F9E5CF] p-0.5 text-[8px] font-semibold md:-right-32 md:bottom-7 md:h-5 md:w-[100px] md:text-xs'>
                pun intended :D
              </span>{' '}
            </span>{' '}
            project
          </h2>
          <div className='mx-auto flex justify-center gap-2 md:gap-4'>
            <a
              href='mailto:zulfafatahakbar@gmail.com'
              className='bg-accent text-dark flex h-9 w-[90px] cursor-pointer items-center justify-center gap-1 rounded-full text-xs font-medium md:h-10 md:w-[100px] md:text-sm'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconMail size={18} /> Email me
            </a>
            <a
              href='https://wa.me/6281542426045'
              className='bg-fg text-dark flex h-9 w-[90px] cursor-pointer items-center justify-center rounded-full text-xs font-medium md:h-10 md:w-[100px] md:text-sm'
              target='_blank'
              rel='noopener noreferrer'
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className='bg-fg/90 mb-2 mt-10 h-px w-full md:mb-4 md:mt-20'></div>
        <div className='flex justify-between'>
          <p className='text-xs md:text-base'>
            Portfolio by <span className='font-pacifico'>Abam</span>
          </p>
          <div className='flex items-center gap-0.5 md:gap-1'>
            {socmedList.map((soc, idx) => (
              <div
                key={soc.id}
                className='flex items-center gap-0.5 text-xs md:gap-1 md:text-base'
              >
                <a
                  href={soc.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-primary transition-all duration-300'
                >
                  {soc.title}
                </a>
                {idx !== socmedList.length - 1 ? ' / ' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
