# Servidor para consumir API de Youtube para hacer seguimiento a los videos, lista de videos, estadisticas basicas y informacion general del canal ⚡

## Configuracion del archivo de entorno ✔

Copiar el archivo **env.example.js** y la copia debe tener el nombre del archivo a  **env.js**, ten presente cambiar el valor de la key **apiKeyYoutube** del archivo **env.js** con su key de aplicacion del Google console.


## Documentación de endpoints ✔

|  URL |   Metodo| Descripción|Parametros|
| ------------ | ------------ | ------------ | ------------ |
|   /api/search/videos| GET   | Regresa la informacion de los videos de un canal de Youtube especifico|**channelId**: Identificador del canal de Youtube|
|   /api/search/channel| GET   | Regresa la informacion general del canal de Youtube especifico|**channelId**: Identificador del canal de Youtube|
|   /api/search/playlist| GET   | Regresa la informacion de las listas de videos de un canal de Youtube especifico|**channelId**: Identificador del canal de Youtube|
|  /api/list/statistics| GET   | Regresa la informacion de las estadisticas como cantidad de vistas, me gusta, no me gusta, comentarios y favoritos de un video de Youtube especifico|**videoId**: Identificador del video de Youtube|
|  /api/list/snippet| GET   | Regresa la informacion de un video de Youtube especifico|**videoId**: Identificador del video de Youtube|
