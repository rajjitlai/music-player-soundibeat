import React, { useState, useEffect } from 'react';
import { database } from "../config/appwrite.js";

const MusicDataContext = React.createContext();

const MusicDataProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchMusicData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await database.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE,
                import.meta.env.VITE_APPWRITE_COLLECTION
            );

            const data = response.documents.map((doc) => ({
                id: doc.$id,
                title: doc.title,
                artist: doc.artist,
                musicFileId: doc.musicFileId,
                thumbnailFileId: doc.thumbnailFileId,
                musicFileUrl: doc.musicFileUrl,
                thumbnailFileUrl: doc.thumbnailFileUrl
            }));

            setMusicData(data);
        } catch (err) {
            console.error('Error fetching music data:', err);
            setError('Failed to load music data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMusicData();
    }, []);

    return (
        <MusicDataContext.Provider value={{ musicData, isLoading, error, fetchMusicData }}>
            {children}
        </MusicDataContext.Provider>
    );
};

export { MusicDataContext, MusicDataProvider };
