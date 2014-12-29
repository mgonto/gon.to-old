---
title: Script para elegir, descomprimir, hacer acceso directo y borrar los rars de tus peliculas bajadas
author: mgonto
layout: post
permalink: /2011/05/10/script-para-elegir-descomprimir-hacer-acceso-directo-y-borrar-los-rars-de-tus-peliculas-bajadas/
dsq_thread_id:
  - 299819268
categories:
  - Bash
  - Linux
  - Ubuntu
  - Uncategorized
tags:
  - acortar
  - api
  - bash
  - Code
  - ifs
  - Linux
  - Natty
  - pelicula
  - script
  - sed
  - serie
  - torrent
  - Ubuntu
  - video
---
A continuacion publicare un nuevo script. Este script lo hice para cuando bajo peliculas o series.  
Basicamente lo que hace es mostrarme todo el contenido de la carpeta de bajado con un numero al lado de cada nombre. Luego elijo los numeros de series o peliculas a ver separados por coma y el programa se encargara de descomprimir los rars o zip si hay, hacer un acceso directo en la carpeta seleccionada solo de la pelicula, borrando antes los samples en caso de haber uno.  
Antes, este script usaba periscope para buscar subtitulos en internet. El problema de este programa es que busca en subtitulos.es y no en subdivx.com asi que por el momento lo saque.  
A continuacion añado 2 scripts, uno para listar las peliculas para ver y otro para listar las peliculas a borrar las que fueron ya vistas.

Primero el de listar las peliculas a ver:

````bash
#!/bin/bash
TORRENT_DIR='/home/gonto/downloads/torrents';
VIDEOS_DIR="/home/gonto/Desktop/videos";
pushd .
ls -tr  $TORRENT_DIR | columns -c 1 | awk 'BEGIN {i=0;} {i++; print i,$0}';
echo Que numeros elegis? Separados por coma;
read nums;
#Separando los numeros hechos con doma
OLD_IFS="$IFS"
IFS=","
numsArr=( $nums )

#Itero por cada numero
for num in ${numsArr[@]}
do
PELI=$(ls -tr $TORRENT_DIR | columns -c 1 | sed -n $(echo ${num}p));
if [ -n "$PELI" ]
then
PELI_PATH="$TORRENT_DIR/$PELI"
PELIS_A_MODIFICAR="$PELIS_A_MODIFICAR$PELI_PATH,"
fi
done
pelis=( $PELIS_A_MODIFICAR )
for PELI_PATH in ${pelis[@]}
do
if [ -f "$PELI_PATH" ]
then
    ln -fs "$PELI_PATH" $VIDEOS_DIR
else
    cd "$PELI_PATH"
    find "$PELI_PATH" -name "*rar" | xargs -I "{}" rar e {}
    find "$PELI_PATH" -name "*.[rR]??" | xargs -I "{}" rm {}
    find "$PELI_PATH" -name "*[sS][aA][mM][pP][lL][eE]*" | xargs -I "{}" rm {}
    find "$PELI_PATH" -name "*.[aA][vV][iI]" | xargs -I "{}" ln -s {} $VIDEOS_DIR
    find "$PELI_PATH" -name "*.[mM][kK][vV]" | xargs -I "{}" ln -s {} $VIDEOS_DIR
    popd
fi
done
IFS="$OLD_IFS"
````

Y ahora el encargado de borrarlas

````bash
#!/bin/bash
TORRENT_DIR='/home/gonto/downloads/torrents';
VIDEOS_DIR="/home/gonto/Desktop/videos";
ls -tr $TORRENT_DIR | columns -c 1 | awk 'BEGIN {i=0;} {i++; print i,$0}';
echo Que numeros elegis? Separados por coma;
read nums;
#Separando los numeros hechos con doma
OLD_IFS="$IFS"
IFS=","
numsArr=( $nums )
PELIS_A_BORRAR=""
#Itero por cada numero
for num in ${numsArr[@]}
do
PELI=$(ls -tr $TORRENT_DIR | columns -c 1 | sed -n $(echo ${num}p));
if [ -n "$PELI" ]; then
PELI_PATH="$TORRENT_DIR/$PELI"
PELIS_A_BORRAR="$PELIS_A_BORRAR$PELI_PATH,"
fi
done
pelis=( $PELIS_A_BORRAR )
for peli in ${pelis[@]}
do
rm -rf $peli
done
IFS="$OLD_IFS"
````

Obviamente para ambos scripts tendran que cambiar el directorio de Torrents y el de videos para los que ustedes queiran listar y hacer accesos directos respectivamente.

Cualquier critica o mejora a los scripts sera bien tomada :). Una persona me sugirio que le agregue al acortador de URLs copiado al clipboard y lo hice <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

Slds!
