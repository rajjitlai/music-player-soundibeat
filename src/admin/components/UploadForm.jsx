import React, { useState } from 'react';
import { storage, database, ID } from '../../config/appwrite.js';

const UploadForm = ({ onClose, onUploadSuccess }) => {
    const [musicFile, setMusicFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [error, setError] = useState('');

    const sanitizeTitle = (title) => {
        return title.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
    };

    const handleMusicFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile instanceof File) {
            const fileExtension = selectedFile.name.split('.').pop();
            const newFileName = `${title}.${fileExtension}`;
            const newFile = new File([selectedFile], newFileName, { type: selectedFile.type });
            setMusicFile(newFile);
        } else {
            setError('Please select a valid music file.');
        }
    };

    const handleThumbnailFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile instanceof File) {
            setThumbnailFile(selectedFile);
        } else {
            setError('Please select a valid thumbnail file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!musicFile || !thumbnailFile) {
                throw new Error('Please select both a music file and a thumbnail file.');
            }

            const sanitizedTitle = sanitizeTitle(title);

            const musicResponse = await storage.createFile(
                import.meta.env.VITE_APPWRITE_STORAGE_BUCKET,
                sanitizedTitle,
                musicFile
            );
            
            const thumbnailResponse = await storage.createFile(
                import.meta.env.VITE_APPWRITE_STORAGE_BUCKET,
                `${sanitizedTitle}_thumbnail`,
                thumbnailFile
            );

            const musicFileId = musicResponse.$id;
            const thumbnailFileId = thumbnailResponse.$id;

            const musicFileUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_APPWRITE_STORAGE_BUCKET}/files/${musicFileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
            const thumbnailFileUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_APPWRITE_STORAGE_BUCKET}/files/${thumbnailFileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;

            const documentData = {
                title: title,
                artist: artist,
                musicFileId: musicFileId,
                thumbnailFileId: thumbnailFileId,
                musicFileUrl: musicFileUrl,
                thumbnailFileUrl: thumbnailFileUrl,
            };

            const documentId = ID.unique();
            await database.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE,
                import.meta.env.VITE_APPWRITE_COLLECTION,
                documentId,
                documentData
            );

            alert("Music file uploaded successfully")
            
            onUploadSuccess();
            onClose();
        
        } catch (error) {
            console.error('Error uploading files:', error);
            setError('Failed to upload files. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-secondary p-8 rounded shadow-sm">
                <h2 className="text-lg font-bold mb-4">Upload Music</h2>
                {error && <p className="text-red">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className='flex flex-col gap-2'>
                        <label className="text-white">Title:</label>
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-2 p-2 pl-2 border-none outline-none rounded-md text-black" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-white">Artist:</label>
                        <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} required className="mt-2 p-2 pl-2 border-none outline-none rounded-md text-black" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="music" className='text-white'>Select Music File</label>
                        <input type="file" accept='audio/*' onChange={handleMusicFileChange} required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="thumbnail" className='text-white'>Select Thumbnail File</label>
                        <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleThumbnailFileChange} required />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={onClose} className='bg-whiteAlt px-3 py-2 rounded-lg text-black hover:text-primary'>Cancel</button>
                        <button type="submit" className='bg-primary px-3 py-2 rounded-lg text-white hover:text-whiteAlt'>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;
