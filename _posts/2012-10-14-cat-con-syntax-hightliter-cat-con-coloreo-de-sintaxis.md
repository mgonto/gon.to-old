---
title: Cat con Syntax Highlight (Colorized Cat) (Cat con coloreo de sintaxis)
author: mgonto
layout: post
permalink: /2012/10/14/cat-con-syntax-hightliter-cat-con-coloreo-de-sintaxis/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
dsq_thread_id:
  - 2370812993
categories:
  - Bash
tags:
  - bash
  - cat
  - Code
  - mac
  - pigmentize
  - python
---
Buenas,

Como va!?

Hace mucho no escribo nada por aca. Hoy vengo a contarles algo que esta genial para todo desarrollador. Cuantas veces les paso que quieren ver un archivo en la consola pero con los colores &#8220;lindos&#8221; para ese lenguaje de programacion? A mi miles de veces!

Los que les vengo a mostrar aca es un programita escrito en python que permite justamente hacer esto.

Hay un programa llamado &#8220;Pygments&#8221; que justamente le da pigmento o color a nuestro output.

Para instalarlo, si estamos en Ubuntu o similar se puede instalar directamente con *sudo apt-get install pygments*

Si estan en Mac, les recomiendo usar brew. Primero corren: *&#8220;brew install python &#8211;framework&#8221;* para instalar Python si aun no lo tienen y luego *&#8220;sudo easy_install Pygments&#8221;*

Una vez que ya lo tienen instalado, yo cree un alias en mi .bashrc para poder luego usarlo desde consola. Dicho alias es el siguiente: *alias catc=&#8221;pygmentize -O style=monokai -f console256 -g&#8221;*

Luego corran catc y listo!.

Aqui la transformacion

Antes:

<p style="text-align: center;">
  <a href="http://gon.to/wp-content/uploads/2012/10/Screen-Shot-2012-10-14-at-12.25.59-AM1.png" rel="lightbox" title="Cat con Syntax Highlight (Colorized Cat) (Cat con coloreo de sintaxis)" rel="lightbox"><img class="aligncenter  wp-image-143" title="cat-antes-pequeña" src="http://gon.to/wp-content/uploads/2012/10/Screen-Shot-2012-10-14-at-12.25.59-AM1.png" alt="" width="473" height="461" /></a>
</p>

Despues:

<p style="text-align: center;">
  <a href="http://gon.to/wp-content/uploads/2012/10/Screen-Shot-2012-10-14-at-12.26.14-AM1.png" rel="lightbox" title="Cat con Syntax Highlight (Colorized Cat) (Cat con coloreo de sintaxis)" rel="lightbox"><img class="aligncenter  wp-image-144" title="cat-despues-pequeña" src="http://gon.to/wp-content/uploads/2012/10/Screen-Shot-2012-10-14-at-12.26.14-AM1.png" alt="" width="419" height="461" /></a>
</p>

&nbsp;

No es una gran diferencia? Para mi si!