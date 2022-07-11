//código obtenido desde la página de RapidAPI usando la API de youtube
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9k0tTsh_qStx0HPuPftSsg&part=snippet%2Cid&order=date&maxResults=5';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f45e27a2d4msh2f56c95eaa925d8p1d1933jsn9a5f06572519',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Como vamos a usar el asyn/await, borramos el código de fetch estructurado con then y catch. En lugar de ello, usamos la lógica que hicimos en ejemplos anteriores:
// fetch('', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) { //siempre async antes de function
    const response = await fetch(urlApi, options); //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const data = await response.json(); //estructura de los datos transformandolos en json
    return data; //retorna la información de la API que estamos solicitando
}

//Ahora vamos usar un nuevo concepto: una función que se invoca a sí misma; con JavaScript podemos tener funciones anónimas que permitan llamarse automáticamente, la estructura cuenta con la palabra reservada **async **y con funciones arrows:
(async () => {
    //Dentro implementamos la lógica necesaria para hacer el llamado a la API, obtener los elementos y mostrarlos en html
    //Se implementa try y catch
    try{
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `<div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
      `).slice(0, 4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();