import React from "react";

export default function TalentRegister() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">재능 등록하기</h2>

        {/* 현재 영역 */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">현재 영역</p>
          <div className="w-full border rounded-xl p-3 bg-gray-50 text-gray-700">
            내가 배울 줄 수 있는 것
          </div>
        </div>

        {/* 재능 분야 */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">재능 분야</p>
          <div className="grid grid-cols-3 gap-2">
            {['디지털/IT','요리/생활','취미/예술','직무/경험','건강/운동'].map((item, idx) => (
              <button key={idx} className={`p-2 rounded-full border text-sm ${idx===0 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'} `}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 재능명 */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">재능명</label>
          <input
            type="text"
            placeholder="예시 : 아이폰 사진 편집"
            className="w-full mt-1 p-3 border rounded-xl text-sm"
          />
        </div>

        {/* 상세 태그 */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">상세 태그</label>
          <input
            type="text"
            placeholder="예시 : 스마트폰, 인물 보정, 무료 앱"
            className="w-full mt-1 p-3 border rounded-xl text-sm"
          />
        </div>

        {/* 간단 소개 */}
        <div className="mb-6">
          <label className="text-sm text-gray-500">간단 소개/설명 문구</label>
          <textarea
            placeholder="가르치고 싶은 재능의 간단 소개/설명 문구를 입력해주세요"
            className="w-full mt-1 p-3 border rounded-xl text-sm h-32 resize-none"
          ></textarea>
          <p className="text-right text-xs text-gray-400">0/300</p>
        </div>

        {/* 등록 버튼 */}
        <button className="w-full bg-gray-300 text-white p-3 rounded-xl text-sm">
          등록하기
        </button>
      </div>
    </div>
  );
}
