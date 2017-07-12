![Sorteo FIFA](http://www.rionegro.com.ar/documents/1/0/650x463/0c49/650d365/none/12350/KOQK/image_content_8184302_20170315114102.jpg)

Dada una lista de jugadores y una lista de equipos, arma los pares (y le mete suspenso).
También sirve para hacer otros sorteos (siempre con suspenso).

# Uso de los sorteos existentes

Primero, con `npm install` te instalás todas las dependencias.

Con `npm start` corrés el sorteo tradicional, asignándole un equipo a cada jugador.
Sólo vas a tener que modificar la lista en `players.js` y `teams.js` y listo.

Con `npm run colchesterBowl` vas a correr el sorteo en modo Colchester bowl, donde
se van eliminando participantes uno a uno hasta que quedan dos.

# Cómo crear un nuevo tipo de sorteo

En `src/raffle` se exporta una funcion `raffle` que crea un nuevo tipo de sorteo.
La API recibe un objeto con tres funciones:

* *shuffler ()*: es la función encargada de hacer el random propiamente dicho.
Devuelve un array con `items` que representa el resultado del sorteo

* *announcer (item, position)* recibe cada uno de los items generados por el
shuffler y devuelve un array con anuncios que debe ser un objeto con la forma
`{ data, interval }` donde:
  * `data` es el segmento de información a anunciar. Por cada "línea" (item) el
raffle va acumulando la data a medida que se va a anunciando. Es decir, si en una línea
tengo un jugador y un equipo y anuncio primero el equipo, cuando anuncie el jugador
el equipo no se pierde sino que se acumula y se pasa todo junto al logger
  * `interval` es cuanto suspenso (en milisegundos) se le quiere poner a ese anuncio.
Notar que el `announcer` recibe la `position` de cada item, esto puede usarse para poner
distinto suspenso (por ejemplo, mayor intervalo hacia el final)

* *logger (data, position)* recibe incrementalmente la data que va anunciando el `announcer`
para un `item` y devuelve un string que la presenta en pantalla. Tener presente que para cada item
el logger es llamado *varias* veces a medida que se va completando la información. Para el mismo item
cada llamado a logger pisa el anterior. La primera vez siempre es llamado con `data = {}` así que es
importante tener placeholders apropiados en cada caso
