import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icons (変更なし) ---
// 各アイコンのSVG定義です。UIの表示に使われます。
const BookOpenIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const MapPinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const ChevronLeftIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);
const XIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const SparklesIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3L9.25 8.75 3.5 9.5l4.5 4.25L6.5 19.5 12 16l5.5 3.5-1.5-5.75 4.5-4.25-5.75-.75L12 3z"/></svg>
);
const HomeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

// --- プロトタイプ用の静的データ ---
// Firebaseの代わりに、これらの固定データを使って画面を表示します。
const initialDocuments = [
    { id: 'doc1', title: '令和7年度 保育園入園のしおり', category: '保育園・幼稚園', type: 'PDF', date: '2025-07-01' },
    { id: 'doc2', title: '児童手当現況届', category: '各種申請', type: 'PDF', date: '2025-06-15' },
    { id: 'doc3', title: '子育て応援ハンドブック', category: 'パンフレット', type: 'デジタルブック', date: '2025-04-01' },
    { id: 'doc4', title: '乳幼児の健康診査について', category: '健康・医療', type: 'PDF', date: '2025-03-20' },
];
const initialEvents = [
    { id: 'evt1', title: '親子で楽しむリトミック', location: '中央児童館', date: '2025-07-15', age: '1〜2歳', status: '予約可' },
    { id: 'evt2', title: '絵本の読み聞かせ会', location: '中央図書館', date: '2025-07-20', age: '3歳〜', status: '予約可' },
    { id: 'evt3', title: 'パパと作ろう！簡単おやつ教室', location: '葛西子育てひろば', date: '2025-07-22', age: '全年齢', status: '満員' },
];
const initialFacilities = [
    { id: 'fac1', name: '江戸川区役所', category: '行政施設', address: '江戸川区中央1-4-1' },
    { id: 'fac2', name: '中央児童館', category: '児童館', address: '江戸川区中央3-4-18' },
    { id: 'fac3', name: '葛西健康サポートセンター', category: '医療機関', address: '江戸川区中葛西3-10-1' },
    { id: 'fac4', name: '行船公園', category: '公園', address: '江戸川区北葛西3-2-1' },
];
const initialUserData = {
    childName: 'ゆうくん',
    childAge: 2,
};

// --- Gemini APIのダミー関数 ---
// 実際のAPI通信の代わりに、2秒後にサンプルのテキストを返すことでAIの応答をシミュレートします。
const callDummyGeminiAPI = (prompt) => {
    console.log("Dummy API called with prompt:", prompt);
    return new Promise(resolve => {
        setTimeout(() => {
            const dummyResponse = `こんにちは！お問い合わせのイベント、楽しそうですね！\n\nこちらがAIからのアドバイスです：\n\n持ち物リスト：\n・飲み物（こまめな水分補給を！)\n・汗拭きタオル\n・お気に入りのおもちゃ（待ち時間にぐずった時用）\n\n服装のポイント：\n動きやすい服装が一番です。公園で少し遊べるように、汚れても良い服が良いかもしれませんね。\n\n周辺情報：\nイベント会場の近くには、お子様向けの遊具が充実した「虹の公園」があります。イベントの前後に立ち寄ってみてはいかがでしょうか？\n\n素敵な一日になりますように！`;
            resolve(dummyResponse);
        }, 2000); // 2秒の遅延
    });
};

// --- UI Components (変更なし) ---
const Header = ({ onNavigate }) => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => onNavigate('home')}>
                えどがわ子育て
            </div>
            <nav className="hidden md:flex space-x-8">
                <button onClick={() => onNavigate('documents')} className="text-gray-700 hover:text-green-600 transition font-semibold">書類・手続き</button>
                <button onClick={() => onNavigate('events')} className="text-gray-700 hover:text-green-600 transition font-semibold">イベント</button>
                <button onClick={() => onNavigate('map')} className="text-gray-700 hover:text-green-600 transition font-semibold">施設マップ</button>
                <button onClick={() => onNavigate('mypage')} className="text-gray-700 hover:text-green-600 transition font-semibold">マイページ</button>
            </nav>
        </div>
    </header>
);

