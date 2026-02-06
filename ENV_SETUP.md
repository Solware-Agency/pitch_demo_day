# Configuración de Variables de Entorno

## Para Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Supabase Configuration - Variables Privadas (100% seguras)
SUPABASE_URL=tu_url_del_proyecto_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_supabase
```

## Para Despliegue en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:

| Variable                    | Valor               | Entorno                          | Seguridad |
| --------------------------- | ------------------- | -------------------------------- | --------- |
| `SUPABASE_URL`              | Tu URL de Supabase  | Production, Preview, Development | Privada   |
| `SUPABASE_SERVICE_ROLE_KEY` | Tu service role key | Production, Preview, Development | Privada   |

## Obtener las Variables de Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Arquitectura de Seguridad

### 🔒 Variables 100% Privadas

- **Uso**: Todas las operaciones de base de datos y tiempo real
- **Seguridad**: Solo accesibles en el servidor
- **Funcionalidad**: API routes manejan todo (escritura, lectura, tiempo real)

### 🔄 Flujo de Datos Seguro

1. **Cliente** → **API Route** → **Supabase** (con service role)
2. **Tiempo Real**: **API Route** → **Server-Sent Events** → **Cliente**
3. **NUNCA** se expone ninguna credencial al cliente

## Notas Importantes

- **NUNCA** expongas `SUPABASE_SERVICE_ROLE_KEY` al cliente
- **NO** necesitas variables `NEXT_PUBLIC_*`
- Todas las operaciones pasan por API routes del servidor
- Tiempo real usando Server-Sent Events (más seguro que WebSockets)
- Nunca commites archivos `.env.local` o `.env` al repositorio
