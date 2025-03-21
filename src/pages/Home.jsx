import React, { useState } from 'react';
import "../index.css";
import TopBar from '../components/TopBar';
import MusicList from '../components/MusicList';
import { MusicDataProvider } from '../data/musicData';
import MusicPlayer from "../components/MusicPlayer";

const Home = () => {
    const [refreshMusicList, setRefreshMusicList] = useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [showMusicPlayer, setShowMusicPlayer] = useState(false);

    const handleUploadSuccess = () => {
        setRefreshMusicList(prevState => !prevState);
    };

    const toggleMusicPlayer = (music) => {
        setSelectedMusic(music);
        setShowMusicPlayer(true);
    };

    const closeMusicPlayer = () => {
        setShowMusicPlayer(false);
        setSelectedMusic(null);
    };

    return (
        <div className='flex justify-center w-full h-screen bg-primary text-white'>
            <div className="container overflow-y-auto w-full pt-6">
                <TopBar onUploadSuccess={handleUploadSuccess} />
                <div className="flex flex-col gap-4 py-16 mb-20">
                    <MusicDataProvider>
                        <MusicList refresh={refreshMusicList} onPlay={toggleMusicPlayer} />
                        {showMusicPlayer && (
                            <MusicPlayer
                                isVisible={showMusicPlayer}
                                selectedMusic={selectedMusic}
                                onClose={closeMusicPlayer}
                            />
                        )}
                    </MusicDataProvider>
                </div>
            </div>
        </div>
    );
};

export default Home;