const BottomNav = ({ activePage, onNavigate }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-t-lg md:hidden z-50 border-t">
        <div className="flex justify-around items-center h-16">
            <button onClick={() => onNavigate('documents')} className={`flex flex-col items-center justify-center w-full ${activePage === 'documents' ? 'text-green-600' : 'text-gray-500'}`}><BookOpenIcon className="w-6 h-6 mb-1" /><span className="text-xs">書類</span></button>
            <button onClick={() => onNavigate('events')} className={`flex flex-col items-center justify-center w-full ${activePage === 'events' ? 'text-green-600' : 'text-gray-500'}`}><CalendarIcon className="w-6 h-6 mb-1" /><span className="text-xs">イベント</span></button>
            <button onClick={() => onNavigate('home')} className={`flex flex-col items-center justify-center w-full ${activePage === 'home' ? 'text-green-600' : 'text-gray-500'}`}><HomeIcon className="w-6 h-6 mb-1" /><span className="text-xs">ホーム</span></button>
            <button onClick={() => onNavigate('map')} className={`flex flex-col items-center justify-center w-full ${activePage === 'map' ? 'text-green-600' : 'text-gray-500'}`}><MapPinIcon className="w-6 h-6 mb-1" /><span className="text-xs">マップ</span></button>
            <button onClick={() => onNavigate('mypage')} className={`flex flex-col items-center justify-center w-full ${activePage === 'mypage' ? 'text-green-600' : 'text-gray-500'}`}><UserIcon className="w-6 h-6 mb-1" /><span className="text-xs">マイページ</span></button>
        </div>
    </div>
);

const PageHeader = ({ title, onBack }) => (
    <div className="bg-white p-4 flex items-center shadow-sm sticky top-[60px] md:top-[68px] z-40">
        {onBack && (<button onClick={onBack} className="mr-4 text-gray-600"><ChevronLeftIcon className="w-6 h-6" /></button>)}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    </div>
);

const LoadingSpinner = ({ text = "AIが考えています..." }) => (
    <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="ml-3 text-gray-600">{text}</p>
    </div>
);

// --- Page Components (データ受け渡し方法を修正) ---

