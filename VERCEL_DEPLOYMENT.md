# Guía de Despliegue en Vercel

## Pasos para Desplegar

### 1. Preparar el Repositorio

- Asegúrate de que todos los cambios estén commiteados
- Push al repositorio remoto (GitHub, GitLab, etc.)

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub/GitLab
3. Haz clic en **"New Project"**
4. Importa tu repositorio `pitch-spectators`

### 3. Configurar Variables de Entorno

En el dashboard de Vercel:

1. Ve a **Settings** → **Environment Variables**
2. Agrega las siguientes variables:

| Variable                    | Valor                                     | Entornos                         | Seguridad |
| --------------------------- | ----------------------------------------- | -------------------------------- | --------- |
| `SUPABASE_URL`              | `https://tu-proyecto.supabase.co`         | Production, Preview, Development | Privada   |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development | Privada   |

### 4. Obtener las Variables de Supabase

#### Opción A: Desde Supabase Dashboard

1. Ve a [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

#### Opción B: Usando Supabase CLI

```bash
# Si tienes el CLI instalado
supabase status
```

### 5. Desplegar

1. Haz clic en **"Deploy"** en Vercel
2. Espera a que termine el build
3. Tu aplicación estará disponible en la URL proporcionada

## Arquitectura de Seguridad

### 🔒 Variables 100% Privadas

- `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`
- **Uso**: Todas las operaciones (escritura, lectura, tiempo real)
- **Acceso**: Solo en API routes del servidor
- **Seguridad**: NUNCA expuestas al cliente

### 🔄 Flujo de Datos Seguro

1. **Escritura**: Cliente → API Route → Supabase (con service role)
2. **Lectura**: Cliente → API Route → Supabase (con service role)
3. **Tiempo Real**: API Route → Server-Sent Events → Cliente
4. **NUNCA** se expone ninguna credencial al cliente

## Verificación Post-Despliegue

1. **Verifica que la aplicación carga correctamente**
2. **Prueba la funcionalidad de preguntas**:

   - Ingresa un nombre
   - Envía una pregunta
   - Verifica que aparece en tiempo real

3. **Revisa los logs** en Vercel si hay problemas:
   - Ve a **Functions** → **View Function Logs**

## Troubleshooting

### Error: "Missing environment variable"

- Verifica que las variables estén configuradas en Vercel
- Asegúrate de que los nombres coincidan exactamente
- Reinicia el deployment después de agregar variables

### Error de conexión a Supabase

- Verifica que la URL de Supabase sea correcta
- Confirma que la clave anónima sea válida
- Revisa que el proyecto de Supabase esté activo

### Problemas de CORS

- Supabase maneja CORS automáticamente
- Si persisten problemas, revisa la configuración de RLS en Supabase

## Comandos Útiles

```bash
# Verificar variables de entorno localmente
npm run dev

# Build local para probar
npm run build

# Linter
npm run lint
```

## URLs Importantes

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Documentación Next.js**: https://nextjs.org/docs
- **Documentación Supabase**: https://supabase.com/docs
