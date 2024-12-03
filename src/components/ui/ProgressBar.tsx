export default function ProgressBar({ percentage }: { percentage: number }) {
  return <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: `${percentage}%` }}></div>;
}
