---
title: Problemas de Eclipse lento con Android y obtener los Sources
author: mgonto
layout: post
permalink: /2011/04/28/problemas-de-eclipse-lento-con-android-y-obtener-los-sources/
dsq_thread_id:
  - 290716343
categories:
  - Android
  - Eclipse
  - Java
tags:
  - Android
  - Code
  - Eclipse
  - Froyo
  - Gingerhead
  - Google
  - java
  - SDK
  - Source
  - Tech
---
Buenas!

Hace poco empece a programar con Android. La verdad que pinta muy interesante. Les recomiendo leer &#8220;Android In Action&#8221; si les interesa.

Ni bien empece me tope con 2 problemas:

  * Eclipse cuando queremos auto completar algo se traba y anda muy lento
  * No tenemos el codigo fuente de Android para saber exactamente que esta haciendo para poder arreglar problemas mas tranquilo

Despues de buscar un rato largo en internet encontre la respuesta a ambos problemas que casualmente es la misma.

Al bajar el codigo fuente de android y ponerlo para que lo tome el Eclipse, este ultimo deja de colgarse.

Android esta alojado en un servidor git. Este servidor soporta decirle que queremos bajar el repositorio en formato tar.gz (Zippeado). Para hacer esto le pegamos a la siguiente url:

<http://android.git.kernel.org/?p=platform/frameworks/base.git;a=snapshot;h=><Version de la API>;sf=tgz

Version de la Api debe ser alguno de los siguientes o alguno mas nuevo:

  * *gingerbread* – Android 2.3
  * *froyo* – Android 2.2
  * *eclair* – Android 2.1
  * *donut* – Android 1.6

Un ejemplo de URL entonces seria:

<http://android.git.kernel.org/?p=platform/frameworks/base.git;a=snapshot;h=froyo;sf=tgz>

Una vez bajado este archivo comprimido con el codigo fuente, lo que debemos hacer es descomprimirlo y copiar todo el contenido a:

***<android-SDK>\platforms\android-<API version>\sources***

Iniciamos ahora eclpse con algun proyecto de Android que use la version para la cual bajamos los Sources y vamos a tener todos los problemas solucionados. Se pueden bajar los sources para todas las versiones de Android que tengamos en la PC.