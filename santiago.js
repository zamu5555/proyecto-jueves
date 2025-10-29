const API_URL = "https://restcountries.com/v3.1/name/";

document.getElementById("searchBtn").addEventListener("click", async () => {
    const country = document.getElementById("inputText").value.trim();
    const outputDiv = document.getElementById("output");

    if (!country) {
        outputDiv.innerHTML = "✍️ Escribe el nombre de un país";
        return;
    }

    outputDiv.innerHTML = `
  <div style="padding: 20px;">
    <img src="src/img/portalgif.gif" alt="Cargando..." width="80" style="margin: 0 auto; display: block;">
    <p style="margin-top: 15px; font-size: 14px; color: #667eea;">Buscando información...</p>
  </div>
`;

    try {
        const response = await fetch(API_URL + country);
        const data = await response.json();

        if (!response.ok || data.status == 404) {
            outputDiv.innerHTML = "❌ País no encontrado. Intenta con otro nombre.";
            return;
        }

        const pais = data[0];
        const nombre = pais.name.common;
        const capital = pais.capital?.[0] || "No disponible";
        const poblacion = pais.population.toLocaleString();
        const region = pais.region;
        const bandera = pais.flags.svg;
        const idiomas = pais.languages ? Object.values(pais.languages).join(", ") : "No disponible";
        const area = pais.area ? (pais.area.toLocaleString() + " km²") : "No disponible";
        const zona_horaria = pais.timezones?.[0] || "No disponible";

        outputDiv.innerHTML = `
      <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%); padding: 20px; border-radius: 20px; border: 1px solid rgba(102, 126, 234, 0.3);">
        <img src="${bandera}" alt="${nombre}" style="width: 120px; height: 80px; margin: 0 auto 15px; display: block; border-radius: 12px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3); object-fit: cover; transition: transform 0.3s ease;">
        <h2 style="font-size: 28px; font-weight: 800; margin: 15px 0 20px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${nombre}</h2>
        
        <div style="text-align: left; font-size: 14px; line-height: 2; color: #444;">
          <div style="display: flex; align-items: center; margin: 8px 0;"><span style="font-size: 16px; margin-right: 10px;">🏛️</span> <strong>Capital:</strong> <span style="margin-left: 10px;">${capital}</span></div>
          <div style="display: flex; align-items: center; margin: 8px 0;"><span style="font-size: 16px; margin-right: 10px;">🗺️</span> <strong>Región:</strong> <span style="margin-left: 10px;">${region}</span></div>
          <div style="display: flex; align-items: center; margin: 8px 0;"><span style="font-size: 16px; margin-right: 10px;">👥</span> <strong>Población:</strong> <span style="margin-left: 10px;">${poblacion}</span></div>
          <div style="display: flex; align-items: center; margin: 8px 0;"><span style="font-size: 16px; margin-right: 10px;">📏</span> <strong>Área:</strong> <span style="margin-left: 10px;">${area}</span></div>
          <div style="display: flex; align-items: center; margin: 8px 0;"><span style="font-size: 16px; margin-right: 10px;">🗣️</span> <strong>Idiomas:</strong> <span style="margin-left: 10px;">${idiomas}</span></div>
          <div style="display: flex; align-items: center; margin: 8px 0;"><span style="font-size: 16px; margin-right: 10px;">⏰</span> <strong>Zona Horaria:</strong> <span style="margin-left: 10px;">${zona_horaria}</span></div>
        </div>
      </div>
    `;
    } catch (error) {
        outputDiv.innerHTML = "⚠️ Error al conectarse con la API.";
        console.error(error);
    }
});
