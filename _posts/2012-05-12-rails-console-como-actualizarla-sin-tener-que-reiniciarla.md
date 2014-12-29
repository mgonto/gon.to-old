---
title: 'Rails Console: Como actualizarla sin tener que reiniciarla'
author: mgonto
layout: post
permalink: /2012/05/12/rails-console-como-actualizarla-sin-tener-que-reiniciarla/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1
dsq_thread_id:
  - 2367972635
categories:
  - Rails
  - Ruby
tags:
  - console
  - development
  - faster
  - irb
  - rails
  - ruby
  - startup
  - tip
---
Buenas!

Un poco de Ruby On Rails hoy. Estuve programando mucho con Sublime (Despues les cuento como configurarlo en otro post :)) en este lenguaje. Como con Sublime es imposible debuggear con Ruby, me hice muy amigo de la consola de Ruby (irb) y de la consola de Rails.

La Rails Console es igual a la consola de Ruby, solo que levanta todo el entorno rails, permitiendo hacer queries a la base de datos, probar los modelos, probar los controllers, etc.

Yo estuve trabajando el otro dia con ActiveResource y no lo podia hacer andar! Para probarlo, usaba la Rails Console. Cuando veia que no andaba, probaba cambiar algo en el codigo y bajaba la consola y la volvia a levantar. Esto implicaba que tenia que hacer los requires de vuelta y crear el &#8220;contexto&#8221; para poder probarlo de vuelta en la consola.

**Es en este momento cuando encontre la solucion. **La cosola de Rails tiene un comando llamado **reload! el cual traera todos los cambios realizados a las clases a la consola ya abierta.** Cual es la ventaja de este comando? Que **los objetos ya creados de esta clase modificada, seguiran existiendo, y su clase sera modificado, permitiendo que podamos ver estos cambios en tiempo real. **

Esto que quiere decir?

Suponganse que tenemos los siguiente:

````ruby
class HelloString &lt; ActiveRecord::Base

end
````

Y levantamos la consola de rails corriendo **rails console**. Ahora suponganse que corremos la siguiente linea:

````ruby
1.9.2p320 :003 &gt; HelloString.new.hello
NoMethodError: undefined method `hello' for #
	from (irb):3
	from /home/gonto/.rvm/rubies/ruby-1.9.2-p320/bin/irb:16:in `'
1.9.2p320 :004 &gt;
````

Como vemos, nos tira un error diciendo que el metodo hello no existe. Ahora, editemos la clase anterior en Sublime Text 2 y pongamos:

````ruby
class HelloString &lt; ActiveRecord::Base
  def hello
     "Hola Gonto"
  end
end
````

Ahora, corremos en la consola HelloString.new.hello y aun nos tirara la excepcion. Sin embargo, si ahora tocamos **reload!**, y luego corremos lo mismo que antes veremos:

````ruby
1.9.2p320 :009 &gt; HelloString.new.hello
 =&gt; "Hola Gonto"
1.9.2p320 :010 &gt;
````

Excelente, no?
