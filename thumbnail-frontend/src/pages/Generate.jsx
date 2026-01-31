// import { useState } from "react";
// import { ImageIcon } from "lucide-react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import Title from "../components/Title";

// /* ======================
//    CONFIG
// ====================== */
// const RATIOS = {
//   "16:9": { width: 16, height: 9 },
//   "1:1": { width: 1, height: 1 },
//   "9:16": { width: 9, height: 16 },
// };

// const COLOR_SCHEMES = [
//   { name: "Vibrant", bg: "from-pink-500/30 to-indigo-500/30", ring: "ring-pink-500" },
//   { name: "Dark", bg: "from-gray-800 to-black", ring: "ring-gray-500" },
//   { name: "Blue", bg: "from-sky-500/30 to-indigo-600/30", ring: "ring-sky-500" },
//   { name: "Green", bg: "from-emerald-500/30 to-teal-500/30", ring: "ring-emerald-500" },
//   { name: "Purple", bg: "from-violet-500/30 to-fuchsia-500/30", ring: "ring-violet-500" },
// ];

// export default function Generate() {
//   const [title, setTitle] = useState("");
//   const [ratio, setRatio] = useState("16:9");
//   const [color, setColor] = useState(COLOR_SCHEMES[0]);
//   const [style, setStyle] = useState("Bold & Graphic");
//   const [extraPrompt, setExtraPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* Responsive preview size */
//   const baseWidth = 420;
//   const previewWidth =
//     typeof window !== "undefined" && window.innerWidth < 640 ? 280 : baseWidth;

//   const previewHeight =
//     (previewWidth * RATIOS[ratio].height) / RATIOS[ratio].width;

//   /* ======================
//      API CALL (CONNECTED)
//   ====================== */
//   const handleGenerate = async () => {
//     if (!title.trim()) {
//       toast.error("Please enter a title");
//       return;
//     }

//     try {
//       setLoading(true);
//       setImageUrl(null);
//       toast.loading("Generating thumbnail...");

//       const res = await fetch("http://localhost:5000/api/generate-thumbnail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title,
//           ratio,
//           colorScheme: color,
//           style,
//           extraPrompt,
//         }),
//       });

//       const data = await res.json();
//       toast.dismiss();

//       if (!data.success) {
//         throw new Error("Generation failed");
//       }

//       setImageUrl(data.data.imageUrl);
//       toast.success("Thumbnail generated successfully 🎉");
//     } catch (err) {
//       console.error(err);
//       toast.dismiss();
//       toast.error("Thumbnail generation failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-15 mt-6 sm:py-16 md:py-20 2xl:py-32 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto">

//         {/* PAGE TITLE */}
//         <div className="text-center md:text-left mb-12 md:mb-16">
//           <Title
//             title="Generate"
//             heading="Create high-click thumbnails in seconds"
//             description="Customize your style, colors, and format — our AI helps you design thumbnails that stand out and get more clicks."
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

//           {/* LEFT PANEL */}
//           <div className="glass-panel rounded-2xl p-5 sm:p-6 space-y-5">

//             {/* Title */}
//             <div>
//               <label className="text-sm text-gray-300">Title or Topic</label>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="e.g. 10 Tips for Better Sleep"
//                 className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-500"
//               />
//             </div>

//             {/* Aspect Ratio */}
//             <div>
//               <label className="text-sm text-gray-300">Aspect Ratio</label>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {Object.keys(RATIOS).map((key) => (
//                   <button
//                     key={key}
//                     onClick={() => setRatio(key)}
//                     className={`px-4 py-2 rounded-lg text-xs border transition ${
//                       ratio === key
//                         ? "border-indigo-500 bg-indigo-500/10"
//                         : "border-white/10 text-gray-300"
//                     }`}
//                   >
//                     {key}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Scheme */}
//             <div>
//               <label className="text-sm text-gray-300">Color Scheme</label>
//               <div className="flex gap-3 mt-2 flex-wrap">
//                 {COLOR_SCHEMES.map((scheme) => (
//                   <button
//                     key={scheme.name}
//                     onClick={() => setColor(scheme)}
//                     className={`w-9 h-9 rounded-full bg-gradient-to-br ${scheme.bg} ring-2 ${
//                       color.name === scheme.name
//                         ? `${scheme.ring} ring-offset-2 ring-offset-gray-950`
//                         : "ring-transparent"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Style */}
//             <div>
//               <label className="text-sm text-gray-300">Thumbnail Style</label>
//               <select
//                 value={style}
//                 onChange={(e) => setStyle(e.target.value)}
//                 className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-500"
//               >
//                 <option>Bold & Graphic</option>
//                 <option>Minimal</option>
//                 <option>Dark & Cinematic</option>
//                 <option>Bright & Colorful</option>
//               </select>
//             </div>

