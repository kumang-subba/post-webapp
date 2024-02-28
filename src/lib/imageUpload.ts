import axios from "axios";

export default async function imageUpload(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const {
    data: { url },
  } = await axios.post(`${import.meta.env.VITE_API_URL}/imageURL`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const imageUrl = url.split("?")[0];
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });
  return imageUrl;
}
