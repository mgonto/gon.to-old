---
title: Script para acortar URLs con soporte de Clipboard
author: mgonto
layout: post
permalink: /2011/05/10/script-para-acortar-urls-con-soporte-de-clipboard/
dsq_thread_id:
  - 299814860
categories:
  - Bash
  - Linux
  - Ubuntu
tags:
  - acortar
  - api
  - bash
  - bitly
  - Code
  - Linux
  - Natty
  - shorten
  - Ubuntu
  - url
---
Un amigo me acaba de comentar que estaria bueno agregarle al script que ademas de mostrar por consola el resultado de acortar la url, la misma sea mandada al clipboard ya que eventuamente esto va a ser lo que haremos.

Para esto, instalaremos primero el programa xclip (con apt-get) y luego reemplazaremos el script existente que tenemos para acortar por el siguiente, reemplazando como la otra vez el usuario y la api:

````bash
#!/bin/bash
progname=$(basename $0)
if [ -z "$1" ]
then
        echo -e "Usage:   $progname url"
        exit
fi
URL=$1

BITLYURL='http://api.bit.ly/v3/shorten?login=NOMBRE_USUARIO&#038;apiKey=API_KEY&#038;format=json'
ENCODEDURL=$(python -c "import urllib; print urllib.quote('''$URL''')")
RESPONSE=$(/usr/bin/env curl -s -A Mozilla $BITLYURL'&#038;longUrl='$ENCODEDURL)
TEXT=$(echo $RESPONSE | sed -e 's/[{}]/''/g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i&lt;=n; i++) print a[i]}' | sed -n 4p | cut -c 9- | sed 's/"//g' | sed 's/\\//g')
echo $TEXT
echo $TEXT | xclip -selection c
````