//             {/* Extra Prompt */}
//             <div>
//               <label className="text-sm text-gray-300">
//                 Additional prompts
//               </label>
//               <textarea
//                 rows={3}
//                 value={extraPrompt}
//                 onChange={(e) => setExtraPrompt(e.target.value)}
//                 placeholder="Add mood, colors, emotions..."
//                 className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-500 resize-none"
//               />
//             </div>

//             {/* Button */}
//             <button
//               onClick={handleGenerate}
//               disabled={loading}
//               className={`w-full mt-4 py-3 rounded-xl font-semibold transition
//                 ${loading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90"
//                 } text-white`}
//             >
//               {loading ? "Generating..." : "Generate Thumbnail"}
//             </button>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="glass-panel rounded-2xl p-5 sm:p-6">
//             <h3 className="text-sm text-gray-300 mb-4">Preview</h3>

//             <div className="flex items-center justify-center min-h-[300px]">
//               <motion.div
//                 animate={{ opacity: 1 }}
//                 style={{ width: previewWidth, height: previewHeight }}
//                 className={`rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br ${color.bg}`}
//               >
//                 {imageUrl ? (
//                   <img
//                     src={imageUrl}
//                     alt="Generated thumbnail"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="h-full flex flex-col items-center justify-center text-white/70 text-sm">
//                     <ImageIcon className="mb-2 opacity-60" />
//                     Thumbnail preview
//                     <p className="text-xs mt-1">
//                       {ratio} • {color.name}
//                     </p>
//                   </div>
//                 )}
//               </motion.div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

/* ======================
   CONFIG
====================== */
const RATIOS = {
  "16:9": { width: 16, height: 9 },
  "1:1": { width: 1, height: 1 },
  "9:16": { width: 9, height: 16 },
};

const COLOR_SCHEMES = [
  { name: "Vibrant", bg: "from-pink-500/30 to-indigo-500/30", ring: "ring-pink-500" },
  { name: "Dark", bg: "from-gray-800 to-black", ring: "ring-gray-500" },
  { name: "Blue", bg: "from-sky-500/30 to-indigo-600/30", ring: "ring-sky-500" },
  { name: "Green", bg: "from-emerald-500/30 to-teal-500/30", ring: "ring-emerald-500" },
  { name: "Purple", bg: "from-violet-500/30 to-fuchsia-500/30", ring: "ring-violet-500" },
];

