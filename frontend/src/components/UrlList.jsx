import { useState } from "react";
import UrlItem from "./UrlItem.jsx";

export default function UrlList({ urls, setUrls, isEditing, setIsEditing }) {
    if (!urls || urls.length === 0) {
        return <p className="text-gray-500 text-center">No URLs yet</p>;
    }

    const handleDelete = (shortCode) => {
        setUrls(urls.filter((url) => url.shortCode !== shortCode));
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-end mb-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    {isEditing ? "Done" : "Edit"}
                </button>
            </div>
            {urls.map((url, i) => (
                <UrlItem
                    key={i}
                    url={url}
                    onDelete={handleDelete}
                    isEditing={isEditing}
                />
            ))}
        </div>
    );
}
