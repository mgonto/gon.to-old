---
title: 'Tips para Empathy: Como cerrar la ventana con Esc y cambiar el Shortcut de cambio de ventanas'
author: mgonto
layout: post
permalink: /2011/05/18/tips-para-empathy-como-cerrar-la-ventana-con-esc-y-cambiar-el-shortcut-de-cambio-de-ventanas/
dsq_thread_id:
  - 307458450
aktt_notify_twitter:
  - yes
categories:
  - Linux
  - Ubuntu
tags:
  - change
  - chat
  - close
  - ctrl
  - empathy
  - esc
  - gtk
  - Linux
  - Natty
  - pygtk
  - python
  - shortcut
  - tab
  - Ubuntu
  - window
---
El otro dia decidi borrar Pidgin de mi Ubuntu 11.04 e instalarme Empathy debido a su gran integracion.  
Apenas me puse a probar la aplicacion le encontre 2 grandes problemas.

  1. No puedo cambiar entre las ventanas con Ctrl + Tab
  2. No puedo cerrar la ventana existente con Esc o Escape

Segun los creadores de Empathy estos no son bugs, sino que GNome dice que Escape = Cancelar y Ctrl + Tab = cambiar foco entre elementos de texto. Es por esto que para ser consistentes con GNome no quieren poner en su codigo estas opciones.

Luego de averiguar durante un largo rato encontre la soluciona a este problema.

Hay un archivo en el file system donde estan configuradas todas las acciones que se pueden realizar sobre nuestra ventana de GTK. Dichas acciones tienen lo que se llama &#8220;Accelerators&#8221; que son shortcuts de teclado.

Primero vamos a ir al archivo: /usr/share/empathy/empathy-chat-window.ui

Vamos a editarlo como sudo ( sudo gedit /usr/share/empathy/empathy-chat-window.ui).

Una vez abierto veran que es un XML comun y corriente con diversas acciones.

Primero que nada van a buscar la siguiente linea:

````xml
&lt;/child>
        &lt;child>
          
          &lt;accelerator key="L" modifiers="GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="Escape"/>
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="X" modifiers="GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="C" modifiers="GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="V" modifiers="GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="F" modifiers="GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="a" modifiers="GDK_CONTROL_MASK|GDK_SHIFT_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="a" modifiers="GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="t" modifiers="GDK_SHIFT_MASK | GDK_CONTROL_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="Page_Up" modifiers="GDK_CONTROL_MASK|GDK_SHIFT_MASK"/>
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="Page_Down" modifiers="GDK_CONTROL_MASK|GDK_SHIFT_MASK"/>
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
        &lt;/child>
        &lt;child>
          
          &lt;accelerator key="F1" modifiers=""/>
        &lt;/child>
        &lt;child>
          
        &lt;/child>
      &lt;/object>
    &lt;/child>
    &lt;ui>
      &lt;menubar name="chats_menubar">
        

<menu action="menu_conv">
  &lt;menuitem action="menu_conv_clear"/>
            &lt;menuitem action="menu_conv_insert_smiley"/>
            &lt;menuitem action="menu_conv_favorite"/>
            &lt;menuitem action="menu_conv_always_urgent"/>
            &lt;menuitem action="menu_conv_toggle_contacts"/>
            &lt;menuitem action="menu_conv_invite_participant"/>
            &lt;separator/>
            &lt;menuitem action="menu_conv_close"/>
          
</menu>
        

<menu action="menu_contact" />

<menu action="menu_edit">
  &lt;menuitem action="menu_edit_cut"/>
            &lt;menuitem action="menu_edit_copy"/>
            &lt;menuitem action="menu_edit_paste"/>
            &lt;separator/>
            &lt;menuitem action="menu_edit_find"/>
          
</menu>
        

<menu action="menu_tabs">
  &lt;menuitem action="menu_tabs_prev"/>
            &lt;menuitem action="menu_tabs_next"/>
            &lt;menuitem action="menu_tabs_undo_close_tab"/>
            &lt;separator/>
            &lt;menuitem action="menu_tabs_left"/>
            &lt;menuitem action="menu_tabs_right"/>
            &lt;menuitem action="menu_tabs_detach"/>
          
</menu>
        

<menu action="menu_help">
  &lt;menuitem action="menu_help_contents"/>
            &lt;placeholder name="LaunchpadItems"/>
            &lt;menuitem action="menu_help_about"/>
          
</menu>
      &lt;/menubar>
    &lt;/ui>
  &lt;/object>
  
          &lt;packing>
            &lt;property name="expand">False&lt;/property>
            &lt;property name="fill">False&lt;/property>
          &lt;/packing>
        &lt;/child>
        &lt;child>
          &lt;placeholder/>
        &lt;/child>
      &lt;/object>
    &lt;/child>
  &lt;/object>
&lt;/interface>
````
