---
title: Libreria Javascript para Graficos y dibujos a partir de composicion
author: mgonto
layout: post
permalink: /2011/05/06/libreria-javascript-para-graficos-y-dibujos-a-partir-de-composicion/
dsq_thread_id:
  - 296581397
categories:
  - Javascript
  - Web 2.0
tags:
  - api
  - chart
  - chrome
  - explorer
  - firefox
  - Google
  - html
  - ie
  - internet
  - javascript
  - plugin
  - raphael
  - script
  - scripting
  - svc
  - vml
---
Buenas,

Estuve en el trabajo viendo estos dias una libreria que esta muy buena llamada Raphael.  
Esta libreria se basa como dice el titulo en la composicion. Uno lo que va haciendo es dibujar poligonos, lineas, etc. y a partir de esto va armando distintas formas. Yo lo estoy usando para hacer graficos bastantes customizables y muy lindos la verdad.  
Las ventajas de esta libreria sobre otras como la API Chart de Google, es que la API chart de google depende de internet para funcionar. Esta no. Es muy facil extender la libreria y agregarle plugins. Simplemente haremos

*Rapahael.fn.miFuncion = function() {};*

Y con esto ya estaremos creando un plugin :D.

Este plugin se basa en SVG para hacer los dibujos tanto en Firefox como Chrome. La ventaja que tiene este framework frente a otros similares de dibujos via composicion es que este tiene soporte para IE. IE no soporta SVG para funcionar. Este plugin detecta si es Internet Explorer y hace los dibujos con VML (El SVG de Microsoft).

Un ejemplo muy basico de como usarlo seria

<pre>var canvas = Raphael(holder, 50, 50);

var circle = paper.circle(50, 40, 10);
</pre>

Esto lo que hace es crea primero un &#8220;canvas&#8221; de 50&#215;50 en aquel elemento del dom HTML cuyo id sea holder. Dentro de este bloque de 50&#215;50 es donde vamos a trabajar.  
Lo que hace luego es dibujar un circulo con x=50 y=40 y radio 10.

Corremos este HTML (Luego de obviamente incorporar la referencia al script raphael.js) y veremos como en el div con id holder aparecera este circulo.

Permite tambien cosas muchos mas complicadas. Por favor vean la pagina y refieranse a la documentacion para mas informacion <img src="http://gon.to/wp-includes/images/smilies/icon_biggrin.gif" alt=":D" class="wp-smiley" /> 

http://raphaeljs.com/

Slds