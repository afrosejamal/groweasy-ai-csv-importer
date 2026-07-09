export async function uploadCsv(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch("http://localhost:5000/api/import", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload CSV.");
  }

  return response.json();
}