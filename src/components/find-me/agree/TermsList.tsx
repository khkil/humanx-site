import { Terms } from '@/types/terms';

export default function TermsList({ termsList, onChange }: { termsList: Terms[]; onChange: any }) {
  console.log(termsList);
  return (
    <ul className='terms_list'>
      {termsList?.map(({ termsIdx, termsName, termsContent, isRequired }) => (
        <li className='terms_item' key={termsIdx}>
          <div className='check_terms'>
            <div className='check_wrap'>
              <input type='checkbox' id={`termsService_${termsIdx}`} className='blind' value={termsIdx} onChange={onChange} />
              <label htmlFor={`termsService_${termsIdx}`}>
                <em className='option point'>[{isRequired ? '필수' : '선택'}]</em>
                <div className='text_wrap'>
                  <span className='text'>{termsName}</span>
                </div>
              </label>
            </div>
          </div>
          <div className='terms_box'>
            <div className='article'>
              <p className='article_text' style={{ whiteSpace: 'pre-line' }}>
                {termsContent}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
