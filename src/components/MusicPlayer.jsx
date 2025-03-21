import React, { useEffect, useState } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import defaultThumb from "../../assets/defaultThumb.png";
import "../index.css"
import download from "../../assets/download.svg"

const MusicPlayer = ({ isVisible, selectedMusic, onClose }) => {
    if (!isVisible || !selectedMusic) {
        return null;
    }

    const { musicFileUrl, title, artist, musicFileId } = selectedMusic;
    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [totalDuration, setTotalDuration] = useState("00:00:00");

    const onReady = (ws) => {
        setWavesurfer(ws);
        setTotalDuration(formatTime(ws.getDuration()));
    };

    const onPlayPause = () => {
        if (wavesurfer) {
            if (isPlaying) {
                wavesurfer.pause();
            } else {
                wavesurfer.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleDownload = async () => {
        try {
            const downloadUrl = `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_STORAGE_BUCKET}/files/${musicFileId}/download?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
            window.open(downloadUrl, "_blank");
        } catch (error) {
            console.error("Error downloading file: ", error);
        }
    };

    const formatTime = (seconds) => {
        const format = (val) => `0${Math.floor(val)}`.slice(-2);
        const minutes = format((seconds % 3600) / 60);
        const secs = format(seconds % 60);
        return `${minutes}:${secs}`;
    };

    useEffect(() => {
        const storedIsPlaying = localStorage.getItem('isPlaying');
        setIsPlaying(storedIsPlaying ? JSON.parse(storedIsPlaying) : true);

        return () => {
            if (wavesurfer) {
                wavesurfer.unAll();
                wavesurfer.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (isPlaying && wavesurfer) {
            wavesurfer.play();
        }
        localStorage.setItem('isPlaying', JSON.stringify(isPlaying));
    }, [isPlaying, wavesurfer]);

    const onFinish = () => {
        setIsPlaying(false);
    };

    return (
        <div className='absolute'>
            <div className='flex left-0 flex-row items-center bg-secondary fixed bottom-0 bg-gray-900 shadow-xl h-auto w-full overflow-hidden gap-2 px-0'>
                <div className='px-0 p-6 lg:px-4 pr-2 w-full'>
                    <div className='flex gap-4 items-center relative'>
                        <div className='flex-none max-w-[120px]'>
                            <div className='relative'>
                                <div className='w-20 h-20 lg:w-24 lg:h-24 relative'>
                                    <img src={selectedMusic.thumbnailFileUrl || defaultThumb} className="w-full h-full border border-borderNew rounded-md object-cover" />
                                    <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
                                    <button onClick={onPlayPause} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        {isPlaying ? <PauseIcon className='increaseSize' /> : <PlayArrowIcon className='increaseSize' />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="absolute top-[-5px]">
                                <p className="text-xs md:text-md xl:text-lg">{artist} - {title}</p>
                            </div>
                            <WavesurferPlayer
                                height={50}
                                waveColor="rgb(200,200,200)"
                                cursorColor='rgba(255,255,255)'
                                onReady={onReady}
                                onFinish={onFinish}
                                url={musicFileUrl}
                            />
                            <div className="absolute right-[3.5%] flex items-center gap-4">
                                <div className='text-sm md:text-md'>
                                    <span id="totalDuration">{totalDuration}</span>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer" onClick={handleDownload} >
                            <img src={download} className='w-6 md:w-8 lg:w-10' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer;
