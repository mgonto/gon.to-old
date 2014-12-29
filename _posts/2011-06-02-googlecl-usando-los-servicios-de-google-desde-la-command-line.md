---
title: 'GoogleCL: Usando los servicios de Google desde la command line'
author: mgonto
layout: post
permalink: /2011/06/02/googlecl-usando-los-servicios-de-google-desde-la-command-line/
dsq_thread_id:
  - 320059038
categories:
  - Google
  - Ubuntu
tags:
  - bash
  - blogger
  - calendar
  - command
  - docs
  - GMail
  - Google
  - googlecl
  - line
  - Linux
  - Natty
  - picassa
  - python
  - script
  - Ubuntu
---
Hace mucho que no escribia nada porque estuve muy ocupado la verdad con facu y trabajo.

Hoy vengo a contarles de GoogleCL una herramienta para la linea de comandos de Linux y Mac.  
Existe hace un tiempo ya, pero la verdad que nunca le habia encontrado mucha utilidad pero desde hoy si <img src="http://gon.to/wp-includes/images/smilies/icon_razz.gif" alt=":P" class="wp-smiley" /> 

Sirve para utilizar todos los servicios de google desde la linea de comandos.

Por ejemplo queremos saber que tenemos en nuestro calendario hoy? google calendar today  
Queremos agregar una nueva tarea en el calendario? google calendar add &#8220;Parcial Inteligencia Artificial next wednesday at 7 pm&#8221;. Y solo reconoce el dia y la fecha!  
queres subir un nuevo doc a GDocs? google docs upload PATH/TO/FILE  
Queres subir fotos a picassa? picasa post &#8211;title &#8220;My Cat Photos&#8221; photos/cats/*&#8221;

Especificamente funciona con los siguientes servicios:  
&#8216;picasa&#8217;, &#8216;blogger&#8217;, &#8216;youtube&#8217;, &#8216;docs&#8217;, &#8216;contacts&#8217;, &#8216;calendar&#8217;, &#8216;finance&#8217;

Y dandole google help [service] nos tira ayuda sobre el servicio y las cosas que le podemos pedir. Por ejemplo google help calendar.

Para instalarlo simplemente hay que hacer:  
sudo apt-get install googlecl

Como tip extra, utilizando googlecl hay un launcher para Unity que vos le arrastras un archivo y lo sube solo a GDoc y desde ahi podemos tambien crear documentos.

Para bajarlo debemos correr lo siguiente:

<pre lang="bash">sudo apt-get install zenity
cd Downloads/
wget http://webupd8.googlecode.com/files/gdocs-unity.tar.gz
tar -xvf gdocs-unity.tar.gz
mv gdocs-unity/gdocs.desktop ~/.local/share/applications
mv gdocs-unity/docs-128.png ~/.icons/
chmod +x ~/Downloads/gdocs-unity/docsHelper
sed -i "s/Exec=\/path\/to\/docsHelper/Exec\=\/home\/$USER\/Downloads\/gdocs-unity\/docsHelper/" ~/.local/share/applications/gdocs.desktop
rm gdocs-unity.tar.gz
</pre>

Antes de poder usarlo deberan dar acceso a GDocs. Para eso desde la consola le damos google docs upload y ahi nos va a pedir acceso a nuestra google account la primera vez!

Espero que les sirva!