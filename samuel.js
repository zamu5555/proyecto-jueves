const API_KEY = "AIzaSyCUOnNR4IIatK-vHotwvJZF25R9Dq_jgCg"; 
const API_URL = "https://corsproxy.io/?" + encodeURIComponent(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY
);

document.getElementById("boton").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value.trim();
  const outputDiv = document.getElementById("output");

  if (!inputText) {
    outputDiv.innerHTML = "Escribe una expresión en inglés";
    return;
  }

  outputDiv.innerHTML = `
  <img src="src/img/portalgif.gif" alt="Cargando..." width="150">
  <p>Analizando la expresión...</p>
`;

  const prompt = `
    Explica el significado coloquial de la expresión o palabra en inglés "${inputText}".
    Da una explicación en español simple y un ejemplo en inglés con su traducción.
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se encontró una explicación.";

    outputDiv.innerHTML = `<strong>Explicación:</strong><br>${text}`;
  } catch (error) {
    outputDiv.innerHTML = "Error al conectarse con la API.";
    console.error(error);
  }
});
