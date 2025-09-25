import { useState, useEffect } from "react";
import UrlForm from "../components/UrlForm.jsx";
import UrlList from "../components/UrlList.jsx";
import { shortenUrl, listUserUrls } from "../api/url.js";

export default function Home({ username }) {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function fetchUrls() {
            try {
                const data = await listUserUrls();
                setUrls(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUrls();
    }, []);

    const handleShorten = async (originalUrl) => {
        try {
            const data = await shortenUrl(originalUrl);
            setUrls((prev) => [data, ...prev]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">
                Welcome, {username}
            </h1>
            <UrlForm onShorten={handleShorten} />
            <UrlList urls={urls} />
        </div>
    );
}