const HomePage = ({ onNavigate, events }) => (
    <div>
        <div className="p-4 md:p-8 bg-gradient-to-r from-green-100 to-blue-100">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">こんにちは、保護者様</h1>
            <p className="text-gray-600 mt-2">江戸川区の子育て情報をここひとつで。</p>
        </div>
        <div className="p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div onClick={() => onNavigate('documents')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center cursor-pointer transition flex flex-col items-center">
                    <BookOpenIcon className="w-14 h-14 text-green-500 mb-2" />
                    <p className="mt-2 font-semibold text-lg">書類・手続き</p>
                </div>
                <div onClick={() => onNavigate('events')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center cursor-pointer transition flex flex-col items-center">
                    <CalendarIcon className="w-14 h-14 text-blue-500 mb-2" />
                    <p className="mt-2 font-semibold text-lg">イベント検索</p>
                </div>
                <div onClick={() => onNavigate('map')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center cursor-pointer transition flex flex-col items-center">
                    <MapPinIcon className="w-14 h-14 text-purple-500 mb-2" />
                    <p className="mt-2 font-semibold text-lg">施設マップ</p>
                </div>
                <div onClick={() => onNavigate('mypage')} className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center cursor-pointer transition flex flex-col items-center">
                    <UserIcon className="w-14 h-14 text-red-500 mb-2" />
                    <p className="mt-2 font-semibold text-lg">マイページ</p>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">新着イベント</h2>
                <div className="bg-white p-4 rounded-xl shadow space-y-3">
                    {events.slice(0, 2).map(event => (
                        <div key={event.id} className="flex items-start">
                           <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded mr-3">イベント</span>
                           <p className="text-gray-700">{event.title}の予約が始まりました。</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const DocumentsPage = ({ onBack, documents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');

    const filteredDocs = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === 'all' || doc.category === category)
    );

    return (
        <div>
            <PageHeader title="パンフレット・書類" onBack={onBack} />
            <div className="p-4">
                <div className="relative mb-4">
                    <input type="text" placeholder="キーワードで検索" className="w-full p-3 pl-10 border rounded-lg" onChange={(e) => setSearchTerm(e.target.value)} />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="mb-4">
                    <select className="w-full p-3 border rounded-lg" onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">すべてのカテゴリ</option>
                        <option value="保育園・幼稚園">保育園・幼稚園</option>
                        <option value="各種申請">各種申請</option>
                        <option value="パンフレット">パンフレット</option>
                        <option value="健康・医療">健康・医療</option>
                    </select>
                </div>
                <div className="space-y-3">
                    {filteredDocs.map(doc => (
                        <div key={doc.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${doc.type === 'PDF' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{doc.type}</span>
                                <h3 className="font-bold mt-2">{doc.title}</h3>
                                <p className="text-sm text-gray-500">{doc.category} • {doc.date}</p>
                            </div>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-green-600 font-semibold">開く</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EventsPage = ({ onBack, events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = (event) => {
        setSelectedEvent(event); setIsModalOpen(true); setAiResponse('');
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); setSelectedEvent(null);
    };
    const handleGetAITips = async () => {
        if (!selectedEvent) return;
        setIsLoading(true); setAiResponse('');
        const prompt = `私は江戸川区在住の保護者です。「${selectedEvent.title}」というイベントに、対象年齢「${selectedEvent.age}」の子供と参加します。このイベントを最大限に楽しむための、具体的なアドバイスをください。`;
        const response = await callDummyGeminiAPI(prompt);
        setAiResponse(response); setIsLoading(false);
    };

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div>
            <PageHeader title="イベント情報" onBack={onBack} />
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2">2025年 7月</h2>
                <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">{days.map(day => <div key={day}>{day}</div>)}</div>
                <div className="grid grid-cols-7 gap-1 text-center">{calendarDays.map(day => (<div key={day} className={`p-2 rounded-full relative ${[15, 20, 22].includes(day) ? 'bg-blue-100 font-bold' : ''}`}>{day}{[15, 20, 22].includes(day) && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>}</div>))}</div>
                <h2 className="text-lg font-bold mt-6 mb-4">イベント一覧</h2>
                <div className="space-y-3">
                    {events.map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-bold">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.location} • {event.date}</p>
                            <p className="text-sm text-gray-500">対象: {event.age}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <button onClick={() => handleOpenModal(event)} className="text-green-600 font-semibold">詳細を見る</button>
                                <button disabled={event.status !== '予約可'} className={`px-4 py-2 rounded-lg text-sm font-bold ${event.status === '予約可' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>{event.status}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center"><h2 className="text-lg font-bold">{selectedEvent.title}</h2><button onClick={handleCloseModal}><XIcon className="w-6 h-6 text-gray-500" /></button></div>
                        <div className="p-4 overflow-y-auto">
                            <p><strong>場所:</strong> {selectedEvent.location}</p><p><strong>日時:</strong> {selectedEvent.date}</p><p><strong>対象年齢:</strong> {selectedEvent.age}</p>
                            <div className="mt-4"><button onClick={handleGetAITips} disabled={isLoading} className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"><SparklesIcon className="w-5 h-5 mr-2" />✨ イベントのヒントをAIに聞く</button></div>
                            {isLoading && <LoadingSpinner />}
                            {aiResponse && (<div className="mt-4 p-4 bg-gray-100 rounded-lg"><h4 className="font-bold text-gray-800 mb-2">AIからのアドバイス</h4><p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p></div>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Map Page (地図ライブラリを削除し、シンプルなリスト表示に変更) ---
const MapPage = ({ onBack, facilities }) => {
    return (
        <div className="flex flex-col h-full">
            <PageHeader title="施設情報マップ" onBack={onBack} />
            <div className="p-4">
                <div className="bg-gray-200 text-gray-500 text-center py-20 rounded-lg mb-4">
                    ここに地図が表示されます
                </div>
                <h3 className="text-lg font-bold mb-3">施設一覧</h3>
                <div className="space-y-3">
                    {facilities.map(facility => (
                        <div key={facility.id} className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold">{facility.name}</h4>
                            <p className="text-sm text-gray-600">{facility.address}</p>
                            <p className="text-xs text-gray-500 mt-1">{facility.category}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const MyPage = ({ onBack, userData }) => {
    const [aiAdvice, setAiAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetAIAdvice = async () => {
        setIsLoading(true); setAiAdvice('');
        const age = userData.childAge;
        const prompt = `私は${age}歳の子どもを持つ親です。今週末、子どもと一緒に江戸川区内で楽しめる遊びのアイデアを3つ提案してください。`;
        const response = await callDummyGeminiAPI(prompt);
        setAiAdvice(response); setIsLoading(false);
    };

    return (
        <div>
            <PageHeader title="マイページ" onBack={onBack} />
            <div className="p-4 space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold mb-4">お子様の情報</h2>
                    <div className="space-y-2">
                        <p>ニックネーム: {userData.childName}</p>
                        <p>年齢: {userData.childAge}歳</p>
                        <button className="text-green-600 font-semibold text-sm">編集する</button>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold mb-4">✨ AIからの子育てアドバイス</h2>
                    <p className="text-sm text-gray-600 mb-4">お子様の年齢に合わせた遊びのアイデアをAIが提案します。</p>
                    <button onClick={handleGetAIAdvice} disabled={isLoading} className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"><SparklesIcon className="w-5 h-5 mr-2" />今週末の遊びを提案してもらう</button>
                    {isLoading && <LoadingSpinner />}
                    {aiAdvice && (<div className="mt-4 p-4 bg-gray-100 rounded-lg"><p className="text-gray-700 whitespace-pre-wrap">{aiAdvice}</p></div>)}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold mb-4">通知設定</h2>
                    <div className="flex justify-between items-center">
                        <p>お住まいの地域のイベント通知</p>
                        <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" value="" className="sr-only peer" defaultChecked /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div></label>
                    </div>
                     <div className="flex justify-between items-center mt-4">
                        <p>申請期限のリマインダー</p>
                        <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" value="" className="sr-only peer" defaultChecked /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component (Firebaseを削除し、状態管理を簡素化) ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    
    // アプリケーション内で使用するデータをuseStateで管理します
    const [documents, setDocuments] = useState(initialDocuments);
    const [events, setEvents] = useState(initialEvents);
    const [facilities, setFacilities] = useState(initialFacilities);
    const [userData, setUserData] = useState(initialUserData);

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // ページ遷移時にトップへスクロール
    };
    
    // 表示するページをcurrentPageの値に応じて切り替えます
    const renderPage = () => {
        switch (currentPage) {
            case 'documents': return <DocumentsPage onBack={() => handleNavigate('home')} documents={documents} />;
            case 'events': return <EventsPage onBack={() => handleNavigate('home')} events={events} />;
            case 'map': return <MapPage onBack={() => handleNavigate('home')} facilities={facilities} />;
            case 'mypage': return <MyPage onBack={() => handleNavigate('home')} userData={userData} />;
            case 'home':
            default: return <HomePage onNavigate={handleNavigate} events={events} />;
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-16 md:pb-0">
            <Header onNavigate={handleNavigate} />
            <main>
                {renderPage()}
            </main>
            <BottomNav activePage={currentPage} onNavigate={handleNavigate} />
        </div>
    );
}