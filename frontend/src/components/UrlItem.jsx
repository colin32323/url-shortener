import { urlRoutes } from "../routes.js";
import { deleteUrl } from "../api/url.js";

const BACKEND_URL = import.meta.env?.VITE_API_URL || "http://localhost:3000";

export default function UrlItem({ url, onDelete, isEditing }) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this URL?")) {
            try {
                await deleteUrl(url.shortCode);
                onDelete(url.shortCode); // Remove it from parent state
            } catch (err) {
                console.error(err);
                alert("Failed to delete URL");
            }
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
            <a
                href={`${BACKEND_URL}/${urlRoutes.redirectUrl(url.shortCode)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold"
            >
                {url.shortCode}
            </a>
            <span className="text-gray-600 truncate ml-4">
                {url.originalUrl}
            </span>
            {/* Show delete button only in edit mode */}
            {isEditing && (
                <button
                    onClick={handleDelete}
                    className="ml-4 text-red-500 font-bold hover:text-red-700"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
