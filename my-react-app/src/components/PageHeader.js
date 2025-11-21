import { useNavigate } from 'react-router-dom';

export default function YourComponent() {
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div>
          <Back 
                title="여기에 페이지 제목을 입력하세요" 
                onBack={handleBack}                 
            />
        </div>
    );
}