export async function uploadCsv(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/backend/import`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload CSV.");
  }

  return response.json();
}