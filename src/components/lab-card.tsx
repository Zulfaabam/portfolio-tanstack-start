export interface LabCardProps {
  title: string;
  techs: string[];
  src: string;
}

export default function LabCard({ title, techs, src }: LabCardProps) {
  return (
    <a
      href={src}
      target='_blank'
      rel='noopener noreferrer'
      className='group relative flex h-[260px] cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/50'
    >
      {/* Preview Area (iframe pointing to static html) */}
      <div className='relative flex flex-1 items-center justify-center overflow-hidden bg-neutral-950'>
        <iframe
          src={src}
          title={title}
          className='pointer-events-none absolute inset-0 h-full w-full border-none'
        />
      </div>

      {/* Title & Tech */}
      <div className='flex flex-col justify-between border-t border-neutral-800 bg-neutral-900 p-4 transition-colors duration-300 group-hover:bg-neutral-800/50'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-medium text-neutral-300 transition-colors group-hover:text-white'>
            {title}
          </p>
          <div className='flex gap-1.5'>
            {techs.map((tech, idx) => (
              <span
                key={idx}
                className='rounded bg-neutral-800 px-2 py-0.5 text-[10px] text-neutral-400'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
