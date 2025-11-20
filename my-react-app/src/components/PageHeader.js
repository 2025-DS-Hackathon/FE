import { useNavigate } from 'react-router-dom';

export default function YourComponent() {
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div>
          <Back 
                title="여기에 페이지 제목을 입력하세요" // 제목 문자열 입력
                onBack={handleBack}                 // 뒤로 가기 버튼 클릭 시 실행될 함수
            />
            {/* 나머지 페이지 내용 */}
        </div>
    );
}