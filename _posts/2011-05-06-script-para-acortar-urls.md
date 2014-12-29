---
title: Script para acortar URLs
author: mgonto
layout: post
permalink: /2011/05/06/script-para-acortar-urls/
dsq_thread_id:
  - 297387182
categories:
  - Bash
  - Linux
  - Ubuntu
tags:
  - acortar
  - bash
  - bit.ly
  - bitly
  - Code
  - curl
  - python
  - rest
  - script
  - sed
  - shortening
  - Ubuntu
---
Seguimos con la onda de publicar scripts. Otro script que uso mucho y que es totalmente de mi autoria es uno para acortar las URLs. Muchas veces me pasa de querer postear alguna URL acortada en Facebook o pasarsela a alguien o una variedad de cosas. La verdad es que tener que entrar a la pagina web para acortarlas copiarla es mucho laburo y de la consola es mucho mas facil.  
Este script particularmente usa bit.ly que en mi opinion es el mejor, el que tiene mas stats y todo. Lo que van a tener que reemplzar en el script es su nombre de usuario y su API Key de bit.ly. Luego de eso simplemente lo llaman con  
bitly http://www.google.com/ y les va a aparecer la URL acortada. Mas simple imposible.

Los campos a reemplazar son TU\_USUARIO y TU\_KEY.  
Basicamente lo que hace es primero utilizar una libreria de python para encodear la URL ya que la API REST de bit.ly usa URL encodeadas. Luego con Curl le pegamos a bit.ly y despues mediante sed y awk obtenemos la url :).  
Aqui les va el script <img src="http://gon.to/wp-includes/images/smilies/icon_biggrin.gif" alt=":D" class="wp-smiley" /> y happy shortening <img src="http://gon.to/wp-includes/images/smilies/icon_biggrin.gif" alt=":D" class="wp-smiley" /> 

<pre lang="bash">#!/bin/bash
progname=$(basename $0)
if [ -z "$1" ]
then
        echo -e "Usage:   $progname url"
        exit
fi
URL=$1

BITLYURL='http://api.bit.ly/v3/shorten?login=TU_USUARIO&#038;apiKey=TU_KEY&#038;format=json'
ENCODEDURL=$(python -c "import urllib; print urllib.quote('''$URL''')")
RESPONSE=$(/usr/bin/env curl -s -A Mozilla $BITLYURL'&#038;longUrl='$ENCODEDURL)
echo $RESPONSE | sed -e 's/[{}]/''/g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i&lt;=n; i++) print a[i]}' | sed -n 4p | cut -c 9- | sed 's/"//g' | sed 's/\\//g'
</pre>