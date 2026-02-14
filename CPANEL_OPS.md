# cPanel Operations Guide (Titan v5.4.2a)

## 1. Despliegue (Deploy)
1.  **Build:** Ejecutar `npm run build` localmente.
2.  **Upload:** Subir el contenido de la carpeta `build/` al directorio raíz de la aplicación en cPanel (ej. `repositories/m2-web`).
3.  **Dependencies:** Subir `package.json` y `package-lock.json`. Ejecutar "Run NPM Install" en el panel Node.js de cPanel si hubo cambios.

## 2. Configuración Node.js (cPanel)
*   **Node Version:** v20.x (Recomendado) o v18.x.
*   **Application Root:** Ruta donde subiste los archivos.
*   **Startup File:** `index.js` (o `build/index.js` dependiendo de cómo subas la carpeta).
    *   *Nota:* El adapter-node genera `index.js` dentro de `build/`. Asegúrate que cPanel apunte a ese archivo.

## 3. Reinicio (Restart)
Para aplicar cambios de código o configuración:
1.  Ir a **cPanel > Setup Node.js App**.
2.  Seleccionar la aplicación "M2 Web".
3.  Click en el botón **Restart Application**.

## 4. Logs
Para ver errores de arranque o runtime (SSR):
1.  **Opción A (Archivo):** Configurar en cPanel que `stderr` vaya a un archivo (ej. `stderr.log`). Ver este archivo vía File Manager.
2.  **Opción B (Consola):** En "Setup Node.js App", usar el botón "Run JS Script" y ejecutar un script de prueba si es necesario, o revisar el log de errores de Apache/Passenger en la sección "Errors" de cPanel.

## 5. Health Check
Verificar estado en: `https://tudominio.com/api/health`
Debe retornar: `{"status": "ok", "version": "5.4.2a", ...}`
