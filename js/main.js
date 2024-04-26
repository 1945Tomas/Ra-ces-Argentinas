// SCROLL 
window.addEventListener('scroll', ()=>{
    let encabezado = document.querySelector('#header');
    encabezado.classList.toggle('abajo',window.scrollY>0);
})




document.addEventListener('DOMContentLoaded', () => {
    const contactoLink = document.querySelector('a[href="#contacto"]');

    // Agrega un evento de clic al enlace
    contactoLink.addEventListener('click', (e) => {
        // Previene el comportamiento por defecto del enlace
        e.preventDefault();

        // Obtiene la sección de contacto usando su ID
        const contactoSection = document.querySelector('#contacto');

        // Desplaza suavemente la vista hacia la sección de contacto
        contactoSection.scrollIntoView({
            behavior: 'smooth', // Hace que el desplazamiento sea suave
            block: 'start' // Alinea la vista con el inicio de la sección
        });
    });
});



//LLamo elementos del HTML
const divTarjetas = document.querySelector ('#vinos');
const divgaleria =  document.querySelector ('#galeria');
//Llamo a la base de datos 
let vinos = [];


urlVinos = "http://127.0.0.1:5500/js/vinos.json"
const fetchVinos = async()=>{
    try{
        const vinitosjson = await fetch (urlVinos);
        const data = await vinitosjson.json();
        vinos = data 
        console.table(vinos)
        cargarVinos(vinos)
        galeria(vinos)

    }catch(error){
        console.log(error)
    }
}
fetchVinos()


function cargarVinos (vinos){
    divTarjetas.innerHTML = "";

    vinos.forEach(vinitos => {
        let div = document.createElement('div');
        div.classList.add("tarjeta")

        div.innerHTML = `
        <div class="tarjeta">
            <img  class="imgCard" src="${vinitos.imagen}" alt="">
            <div class="centroTarjeta">
            <h2 class="h2Card" >${vinitos.nombre}</h2>
            <small class="smallCard" >${vinitos.bodega}</small>
            <p  class="pCard" >${vinitos.descripcion}</p>
        </div>
        </div>
        `
        divTarjetas.append(div)
    });
};

function galeria (vinos){
    divgaleria.innerHTML="";

    vinos.forEach(fotos =>{
        let div = document.createElement("div");
        div.classList.add("fotosGaleria")

        div.innerHTML =` <img  class="fotosGaleria" src="${fotos.imagen}" alt="">`

        divgaleria.append(div)
    })
};
    




