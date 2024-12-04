export default function InvalidMessage({ text }: { text: string }) {
  return (
    <p className='font-bold text-sm text-red-500 '>
      <span className='font-medium'>{text}</span>
    </p>
  );
}
