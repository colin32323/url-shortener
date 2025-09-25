import UrlItem from "./UrlItem.jsx";

export default function UrlList({ urls }) {
    if (!urls || urls.length === 0) {
        return <p className="text-gray-500 text-center">No URLs yet</p>;
    }
    return (
        <div className="space-y-3">
            {urls.map((url, i) => (
                <UrlItem key={i} url={url} />
            ))}
        </div>
    );
}
