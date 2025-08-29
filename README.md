# Proyecto

Este proyecto fue generado con las siguientes caracteristicas:
|                |Versión							|
|----------------|-------------------------------|
|Angular|`20.0.0`            |
|NPM          |`11.5.2`            |
|Node.js          |`22.14.0`|
|Ionic CLI          |`5.4.6`|
|SQLite          ||
|Android Studio          |`21.0.4`|
|Java JDK          |`20`|
|Gradle          |`9.0.0`|

## Cambios Realizados

 - Se agregó tanto en el componente que lista las tareas y categorías: 
 
	 1. Un campo de texto que realiza una búsqueda por la descripción.
	 2. Un componente llamado `ion-refresher` que permite generar nuevamente el listado de datos cuando se desliza la pantalla hacia abajo estando al principio del scroll. Muchas aplicaciones usan este componente al mostrar un listado de datos.
	 3. Un componente llamado `ion-infinite-scroll` que permite realizar la paginación del listado, agregando 10   registros mas al listado cuando se desliza hacia lo ultimo del scroll del componente. Muchas aplicaciones usan este componente al mostrar un listado de datos. 
	 4. Los componentes `ion-action-sheet` y `ion-item-sliding` a los componentes de listado con el objetivo de mostrar opciones que el usuario pueda seleccionar. En este caso fueron `Editar` y `Eliminar` para el listado de categorías y `Completar` y `Eliminar` para el listado de tareas.
	 5. Un componente llamado `ion-fab` que permite generar un botón flotante, el cual ejecuta un metodo que se configure para relizar alguna acción, por ejemplo mostrar un listado de acciones (por ejemplo listado de opciones: Categorías, Nueva Tarea) o mostrar un modal (Registrar categoría). Muchas aplicaciones usan este componente al mostrar un listado de datos. 
 - Se agregó la verificación del botón atrás del teléfono celular para generar una alerta de confirmación en el componente que lista las tareas, ya que este es la pagina inicial de la aplicación. Si el usuario selecciona el botón `Aceptar` la aplicación se cierra, sino solo se cierra la ventana de confirmación. Estas alertas se agregaron como un servicio con métodos reutilizables mediante programación orientada a objetos.
 - En los modal que registran una tarea y una categoría el botón `Guardar` se activa si los campos de texto han sido llenados y han seleccionado alguna opción en los listados. Se pudo haber optado por renderizar o no el botón `Guardar` cumpliendo dichas condiciones pero en este caso solo se desactiva y activa.

## Instrucciones Generales

- Descargar e instalar node.js para ejecutar comandos npm
- Instalar Angular CLI con el siguiente comando `npm install -g @angular/cli`
- Clonar proyecto desde el repositorio en GitHub con el comando `git clone https://github.com/dev-shelvin-batista/app-tasks.git` o bien puede usar la herramienta visual de GitHub que le permita clonar el proyecto en su equipo.
- Después de clonar el proyecto acceder a la carpeta con el comando `cd app-tasks` desde una terminal de comandos.
- Instalar las dependencias de node usa el comando `npm install`
- Ejecutar comando `ionic serve` para verificar la app en el navegador. Por defecto se usa la url `http://localhost:8100/`.

## Configuraciones Importantes

### Configuración de Java JDK

 - Se debe descargar Java JDK de internet e instalarlo en su equipo.
 - Verificar si se agregó la variable de entorno `JAVA_HOME` después de la instalación. Esto se hace siguiendo las siguientes instrucciones:
	 1. Abrir el explorador de Windows.
	 2. Presionar click derecho en `Este Equipo` y seleccionar la opción `Propiedades`.
	 3. En el listado de la parte derecha seleccionar la opción `Configuración avanzada del sistema`
	 4. Se abre una ventana con el titulo `Propiedades del sistema`. En esta ventana se selecciona el botón `Variables de entorno` de la pestaña `Opciones avanzadas`
	 5. Se abre otra ventana con las variables de entorno del usuario actual y del sistema.
	 6. Verificar si esta agregada la variable`JAVA_HOME`
 - Si el instalador no agregó la variable de entorno `JAVA_HOME` se debe agregar manualmente. Para esto se debe hacer los mismos pasos del punto anterior y en ambas secciones se siguen las siguientes instrucciones:
	 1. Seleccionar el botón `Nueva...`y se abre una ventana llama `Nueva variable de usuario`
	 2. Se debe agregar en el campo `nombre de la` el valor `JAVA_HOME` y en el campo `Valor de la` el valor `C:\Program Files\Java\jdk-20`. El 20 es la versión de JDK usada en la demostración. Se debe reemplazar por la versión en el equipo a verificar.
	 3. Se selecciona el botón `Aceptar` para guardar los datos.

### Configuración de Gradle

