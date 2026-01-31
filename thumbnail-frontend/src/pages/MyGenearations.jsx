


import { useEffect, useState } from "react";
import axios from "axios";

export default function MyGenerations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/generations/my-generations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

const handleDelete = async (id) => {
  if (!window.confirm("Delete this thumbnail?")) return;

  const url = `http://localhost:5000/api/generations/my-generations/${id}`;
  console.log("DELETE URL 👉", url);

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData((prev) => prev.filter((item) => item._id !== id));
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};



  if (loading)
    return <p className="pt-32 text-center text-white">Loading...</p>;

  if (data.length === 0)
    return (
      <p className="pt-32 text-center text-gray-400">
        No thumbnails generated yet 🚀
      </p>
    );

  return (
    <div className="pt-32 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-white mb-6">
        My Generations
      </h1>

      <div className="grid py-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-black/40 backdrop-blur-xl 
                       border border-white/10 rounded-xl 
                       overflow-hidden hover:scale-[1.02] transition"
          >
            <img
              src={item.imageUrl}
              alt="thumbnail"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-gray-300 truncate">
                {item.title}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.style}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 text-xs text-red-400 hover:text-red-300 transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
