import './App.css';
import { Headline1, Headline2, Headline3, Body1, Body2, ButtonText, TabText, CaptionText } from './components/Typography/Typography';
import Button from './components/Button/Button';
import { Desktop, Tablet, Mobile } from "./components/ScreemSize";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('./pages/Talent.js');
  };
  return (
    
    <div style={{ padding: '20px' }}> 
      <h1>텍스트 스타일 가이드</h1>
      <p>SUIT / 행간 140% / 자간 -2.5%</p>
      <hr />

      <Headline1>Headline 1 (H2 / SemiBold / 24)</Headline1>
      <Headline2>Headline 2 (H3 / SemiBold / 20)</Headline2>
      <Headline3>Headline 3 (H4 / SemiBold / 18)</Headline3>

      <br />

      <Body1>Body 1 (Regular / 16) - 일반 본문 텍스트입니다.</Body1>
      <Body2>Body 2 (Medium / 14) - 보조 본문 텍스트입니다.</Body2>

      <br />

      <button style={{ padding: '10px 15px', backgroundColor: '#eee', border: 'none', borderRadius: '5px' }}>
        <ButtonText>Button (Medium / 14)</ButtonText>
      </button>

      <br /><br />

      <div>
        <TabText>Tab (SemiBold / 13) - 탭 메뉴 텍스트</TabText>
      </div>

      <br />

      <CaptionText>Caption (Medium / 12) - 작은 설명 텍스트입니다.</CaptionText>



      <br /><br />

      <hr style={{ margin: '30px 0', borderStyle: 'dashed', borderColor: 'var(--color-gray-3)' }} />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ color: 'var(--color-text-1)' }}>실제 버튼 컴포넌트 테스트</h2>

        {/* 활성 (Primary) 버튼 */}
        <Button onClick={handleClick}>재능 공유 매칭 신청</Button>

        {/* 비활성 (Disabled) 버튼 */}
        <Button onClick={handleClick} disabled>재능 공유 매칭 신청 (비활성화)</Button>
      </div>

      <>
        <Desktop>데스크탑 전용 페이지</Desktop>
        <Tablet>노트북 & 태블릿 전용 페이지</Tablet>
        <Mobile>모바일 전용 페이지</Mobile>
      </>
      
      
    </div>

    
    
  );
}

export default App;