export default function Generate() {

   const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ratio, setRatio] = useState("16:9");
  const [color, setColor] = useState(COLOR_SCHEMES[0]);
  const [style, setStyle] = useState("Bold & Graphic");
  const [extraPrompt, setExtraPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  // 🔥 LOGIC ONLY (NEW)
  const [finalImage, setFinalImage] = useState(null);

  const [loading, setLoading] = useState(false);

  /* Responsive preview size */
  const baseWidth = 420;
  const previewWidth =
    typeof window !== "undefined" && window.innerWidth < 640 ? 280 : baseWidth;

  const previewHeight =
    (previewWidth * RATIOS[ratio].height) / RATIOS[ratio].width;

  /* ======================
     CANVAS LOGIC (NEW)
     Image + Title bake
  ====================== */
const bakeTitleOnImage = (imageUrl, title, style = "") => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      // background
      ctx.drawImage(img, 0, 0);

      /* ========= TITLE ========= */
      ctx.font = "900 72px Poppins, Arial";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.shadowColor = "rgba(0,0,0,0.9)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      ctx.fillText(
        (title || "").toUpperCase(),
        canvas.width / 2,
        canvas.height / 2
      );

      /* ========= STYLE TAG ========= */
      if (style) {
        ctx.shadowBlur = 0;
        ctx.font = "600 32px Poppins, Arial";
        ctx.fillStyle = "#FFD700";

        ctx.fillText(
          style.toUpperCase(),
          canvas.width / 2,
          canvas.height - 60
        );
      }

      resolve(canvas.toDataURL("image/png"));
    };
  });
};



  /* ======================
     OPTIONAL HELPERS (NEW)
     (UI lo ippudu use cheyyatledu)
  ====================== */
  const downloadImage = () => {
    if (!finalImage) return;
    const link = document.createElement("a");
    link.href = finalImage;
    link.download = "thumbnail.png";
    link.click();
  };

  const openInNewTab = () => {
    if (!finalImage) return;
    window.open(finalImage, "_blank");
  };

  /* ======================
     API CALL (CONNECTED)
  ====================== */
  const handleGenerate = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login to continue 🔐");
    navigate("/auth");
    return;
  }

  if (!title.trim()) {
    toast.error("Please enter a title");
    return;
  }

  try {
    setLoading(true);
    setImageUrl(null);
    setFinalImage(null);

    const toastId = toast.loading("Generating thumbnail...");

    const res = await fetch("http://localhost:5000/api/generate/generate-thumbnail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ NOW IT WILL GO
      },
      body: JSON.stringify({
        title,
        ratio,
        colorScheme: color,
        style,
        extraPrompt,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Server error");
    }

    setImageUrl(data.data.imageUrl);

    const baked = await bakeTitleOnImage(
      data.data.imageUrl,
      title,
      style
    );
    setFinalImage(baked);

    toast.success("Thumbnail generated successfully 🎉", { id: toastId });
  } catch (err) {
    console.error("Generate error:", err.message);
    toast.error(err.message || "Thumbnail generation failed ❌");
  } finally {
    setLoading(false);
  }
};





  return (
    <section className="py-15 mt-6 sm:py-16 md:py-20 2xl:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <div className="text-center md:text-left mb-12 md:mb-16">
          <Title
            title="Generate"
            heading="Create high-click thumbnails in seconds"
            description="Customize your style, colors, and format — our AI helps you design thumbnails that stand out and get more clicks."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* LEFT PANEL (UNCHANGED) */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 space-y-5">

            <div>
              <label className="text-sm text-gray-300">Title or Topic</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Tips for Better Sleep"
                className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Aspect Ratio</label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {Object.keys(RATIOS).map((key) => (
                  <button
                    key={key}
                    onClick={() => setRatio(key)}
                    className={`px-4 py-2 rounded-lg text-xs border transition ${
                      ratio === key
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-white/10 text-gray-300"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Color Scheme</label>
              <div className="flex gap-3 mt-2 flex-wrap">
                {COLOR_SCHEMES.map((scheme) => (
                  <button
                    key={scheme.name}
                    onClick={() => setColor(scheme)}
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${scheme.bg} ring-2 ${
                      color.name === scheme.name
                        ? `${scheme.ring} ring-offset-2 ring-offset-gray-950`
                        : "ring-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Thumbnail Style</label>
              <select
  value={style}
  onChange={(e) => setStyle(e.target.value)}
  className="mt-2 w-full rounded-lg 
             ring-offset-gray-950 text-white 
             border border-white/10 
             px-4 py-2 text-sm 
             outline-none 
             focus:border-indigo-500"
>
  <option className="bg-gray-900 text-white">
    Bold & Graphic
  </option>
  <option className="bg-gray-900 text-white">
    Minimal
  </option>
  <option className="bg-gray-900 text-white">
    Dark & Cinematic
  </option>
  <option className="bg-gray-900 text-white">
    Bright & Colorful
  </option>
</select>

            </div>

            <div>
              <label className="text-sm text-gray-300">
                Additional prompts
              </label>
              <textarea
                rows={3}
                value={extraPrompt}
                onChange={(e) => setExtraPrompt(e.target.value)}
                placeholder="Add mood, colors, emotions..."
                className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full mt-4 py-3 rounded-xl font-semibold transition
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90"
                } text-white`}
            >
              {loading ? "Generating..." : "Generate Thumbnail"}
            </button>
          </div>

          {/* RIGHT PANEL (UNCHANGED) */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6">
            <h3 className="text-sm text-gray-300 mb-4">Preview</h3>

           <div className="flex flex-col items-center justify-center min-h-[300px]">
  <motion.div
    animate={{ opacity: 1 }}
    style={{ width: previewWidth, height: previewHeight }}
    className={`rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br ${color.bg}`}
  >
    {finalImage ? (
      <img
        src={finalImage}
        alt="Generated thumbnail"
        className="w-full h-full object-cover"
      />
    ) : imageUrl ? (
      <img
        src={imageUrl}
        alt="Generated thumbnail"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="h-full flex flex-col items-center justify-center text-white/70 text-sm">
        <ImageIcon className="mb-2 opacity-60" />
        Thumbnail preview
        <p className="text-xs mt-1">
          {ratio} • {color.name}
        </p>
      </div>
    )}
  </motion.div>

  {/* ✅ Download button OUTSIDE image */}
  {finalImage && (
    <div className="ml-5">

    <button
      onClick={downloadImage}
      className="mt-4  self-start  py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90"
    >
      Download Thumbnail
    </button>
    </div>
  )}
</div>

          </div>

        </div>
      </div>
    </section>
  );
}
