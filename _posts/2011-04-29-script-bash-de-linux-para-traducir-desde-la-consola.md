---
title: Script Bash de Linux para Traducir desde la consola
author: mgonto
layout: post
permalink: /2011/04/29/script-bash-de-linux-para-traducir-desde-la-consola/
dsq_thread_id:
  - 291310692
categories:
  - Bash
  - Linux
  - Ubuntu
tags:
  - api
  - bash
  - detect
  - Google
  - json
  - rest
  - script
  - sed
  - traducir
  - translator
  - Ubuntu
---
El siguiente Script de bash esta basado en uno hecho por ksaver. Yo agregue el hecho de la auto-deteccion del lenguaje en el cual se escribe y la posibilidad de traducir mas de una palabra.  
El script recibe por parametro primero las 2 letras que identifican el idioma al cual queremos traducir y luego todas las palabras que queremos traducir.  
Considerando que le ponemos al script de nombre gtranslate (ese le puse yo), se lo podria llamar con *gtranslate en hola mundo*

Este script usa las APIs REST de Google tanto de traduccion de un idioma a otro, como la de deteccion de idiomas. Con la primera detectamos el texto que queremos traducir y luego llamamos con el idioma origen y destino al servicio de traduccion.

Usamos CURL para pegarle a los servicios y sed + cut para obtener del JSon devuelto el campo que queremos.

<pre lang="bash">#!/usr/bin/env bash
progname=$(basename $0)

if [ -z "$2" ]
then
echo -e "Usage:   $progname idiomaDestino  'palabras a traducir...'"
echo -e "Example: $progname en 'Hola como!'\n"
exit
fi

TO="$1"
shift 1

# Google Translate Ajax API Url
TRANSURL='http://ajax.googleapis.com/ajax/services/language/translate?v=1.0'

# Parse string to translate, change ' ' to '+'
# STRING: String to translate.
STRING="$@"
PSTRING=$(echo "$STRING" |tr ' ' '+')
DETECT='http://ajax.googleapis.com/ajax/services/language/detect?v=1.0'
RESPONSE_DETECT=$(/usr/bin/env curl -s -A Mozilla $DETECT'&q='$PSTRING)
FROM=$(echo "$RESPONSE_DETECT" | cut -d ':' -f 3 |cut -d ',' -f 1 | sed -s "s/^\([\"']\)\(.*\)\1\$/\2/g")

LANGPAIR="$FROM|$TO"
# Get translation
RESPONSE=$(/usr/bin/env curl -s -A Mozilla \
$TRANSURL'&langpair='$LANGPAIR'&q='$PSTRING)

echo -n "$progname&gt; "
# Parse and clean response, to show only translation.
echo "$RESPONSE" |cut -d ':' -f 3 |cut -d '}' -f 1
</pre>