export default function UrlItem({ url }) {
    return (
        <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition">
            <div>
                <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium hover:underline"
                >
                    {url.shortUrl}
                </a>
                <p className="text-sm text-gray-600 break-all">
                    {url.originalUrl}
                </p>
            </div>
            <button
                className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
                onClick={() => navigator.clipboard.writeText(url.shortUrl)}
            >
                Copy
            </button>
        </div>
    );
}
