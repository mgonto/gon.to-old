---
title: Analisis de Frameworks multiplataforma para celulares vs nativo
author: mgonto
layout: post
permalink: /2011/05/04/analisis-de-frameworks-multiplataforma-para-celulares-vs-nativo/
dsq_thread_id:
  - 294733722
categories:
  - Mobile
tags:
  - ADT
  - Android
  - api
  - appcelerator
  - bb
  - Blackberry
  - Eclipse
  - Froyo
  - Gingerhead
  - Google
  - iPhone
  - java
  - native
  - phonegap
  - phonegapp
  - SDK
  - webview
---
Les comento que este finde estuve probando PhoneGap y Titanium  
AppCelerator. Les cuento un poco que es lo que vi.  
En primer lugar y como nota general, a pesar de ser todos &#8220;multiplataforma&#8221;  
uno tiene que conocer la plataforma para las cuales esta escribiendo el  
programa y poner pequeños &#8220;ifs&#8221; para esa plataforma. Es algo similar al  
tema del CSS que si es IE generalmente ponemos un CSS. Para dar un ejemplo,  
Android tiene un lifecycle particular de las aplicaciones. Sin entrar en  
mucho detalle, cuando la app va a dejar de ser &#8220;la principal en pantalla&#8221;  
para dar lugar a otra se llama a un metodo llamado OnPause y cuando vuelve  
se llama al metodo OnResume. Estos metodos estan para que cuando uno por  
ejemplo responde a un menasje de texto que le acaba de llegar y luego  
vuelve a la aplicacion, los valores que se encontraban ya en la app  
ingresados no se pierdan. Entonces, nosotros cuando hacemos una app en  
PhoneGap por ejemplo tenemos que decir que si somos andorid nos queremos  
hookear a los eventos onpause y onresume con el objetivo de poder guardar  
dichos valores, sino se podra usar la aplicacion igualmente pero sera poco  
amigable.  
Ademas de esto, al generalizar perdemos las particularidades de las  
plataformas que pueden ser muy copadas. Por ejemplo, Android tiene lo que  
se llaman Intents genericos. En estos, lo que decimos es &#8220;quiero abrir una  
aplicacion para buscar un contacto&#8221; y luego el usuario sera el que elija  
que aplicacion va a usar para buscar contactos. Puede ser la default o una  
que le guste a el. Luego nuestra aplicacion tendra un callback con el  
contacto seleccionado. Esto si lo hacemos genericamente lo perdemos, ya que  
SOLO podremos usar el &#8220;buscador de contactos&#8221; por defecto de cada sistema  
operativo. No obstante, tanto en AppCelerator como en PhoneGap se pueden  
usar estas cosas particular de cada una de las plataformas. En el caso de  
PhoneGap existe un plugin llamado WebIntent  
(http://borismus.com/android-phonegap-plugins/) que sirve para cubrir esta  
necesidad. En el caso de AppCelerator ya viene con el framework. A su vez,  
Android nos permite tambien hacer que nuestra aplicacion pueda responder a  
algun pedido utilizando intent-filters, cosa que tanto el plugin como  
AppCelerator lo proveen. Esto sirve para decir &#8220;yo se buscar contactos&#8221;.  
Pero si queremos hacer algo de todo esto estamos perdiendo parte de la  
filosifia &#8220;escribo codigo que anda en todos&#8221;.  
Yo creo que la mayor ventaja que tienen estos programas no es el tema de la  
&#8220;generalizacion&#8221; sino, como dice el señor de los anillos, &#8220;A language to  
rule them all&#8221;. O sea, yo creo que la mayor ganancia es saber UN solo  
lenguaje de programacion y poder codear en ese para todos. No obstante,  
tendremos que saber un poco de cada una de las plataformas si queremos  
hacer una app que sea verdaderamente usable y no safaremos de poner esos  
&#8220;if es esta plataforma&#8221;.  
Yendo mas a lo particular, primero que nada estuve viendo PhoneGap. En mi  
opinion es el menos copado de usar y el mas facil. PhoneGap lo que hace es  
permitirte hacer una app utilizando HTML, CSS y JS. PhoneGap lo que hace es  
crearte una apliaccion Web que la corre dentro de tu celular. Esto lo que  
hace es que la aplicacion NO parezca nativa, o sea que rompe con todos los  
estandares de visualizacion o de uso de la plataforma. Esto me parece nada  
copado. Existe tanto en iPhone como en Android (En BB no se, pero debe  
haber tambien) un componente visual llamado WebView que te permite embeber  
en una aplicacion una pagina web. Esto es precisamente lo que usa PhoneGap  
para mostrar la aplicacion y que sea multiplataforma. El unico agregado que  
nos da PhoneGap es una libreria javascript que nos permite &#8220;hablar&#8221; con el  
telefono o hookearnos a eventos del telefono genericamente. Esta es LA  
UNICA diferencia con usar una app web. Podremos buscar contactos, utilizar  
el GPS, hookearnos a eventos del dispositivo, etc. Pero si NO queremos usar  
ninguna de las caracteristicas especificas del celular, como es el caso de  
muchas de las aplicaciones, de nada sirve usar PhoneGap. Para eso es mucho  
mejor usar el control WebView nativo que ademas nos permite mostrar dentro  
del mismo una pagina web de verdad y no solo los HTML, JS y CSS que  
pongamos en PhoneGap. Porque si tenemos ya una app hecha en la web y  
queremos reutilizarla con PhoneGap no podremos ya que el mismo no se banca  
BackEnd. La ventaja que tiene PhoneGap es que NO requiere acceso a  
internet, cosa que un WebView claramente si.  
Otra cosa copada y nativa que perdemos con PhoneGap son las notificaciones,  
las cuales seran solo inapp no usaran la barra de notificaciones (Android)  
o iconos con numeros (iPhone).  
La ventaja que le veo es que es mucho mas facil, mucho mas rapido de hacer  
y que simplemente requiere JS y HTML. Un detalle no menor es que va a ser  
gratis MIENTRAS sea beta. A partir de que deje de serlo (unos meses) va a  
ser paga excepto para proyectos Open Source. Con PhoneGap tenemos la  
posiblidad de hacer la app nosotros usando Eclipse, se puede mavenizar,  
etc. O tenemos la posiblidad de subir HTML + CSS a  
https://build.phonegap.com/ y ellos nos daran el archivo para bajar en el  
formato deseado (Android, iPhone, etc.) Este servicio me parece MUY copado.  
En http://www.phonegap.com/features podemos ver las features que implementa  
especificamente para cada celular.  
En contrapartida, AppCelerator es no solo un jar y un js como PhoneGap sino  
que es todo un entorno de desarrollo. Es OpenSource. Nos permite codear  
todo en JavaScript y el se encargara de pasarlo a codigo nativo. Esta es  
una GRAN ventaja respecto a PhoneGap ya que pasara todo lo que  
desarrollemos a codigo nativo, no es que simplemente lo correra en un  
browser. Por ende, cumplira con todos los estandares visuales de la  
plataforma en cuestion. Fijandonos la API, veremos que tienen componentes  
comunes para todas las plataformas y ciertas &#8220;especializaciones&#8221; por  
plataforma como mencionaba al principio. En el caso de Android, entre las  
especializaciones cuenta con Intents entre otros que es de las cosas mas  
copadas que trae. El tema, es que para poder usarlo requiere una curva de  
aprendizaje bastante grande pero es un solo lenguaje para toda las  
plataformas. Creo que es mas facil que aprender Objective C igualmente.  
Igualmente tiene un par de desventajas. Una de ellas es una falta de un  
WYSIWYG para crear pantallas. Me volvi puto creando elementos desde el  
codigo poniendoles donde tienen que estar, etc. Android (y segun tengo  
entendido iPhone tmb) tienen WYSIWYG muy faciles de usar y muy intuitivos.  
Por otro lado, al ser codigo JS que es convertido a nativo que NO podemos  
ver, AppCelerator NO se puede debuggear por el momento. Solo es posible  
debuggearlo poniendo logs (Me hace acordar a mis debuggeos en C con  
printf). Estas 2 cosas son medio una aptada en los huevo.  
Por ultimo, vi uno llamado rhomobile que no pude llegar a probarlo la  
verdad que es similar a AppCelerator en el sentido de que tambien se  
transforma a codigo nativo. La diferencia es que se programa en Ruby On  
Rails (que esta genial <img src="http://gon.to/wp-includes/images/smilies/icon_razz.gif" alt=":P" class="wp-smiley" /> me encanta dicho sea de paso) y nos da un  
framework MVC para hacer una especie de pagina web, que luego sera  
transformada a aplicacion. Yo me siento mucho mas comodo haciendo apps MVC  
que codeando todo en JS, pero eso es obviamente cuestion de gustos. Una app  
MVC la veo mucho mas cercana al dia a dia.  
Un detalle que me acordaba es que algunas caracteristicas de los celulares  
no pueden ser usadas con estos frameworks. Los mismos estan creados para  
ser usados como una aplicacion de ventanas simplemente. Si nosotros  
queremos tener un servicio corriendo, tener un &#8220;listener&#8221; de eventos para  
mostrar notificaciones, queremos tener un Background program podemos  
olvidarnos con estos FWKs. Sirven para cosas sencillas mas que nada.  
Concluyendo, la verdad creo que sirven para hacer algo rapido, pero no se  
si les veo TANTO potencial para hacer apps &#8220;en serio&#8221;. Y si lo usamos para  
hacer alguna app yo descartaria de entrada PhoneGap, el tema de que es  
simplemente un browser con acceso al telefono no me va para nada. Y vamos a  
tener que saber SI O SI de como funciona la plataforma para la cual tenemos  
interes de publicar nuestro programa, de lo que nos vamos a salvar es de  
saber muchos lenguajes de programacion.

Bueno perdonen por lo largo del mail espero no haberlos aburrido <img src="http://gon.to/wp-includes/images/smilies/icon_biggrin.gif" alt=":D" class="wp-smiley" />