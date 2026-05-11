export interface LabCardProps {
  title: string;
  techs: string[];
  src: string;
  searchQuery?: string;
}

function HighlightText({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span
            key={idx}
            className='rounded-sm bg-yellow-500/30 text-yellow-200'
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function LabCard({
  title,
  techs,
  src,
  searchQuery,
}: LabCardProps) {
  return (
    <a
      href={src}
      target='_blank'
      rel='noopener noreferrer'
      className='border-border bg-surface hover:border-muted hover:shadow-elevated group relative flex h-[260px] cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1'
    >
      {/* Preview Area (iframe pointing to static html) */}
      <div className='bg-surface relative flex flex-1 items-center justify-center overflow-hidden'>
        {src.includes('.html') ? (
          <iframe
            src={src}
            title={title}
            className='pointer-events-none absolute inset-0 h-full w-full border-none'
          />
        ) : (
          <div className='bg-surface text-text flex h-full w-full items-center justify-center text-sm'>
            {src.replace('/', '').toUpperCase()}
          </div>
        )}
      </div>

      {/* Title & Tech */}
      <div className='border-border bg-surface group-hover:bg-surface/80 flex flex-col justify-between border-t p-4 transition-colors duration-300'>
        <div className='flex items-center justify-between'>
          <p className='text-text group-hover:text-text/80 text-sm font-medium transition-colors'>
            <HighlightText text={title} query={searchQuery} />
          </p>
          <div className='flex gap-1.5'>
            {techs.map((tech, idx) => (
              <span
                key={idx}
                className='border-border bg-surface2 text-muted rounded px-2 py-0.5 text-[10px]'
              >
                <HighlightText text={tech} query={searchQuery} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
