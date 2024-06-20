const createAnnotation = async (data: { [key: string]: any }) => {
  const res = await fetch("https://api.example.com/annotations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create annotation");
  }

  return res.json();
};

export default createAnnotation;