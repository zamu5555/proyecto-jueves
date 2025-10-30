const API_KEY = "AIzaSyCUOnNR4IIatK-vHotwvJZF25R9Dq_jgCg";
const API_URL = "https://corsproxy.io/?" + encodeURIComponent(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY
);

document.getElementById("boton").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value.trim();
  const outputDiv = document.getElementById("output");

  if (!inputText) {
    outputDiv.innerHTML = "Escribe una expresión en inglés.";
    return;
  }

  outputDiv.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center">
      <img src="src/img/portalgif.gif" alt="Cargando..." width="150" class="mx-auto">
      <p class="mt-2 text-purple-900 font-medium">Analizando la expresión...</p>
    </div>
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
    guardarExpresion(inputText, text);
    mostrarHistorial();
  } catch (error) {
    outputDiv.innerHTML = "Error al conectarse con la API.";
    console.error(error);
  }
});

function guardarExpresion(expresion, explicacion) {
  const historial = JSON.parse(localStorage.getItem("historialExpresiones")) || [];
  historial.unshift({ expresion, explicacion, fecha: new Date().toLocaleString() });
  localStorage.setItem("historialExpresiones", JSON.stringify(historial));
}

function mostrarHistorial() {
  const historialDiv = document.getElementById("historial");
  const historial = JSON.parse(localStorage.getItem("historialExpresiones")) || [];

  if (historial.length === 0) {
    historialDiv.innerHTML = "<p class='text-gray-600 text-center'>Aún no hay expresiones guardadas.</p>";
    return;
  }

  historialDiv.innerHTML = `
    <h2 class="text-lg font-semibold mb-2 text-purple-900 text-center">Historial de expresiones</h2>
    <ul class="space-y-2">
      ${historial.map(item => `
        <li class="bg-white bg-opacity-70 rounded-lg p-3 border border-purple-200 shadow-sm">
          <strong>${item.expresion}</strong><br>
          <small>${item.fecha}</small><br>
          <p class="text-sm text-gray-700">${item.explicacion}</p>
        </li>
      `).join("")}
    </ul>
  `;
}

document.addEventListener("DOMContentLoaded", mostrarHistorial);

document.getElementById("borrarHistorial").addEventListener("click", () => {
  localStorage.removeItem("historialExpresiones");
  mostrarHistorial();
});
