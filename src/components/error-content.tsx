export default function ErrorContent({ reset }: { reset: () => void }) {
  return (
    <>
      <h2 className='text-red-400'>Something went wrong!</h2>
      <button
        onClick={reset}
        className='bg-surface text-text border-border cursor-pointer rounded-lg border px-4 py-2 transition-all duration-300 hover:-translate-y-0.5'
      >
        Try again
      </button>
    </>
  );
}
