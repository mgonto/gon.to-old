---
title: 'Usando Fragments en Android: Lo nuevo que se viene desde HoneyComb'
author: mgonto
layout: post
permalink: /2011/06/02/usando-fragments-en-android-lo-nuevo-que-se-viene-desde-honeycomb/
dsq_thread_id:
  - 2337466565
aktt_notify_twitter:
  - yes
categories:
  - Android SDK
  - Java
tags:
  - activity
  - Android
  - api
  - atrix
  - back
  - cellphone
  - Code
  - cycle
  - fragment
  - fragments
  - gingerbread
  - Google
  - home
  - honey
  - honeycomb
  - java
  - language
  - life
  - lifecycle
  - programming
  - stack
---
A partir de las nuevas versiones de la SDK de Android se favorece y se va a continuar favoreciendo a los Fragments a partir de la nueva version del SDK donde se mergearan 3.0 (Tablets) y 2.3 (celulares). El objetivo del uso de Fragment es justamente hacer mas facil el desarrollo para apps que funcionen bien en tablets y celulares.

**Vamos a ver un poco que son?**  
Fragments son pedazos de una Activity. Un Fragment fuera de una Activity no existe. Son similares a los paneles y justamente por el hecho de tener un codigo y cierta vista seran altamente reutilizables. Podre tener un Fragment usado en varios lugares donde obtendremos en cada uno la data del Intent y la mostraremos.

**Porque me ayudan a utilizar celulares vs tablets?**  
Porque los Fragments me permiten por ejemplo en caso de que sea una tableta mostrar una Activity con 2 fragments (Por ejemplo una lista de ciertos datos y al lado el detalle del dato seleccionado) y en caso de un celular mostrar 2 Activities diferentes cada una con su propio Fragment (Una pantalla tiene la lista, toco click en una y me abre en otra pantalla el detalle).  
Como seria esto? Veamos un poco la imagen que se encuentra a continuacion:

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2011/06/fragments.png" rel="lightbox" title="Usando Fragments en Android: Lo nuevo que se viene desde HoneyComb"><img src="http://gon.to/wp-content/uploads/2011/06/fragments-300x94.png" alt="" title="fragments" width="300" height="94" class="aligncenter size-medium wp-image-98" /></a>

Esto nos permite sin casi tocar codigo reutilizar distintos paneles para hacer la app linda y usable tanto para celulares como para tablets.

**Genial, me copo la idea! Ahora&#8230;. como lo uso?**  
Bueno para usarlo hay que simplemente heredar de Fragment y despues entender un poco su LifeCycle que es similar al de una Activity.  
Primero se llama al OnAttach que generalmente no lo usaremos.  
Luego se llama al OnCreate del Fragment.  
Luego al OnCreateView del Fragment. Este metodo es BASTANTE importante ya que aqui se definira cual es el layout que el Fragment usara! En este metodo se retorna un objeto View. Se pueden usar como en el caso de los menus &#8220;inflaters&#8221; para no crearlos desde codigo.  
OnActivityCreated se llamara pasandole la Activity por parametro y se llamara luego de que se llama al OnCreate de la Activity. Generalmente mucho del procesamiento se hace en ESTE metodo.  
OnPause y OnResume se utilizan para guardar y obtener estado del Fragment en caso de que la app deje de estar en el Foreground y usandose.

Luego desde el Layout de la Activity que tendra un cierto Fragment se usara:

<pre lang="xml">&lt;fragment android:name="com.example.news.ArticleListFragment"
            android:id="@+id/list"
            android:layout_weight="1"
            android:layout_width="0dp"
            android:layout_height="match_parent" />
</pre>

Siguiendo el ejemplo que hablabamos antes, suponganse que yo de la lista primero veo el detalle de el celular Motorola Atrix 4G y luego el del iPhone. **Yo quiero que al tocar Back estando en el detalle del iPhone me muestre el detalle del Motorola, no quiero que me vaya a la activity anterior. Como hacemos esto?**  
Lo que tenemos que hacer es justamente agregar los distintos fragments al Activity Stack de la task que estamos ejecutando. Esto se hace realizando el cambio de Fragment mediante el uso de una FragmentTransaction.  
Un ejemplo es el siguiente

<pre lang="java">Fragment newFragment = new ExampleFragment();
FragmentTransaction transaction = getFragmentManager().beginTransaction();
transaction.replace(R.id.fragment_container, newFragment);
// La siguiente linea LO agrego al BackStack. Es de especial importancia
transaction.addToBackStack(null);
transaction.commit();
</pre>

Este fue un mini repaso de Fragment que es lo que se viene con mucha fuerza en las nuevas versiones de Android.  
Como dice Lionel de Nivel X: Espero que les haya gustado&#8230;&#8230;&#8230;. CHAU

EDIT: Luego de investigar un poco encontre que en realidad si se puede usar en las versiones anteriores a Honey para poder integrarlo con los celulares anteriores.  
Nos bajamos el Android Compatibility Package y luego simplemente agregamos en nuestro Manifest el use_library correspondiente a Fragments API.