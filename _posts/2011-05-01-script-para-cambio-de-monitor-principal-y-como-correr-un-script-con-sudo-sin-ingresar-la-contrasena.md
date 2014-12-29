---
title: Script para cambio de monitor principal y como correr un script con sudo sin ingresar la contraseña
author: mgonto
layout: post
permalink: /2011/05/01/script-para-cambio-de-monitor-principal-y-como-correr-un-script-con-sudo-sin-ingresar-la-contrasena/
dsq_thread_id:
  - 292522845
categories:
  - Bash
  - Linux
  - Natty
  - Ubuntu
tags:
  - bash
  - Code
  - contraseña
  - monitor
  - Natty
  - password
  - script
  - su
  - sudo
  - Ubuntu
  - Unity
  - video
  - xrandr
---
Hoy volvemos con otro script de Linux.  
En este caso es un script para cambiar el monitor principal. Yo muchas veces me pasa que tengo prendida la PC y quiero ver una serie en la tele. Conecto la tele a la PC y siempre quiero primero apagar la PC y prender la tele para ver el programa. Ni bien termina el programa quiero hacer exactamente lo contrario.

Para esto, como tener que entrar a la configuracion de video, seleccionar que dispositivo prender y cual apagarlo y realizar dicha accion, me resultaba muy tedioso decidi crear un script.

En mi caso le puse el nombre swmon (SWitch MONitor). Este script tiene 2 usos principales. En el primero, uno simplemente escribe swmon y le apareceran todos los monitores disponibles con un numero al lado cada uno. Seleccionamos que monitor queremos que se vea y se encargara de mostrar ese y apagar el otro. Un ejemplo de este menu seria:

<figure id="attachment_47" class="thumbnail wp-caption aligncenter" style="width: 300px"><a href="http://gon.to/wp-content/uploads/2011/05/screenshot1.png" rel="lightbox" title="Script para cambio de monitor principal y como correr un script con sudo sin ingresar la contraseña"><img class="size-medium wp-image-47" title="SWmon" src="http://gon.to/wp-content/uploads/2011/05/screenshot1-300x125.png" alt="" width="300" height="125" /></a><figcaption class="caption wp-caption-text">SWmon</figcaption></figure>

El tema es que esto requeria 2 pasos y yo muchas veces queria correrlo con Synapse sin tener que abrir la consola (OffTopic: Synapse es un EXCELENTE lanzador de aplicaciones. Muy parecido a Gnome-Do pero el mismo se actualiza y utiliza Zeitgeist para realizar sus cuniones. En otro post explicare como agregarlo via PPA). Para esto, hice que este script pueda recibir un parametro con el numero de monitor a poner como principal. Entonces, siguiendo mi ejemplo, si yo queria encender la television simplemente ponia *swmon 2* ya que con este comando elegia HDMI que es mi output para la tele.

El tema es que este script en cuestion por usar cosas de la placa de video necesitaba correrse como sudo. Como yo no queria tener que poner la password del super user cada vez que queria correrlo hice el siguiente procedimiento:

Primero entramos al archivo visudo donde se configura cuando pedir la password cuando se quiere correr algo con el comando sudo. Para esto ingresaremos:

*sudo visudo*

Luego de ingresado nos aparecera la pantalla de edicion de vim donde agregaremos una linea:

*gonto ALL= NOPASSWD: /ruta/del/archivo*

Esto lo que dice es, para TODOS los usuarios que pertenezcan al grupo gonto (En este caso uno solo), no piads pasword para el archivo puesto a continuacion.  
En mi caso, esta linea quedo:

*  
gonto ALL= NOPASSWD: /home/gonto/bin/monch*

Ustedes se preguntaran porque ahi dice monch si yo dije que el script se llamaba swmon?

Eso es porque yo no queria tener que poner sudo cada vez que queria correr este script. Entonces cree un script llamado swmon que lo que hace es:

````bash
#!/bin/bash
sudo ~/bin/monch $@
````

Este script simplemente llama al script llamado monch con sudo y le pasa todos los parametros que recibo. Es una especie de proxy o decorator que simplemente llama al otro script agregandole la palabra sudo. Esto hara que se corra el script monch como super user SIN QUE NOS PIDA PASSWORD.

Por ultimo, el script que tiene la papa es monch que es el siguiente:

````bash
#!/bin/bash
num=1
if [ -z "$1" ]
then
    xrandr --prop | grep "[^dis]connected" | cut --delimiter=" " -f1 | columns -c 1 | awk 'BEGIN {i=0;} {i++; print i,$0}'
    echo "Pone el primario:"
 
    read num
else
    num="$1"
fi
ELEGIDO=$(xrandr --prop | grep "[^dis]connected" | cut --delimiter=" " -f1 | columns -c 1 | sed -n $(echo ${num}p))
NUMDOS=0
if [ "$num" -eq "1" ]
then
    NUMDOS=2
else
    NUMDOS=1
fi
NOELEGIDO=$(xrandr --prop | grep "[^dis]connected" | cut --delimiter=" " -f1 | columns -c 1 | sed -n $(echo ${NUMDOS}p))
xrandr --output $NOELEGIDO --off  
xrandr --output $ELEGIDO --auto
</pre>

Fijense de tener el programa xrandr que este script usa. En caso de no tenerlo, bajenselo.

Eso es todo!! Facil y util <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

Saludos!
