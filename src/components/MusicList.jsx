import React, { useContext, useEffect, useState } from 'react';
import { MusicDataContext } from '../data/musicData';
import defaultThumb from "../../assets/defaultThumb.png";
import MusicPlayer from './MusicPlayer';
import "../index.css"
import MoreVertMenu from './MoreVertMenu';
import { account, database, storage } from '../config/appwrite';

const MusicList = ({ refresh, onPlay }) => {
    const { musicData, isLoading, error, fetchMusicData } = useContext(MusicDataContext);
    const [selectedMusic, setSelectedMusic] = useState(null);

    useEffect(() => {
        fetchMusicData();
    }, [refresh]);

    const handleMusicClick = (music) => {
        setSelectedMusic(music);
        onPlay(music);
    };

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const user = await account.get();
                setIsAdmin(user.labels.includes('admin'));
            } catch (error) {
            }
        };

        checkAdminStatus();
    }, []);

    const handleDeleteMusic = async (music, refreshCallback) => {
        const docId = music.id;
        const musicFile = music.musicFileId;
        const thumbnailFile = music.thumbnailFileId;

        try {
            await database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE, import.meta.env.VITE_APPWRITE_COLLECTION, docId)
            await storage.deleteFile(import.meta.env.VITE_APPWRITE_STORAGE_BUCKET, musicFile)
            await storage.deleteFile(import.meta.env.VITE_APPWRITE_STORAGE_BUCKET, thumbnailFile)
            alert('Music deleted successfully');
            refreshCallback()
        } catch (error) {
            console.error('Error deleting music:', error);
        }
    }

    return (
        <div className="container relative flex flex-col gap-4">
            <div className='items-center text-center m-4'>
                <h1 className='font-semibold text-3xl lg:text-5xl'>Music for Creators</h1>
            </div>
            <>
                {isLoading ? (
                    <p className="text-center">Loading music...</p>
                ) : error ? (
                    <p className="text-center text-red">{error}</p>
                ) : musicData.length === 0 ? (
                    <p className="text-center text-whiteAlt">No music found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto h-auto">
                        {musicData.map((music) => (
                            <div key={music.id} className='relative'>
                                <div className="flex flex-row md:flex-col items-start gap-2 p-2 py-4 lg:py-4 rounded-md bg-secondaryAlt border border-secondaryNew cursor-pointer w-full relative" onClick={() => handleMusicClick(music)}>
                                    <img
                                        src={music.thumbnailFileUrl || defaultThumb}
                                        className="w-10 h-10 md:w-full md:h-full object-cover border border-borderNew rounded-md"
                                    />
                                    <div className='flex flex-col items-start'>
                                        <p className="text-sm md:text-lg font-medium">{music.title}</p>
                                        <p className="text-base md:text-sm text-gray-500">{music.artist}</p>
                                    </div>
                                </div>
                                {isAdmin &&
                                    <div className='absolute z-50 bottom-[20px] right-[-5px]'>
                                        <>
                                            <MoreVertMenu onDelete={() => handleDeleteMusic(music, fetchMusicData)} />
                                        </>
                                    </div>
                                }
                            </div>
                        )).reverse()}
                    </div>
                )}
                {selectedMusic && <MusicPlayer music={selectedMusic} onClose={() => setSelectedMusic(null)} />}
            </>
        </div>
    );
};

export default MusicList;
