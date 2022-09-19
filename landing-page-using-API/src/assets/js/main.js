// Lo primero que hacemos en encontrar la url API
const API = "https://youtube-v31.p.rapidapi.com/search?channelId=UCK1iLWxdHsrZbDVwQTYDrlw&part=snippet%2Cid&order=date&maxResults=100";

const videosContent = document.querySelector("#videos-content");

// Luego creamos una función que nos permita hacer la petición a la API
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const datas = await response.json();
    return datas;
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '21738e53f2msh96904c07d3d4c76p1d8614jsn36bc8ff2c527',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

// Luego creamos una función que nos permita pintar los datos en el HTML
// Aquí lo que estamos haciendo es IIFE: Expresión de función ejecutada inmediatamente
// Las expresiones de función ejecutadas inmediatamente (IIFE por su sigla en inglés) son funciones que se ejecutan tan pronto como se definen.
// Estructura básica de una IIFE
/*
    * Ejemplo 1:
    (function () {
        ... statements
    })  ();

    * Ejemplo 2:
    var result = (function () {
        var name = "Barry";
        return name;
    })();
    * Immediately creates the output:
    * result; // "Barry"
*/
// Es un patrón de diseño también conocido cómo función autoejecutable (Self-Executing Anonymous Function (en-US) ) y se compone por dos partes. 
// *1) La primera es la función anónima con alcance léxico encerrado por el Operador de Agrupación (). Esto impide accesar variables fuera del IIFE, así cómo contaminar el alcance (scope) global.
// *2) La segunda parte crea la expresión de función cuya ejecución es inmediata (), siendo interpretado directamente en el engine de JavaScript.
(async () => {
    try {
        // Nos traemos los datos de la API
        const videos = await fetchData(API);

        // Creamos un template para pintar los datos
        let view = `
            ${videos.items.map((video) => `
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-700 main__title">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            </a>
            `).slice(0, 8).join('')}
        `;

        // Pintamos los datos en el HTML
        videosContent.innerHTML = view;
    }
    catch (error) {
        console.error(error);
    }
})();