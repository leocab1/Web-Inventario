# InveCastor - Sitio Web de Inventario

InveCastor es un sistema de gestión de inventario que permite administrar diversos recursos dentro de una organización. El sitio web cuenta con funcionalidades para agregar, editar y eliminar distintos tipos de elementos como mobiliario, personas, ubicaciones y usuarios.

## Funcionalidades

El sitio web de InveCastor ofrece las siguientes funcionalidades:

### 1. **Mobiliario**
   - **Agregar**: Permite añadir nuevo mobiliario al inventario.
   - **Editar**: Actualiza los datos de un mobiliario ya existente.
   - **Eliminar**: Elimina un mobiliario del inventario.

### 2. **Personas**
   - **Agregar**: Permite registrar nuevas personas en el sistema.
   - **Editar**: Modifica la información de una persona registrada.
   - **Eliminar**: Elimina una persona del sistema.

### 3. **Ubicación**
   - **Agregar**: Permite agregar nuevas ubicaciones para los elementos de inventario.
   - **Editar**: Actualiza la información de una ubicación existente.
   - **Eliminar**: Elimina una ubicación del sistema.

### 4. **Usuarios**
   - **Agregar**: Crea nuevos usuarios con diferentes roles.
   - **Editar**: Modifica los datos de un usuario.
   - **Eliminar**: Elimina un usuario del sistema.

## Formato de uso correcto del sistema

El sistema permite actualizar diversos componentes, desde formularios hasta el consumo de endpoints. Asegúrate de seguir estos pasos para usar el sistema correctamente:

1. **Formulario de Entrada**: Completa los formularios con la información correcta para agregar, editar o eliminar datos.
2. **Consumo de Endpoints**: El sistema interactúa con una API backend para gestionar los datos. Los endpoints se consumen de forma asíncrona, y el estado de la aplicación se actualiza con los resultados.
3. **Validación**: Todos los formularios tienen validaciones para garantizar que los datos ingresados sean correctos antes de ser enviados al backend.
4. **Interacción Dinámica**: La interfaz se actualiza dinámicamente gracias a la integración con React y Vite.

---

## Stack Tecnológico

El proyecto está basado en React y Vite, con los siguientes beneficios y herramientas:

### **React**
React es una librería de JavaScript que permite construir interfaces de usuario interactivas y dinámicas de manera eficiente.

### **Vite**
Vite es una herramienta de construcción de aplicaciones que ofrece una experiencia de desarrollo rápida y optimizada.

**Configuración del Proyecto:**

- **React + Vite**: Configuración mínima para poner en funcionamiento React con Vite, aprovechando la recarga en caliente (HMR).
- **ESLint**: Reglas de estilo de código preconfiguradas para mantener un código limpio y consistente.

### Plugins Usados:
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**: Plugin oficial de Vite para React, utiliza Babel para la recarga rápida (Fast Refresh).
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: Alternativa al plugin anterior, que utiliza SWC para la recarga rápida.

---

## Instalación

Para ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/invecastor.git
