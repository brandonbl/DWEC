const playlist = [
    {
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        duracion: 200
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        duracion: 234
    },
    {
        titulo: "As It Was",
        artista: "Harry Styles",
        duracion: 167
    },
    {
        titulo: "Levitating",
        artista: "Dua Lipa",
        duracion: 203
    },
    {
        titulo: "One Dance",
        artista: "Drake",
        duracion: 173
    },
    {
        titulo: "Believer",
        artista: "Imagine Dragons",
        duracion: 204
    },
    {
        titulo: "Perfect",
        artista: "Ed Sheeran",
        duracion: 263
    },
    {
        titulo: "Havana",
        artista: "Camila Cabello",
        duracion: 217
    },
    {
        titulo: "Stay",
        artista: "The Kid LAROI & Justin Bieber",
        duracion: 141
    },
    {
        titulo: "Uptown Funk",
        artista: "Mark Ronson ft. Bruno Mars",
        duracion: 270
    }
];

const cancionesLargas= playlist.filter((cancion) => cancion.duracion > 180)
const mensajes = cancionesLargas.map((cancion) => `La cancion ${cancion.titulo}, de ${cancion.artista}, dura ${cancion.duracion} segundos.`)

console.log(mensajes)