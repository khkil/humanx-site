export default function AgreeNotice({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <ul className='terms_list'>
        <li className='terms_item'>
          <div className='text_wrap'>
            <span className='text' style={{ fontSize: 20, fontWeight: 'bold' }}>
              [안내문]
            </span>
          </div>
          <div className='terms_box'>
            <div className='article'>
              <p className='article_text' style={{ whiteSpace: 'pre-line' }}>
                {/*검사문항 모두 잘 체크하셨습니다!
                  <br />
                  <br />*/}
                검사 결과를 정확하게 분석하고 개인 맞춤형 정보를 제공하기 위해 귀하의 기본 정보가 필요합니다.
                <br />
                <br />
                검사 문항을 모두 완료하신 후, 결과 확인을 위해 개인정보 수집 및 이용 동의가 필요합니다.
                <br />
                <br />
                동의 시 제공되는 혜택:
                <br />
                <br />
                <span style={{ fontWeight: 'bold' }}>개인 맞춤형 검사 결과 확인</span>
                <br />
                <span style={{ fontWeight: 'bold' }}>관련 서비스와 맞춤형 추천 정보 제공</span>
                <br />
                <br />
                귀하의 개인정보는 개인정보 보호법에 따라 안전하게 보호되며, 수집 이용 목적 외에는 사용되지 않습니다.
                <br />
                동의 여부는 선택 사항이나, 동의하지 않을 경우 검사 결과 확인이 제한될 수 있습니다.
                <br />
                <br />
              </p>
              {/* <p className="article_text">
                네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을
                확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
              </p>*/}
            </div>
          </div>
        </li>
      </ul>
      <div style={{ textAlign: 'center' }}>
        <button className='findme__main__start__button' onClick={onClick}>
          <span>
            개인정보 동의하고
            {/*<br /> 나의 검사 결과 확인하기*/}
            <br /> 검사 시작하기
          </span>
        </button>
      </div>
    </div>
  );
}
