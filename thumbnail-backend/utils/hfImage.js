import axios from "axios";

console.log("🔥 HF KEY INSIDE hfImage =", process.env.HF_API_KEY);

export const generateImage = async (prompt) => {
  const response = await axios.post(
    "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      inputs: prompt,
      options: { wait_for_model: true },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        Accept: "image/png",
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    }
  );

  return Buffer.from(response.data);
};