Esta herramienta es necesaria para la compilación de la app en Android.

 - Se debe descargar gradle de internet. Es un archivo comprimido zip. [Descargar](https://gradle.org/next-steps/?version=9.0.0&format=all)
 - Extraer el archivo comprimido en el disco local C. Se genera una carpeta llamada `gradle-9.0.0`. Renombrar esta carpeta a `Gradle`.
 - Se debe agregar esta ruta en la variable de entorno llamada `Path`. Para hacer esto se deben seguir los siguientes pasos.
	 1. Abrir el explorador de Windows.
	 2. Presionar click derecho en `Este Equipo` y seleccionar la opción `Propiedades`.
	 3. En el listado de la parte derecha seleccionar la opción `Configuración avanzada del sistema`
	 4. Se abre una ventana con el titulo `Propiedades del sistema`. En esta ventana se selecciona el botón `Variables de entorno` de la pestaña `Opciones avanzadas`
	 5. Se abre otra ventana con las variables de entorno del usuario actual y del sistema.
	 6. En ambos tipos de variables se selecciona la opción `Editar`, el cual abre una ventana llamada `Editar variable de entorno` y se agrega al final la ruta de la carpeta que se descomprimió en los pasos anteriores, es decir la ruta `C:\Gradle\bin`.
	 7. Se selecciona el botón `Aceptar` para guardar los datos. 
	 8. Se puede verificar si quedó agregado correctamente ejecutando el comando `gradle --version` en una terminal de comandos. Se genera un texto con la versión de gradle.

### Configuración de  Android Studio

Para instalar y configurar el editor Android Studio se debe seguir los pasos anteriores. Si ya lo ha hecho puede omitirlos.

 - Se debe descargar el editor Android Studio de internet e instalarlo en su equipo.
 - - Verificar si se agregó la variable de entorno `ANDROID_HOME` después de la instalación. Esto se hace siguiendo las siguientes instrucciones:
	 1. Abrir el explorador de Windows.
	 2. Presionar click derecho en `Este Equipo` y seleccionar la opción `Propiedades`.
	 3. En el listado de la parte derecha seleccionar la opción `Configuración avanzada del sistema`
	 4. Se abre una ventana con el titulo `Propiedades del sistema`. En esta ventana se selecciona el botón `Variables de entorno` de la pestaña `Opciones avanzadas`
	 5. Se abre otra ventana con las variables de entorno del usuario actual y del sistema.
	 6. Verificar si esta agregada la variable`ANDROID_HOME`
 - Si el instalador no agregó la variable de entorno `ANDROID_HOME` se debe agregar manualmente. Para esto se debe hacer los mismos pasos del punto anterior y en ambas secciones se siguen las siguientes instrucciones:
	 1. Seleccionar el botón `Nueva...`y se abre una ventana llama `Nueva variable de usuario`
	 2. Se debe agregar en el campo `nombre de la` el valor `ANDROID_HOME` y en el campo `Valor de la` el valor `C:\Users\Usuario\AppData\Local\Android\Sdk`. 
	 3. Se selecciona el botón `Aceptar` para guardar los datos.
- Después de verificar la variable de entorno, se debe agregar configurar gradle en Android Studio.  Esto se hace siguiendo las siguientes instrucciones:
	1. Se selecciona la opción `File` del menú principal y la opción `Settings`.
	2. Se abre una ventana de configuración.
	3. En la ventana de configuración seleccione la opción `Build, Execution, Deployment`, `Build Tools` y `Gradle`.
	4. En esta sección se modifica la ruta en el campo `Gradle user home` a `C:/Gradle`.
 
## Instrucciones para compilar y ejecutar en Android

### Navegador

- Acceder a la carpeta con el comando `cd app-tasks` desde una terminal de comandos.
- Ejecutar comando `ionic serve` para verificar la app en el navegador. Por defecto se usa la url `http://localhost:8100/`.
- En el navegador se puede emular como se vería en un teléfono celular pero en este caso no funcionaría la base de datos, ya que esto en un dependencia nativa. Por eso en esta prueba se usa el Local Storage para realizar pruebas desde PC.

### Compilación en Android & Ios

- Acceder a la carpeta con el comando `cd app-tasks` desde una terminal de comandos.
- Ejecutar el comando `ionic cordova build android` para Android y `ionic cordova build ios`

### Ejecutar app en Android

Para la ejecución de la app se puede realizar de dos formas: con un emulador o un teléfono celular con el modo desarrollador activo y conectado por el puerto USB. Para esta prueba se usó la segunda opción para realizar una prueba real.

- Se debe tener el teléfono celular en modo desarrollador. Para verificar se debe seleccionar la opción Configuración o Ajuste del celular, buscar la opción Acerca de y seleccionar 6 veces la versión o modelo del celular.
- Después de activar el modo desarrollador, se debe activar la depuración USB en la opción `Opciones de desarrollador`. La ubicación de esta opción varía dependiendo de la marca y el modelo de celular a usar.
- En la sección `Opciones de desarrollador` se deben activar las opciones `Depuración USB`, `instalar vía USB` y `Depuración USB (ajustes de seguridad)`
- Verificar si el teléfono celular conectado por USB se reconoce como dispositivo ejecutando en una terminal de comandos ``ionic cordova run android --list``. Con este comando se generan dos tipos de dispositivos: 
Conectados por cable o Wi-fi y Emuladores. Para este caso el teléfono celular debe aparecer en el primer listado.
- Si en el listado anterior solo hay un dispositivo conectado se puede ejecutar el comando `ionic cordova run android --device`. Pero si hay mas de un dispositivo conectado se ejecuta el comando `ionic cordova run android --target=<device_id>`. <device_id> es el id generado en el listado del punto anterior. Si se genera un error use la opción --verbose al final del comando para que se muestre de manera detallada toda la ejecución, el error y su causa.
- Al momento de ejecutar el comando anterior se realiza la compilación e instalación en su teléfono celular, evitando así la necesidad de compilar el proyecto, buscar el archivo apk y pasarlo al teléfono celular para instalar la app. En la primera instalación de la app se pedirá autorización de la instalación de la app en su teléfono celular. Se debe seleccionar el botón Aceptar las veces que se muestre esto para la instalación.