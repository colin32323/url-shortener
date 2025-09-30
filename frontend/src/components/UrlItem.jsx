export default function UrlItem({ url }) {
    return (
        <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
            <a
                href={url.shortCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold"
            >
                {url.shortCode}
            </a>
            <span className="text-gray-600 truncate ml-4">
                {url.originalUrl}
            </span>
        </div>
    );
}
