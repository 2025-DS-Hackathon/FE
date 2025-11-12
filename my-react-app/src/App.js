import './App.css';
import { Headline1, Headline2, Headline3, Body1, Body2, Button, Tab, Caption } from './components/Typography/Typography';

function App() {
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
        <Button>Button (Medium / 14)</Button>
      </button>

      <br /><br />

      <div>
        <Tab>Tab (SemiBold / 13) - 탭 메뉴 텍스트</Tab>
      </div>

      <br />

      <Caption>Caption (Medium / 12) - 작은 설명 텍스트입니다.</Caption>
    </div>
  );
}

export default App;