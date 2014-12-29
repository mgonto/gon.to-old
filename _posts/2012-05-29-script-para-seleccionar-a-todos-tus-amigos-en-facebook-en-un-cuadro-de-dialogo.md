---
title: Script para seleccionar a todos tus amigos en Facebook en un cuadro de dialogo
author: mgonto
layout: post
permalink: /2012/05/29/script-para-seleccionar-a-todos-tus-amigos-en-facebook-en-un-cuadro-de-dialogo/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
dsq_thread_id:
  - 2366618336
categories:
  - Javascript
tags:
  - facebook
  - friends
  - invite
  - javascript
  - script
---
Buenas!

Hoy vengo con un tip bastante facil.

**Suponganse que tienen un evento creado en Facebook o quieren invitar a todos sus amigos de Facebook a algun lugar**. Ahora, suponganse que tienen muchos amigos. Seleccionar uno por uno es una gran paja. **Facebook ademas no nos da un boton de seleccionar todos.**

Entonces, fijandome un poco, encontre una forma de seleccionar a todos tus amigos via un Script de Javascript.

Entonces, suponganse que tienen la ventana de invitar amigos como la siguiente abierta:

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2012/05/invite.png" rel="lightbox" title="Script para seleccionar a todos tus amigos en Facebook en un cuadro de dialogo"><img class="aligncenter size-medium wp-image-133" title="invite" src="http://gon.to/wp-content/uploads/2012/05/invite-300x168.png" alt="" width="300" height="168" /></a>

&nbsp;

Una vez abierta esta ventana, scrollearemos hasta el final (para que se carguen todos nuestros amigos). Una vez realizado esto, lo que haremos sera abrir la consola (Presionando F12). Esto abrira una ventana abajo como se ve en la siguiente imagen. En esa ventana tocamos en el Tab console y pegamos el codigo que se encuentra debajo de la imagen

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2012/05/all-selected.png" rel="lightbox" title="Script para seleccionar a todos tus amigos en Facebook en un cuadro de dialogo"><img class="aligncenter size-medium wp-image-132" title="all selected" src="http://gon.to/wp-content/uploads/2012/05/all-selected-300x168.png" alt="" width="300" height="168" /></a>

&nbsp;

````js
>var x=document.getElementsByTagName("input");
for(var i=0;i&lt;x.length;i++) {
  if (x[i].type == 'checkbox') {
    x[i].click();
  }
}; 
alert('Todos tus amigos seleccionados');
````

Una vez realizado esto, veremos un dialogo diciendonos que todos los amigos fueron seleccionados, lo cual sera cierto :D:D

Happy inviting!
