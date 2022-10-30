

export async function UploadImages(files: FileList) {
  const form = new FormData();

  Array.from(files).forEach((file) => {
    form.append("files", file, "form");
  });

  const userToken: string | null = sessionStorage.getItem("jwtToken");

  if (!userToken) {
    throw new Error("You are not allowed to upload images");
  }

  const uploadImages = await fetch("http://localhost:1337/upload", {
    headers: {
      Authorization: `Bearer ${userToken.split('"').join("")}`,
    },
    method: "POST",
    body: form,
  }).catch((err) => {
    throw new Error(
      "An error occured when uploading images, please retry later"
    );
  });

  const images = await uploadImages.json();
  
  if (images) {
    return images.map(
      (image) => "http://localhost:1337" + image.url
    );
    
  }

  throw new Error(
    "An error occured when uploading images, please retry later"
  );
}