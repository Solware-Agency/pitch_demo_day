# Guía de Administración - Recuperar Preguntas

## 🎯 Métodos para Recuperar/Administrar Preguntas

### 1. **Interfaz Web (Recomendado)**

- **URL**: `http://localhost:3000/admin` (desarrollo) o `https://tu-dominio.com/admin` (producción)
- **Funciones**:
  - ✅ Ver todas las preguntas
  - ✅ Eliminar preguntas individuales
  - ✅ Eliminar todas las preguntas
  - ✅ Recargar lista
  - ✅ Ver fechas y detalles

### 2. **API Endpoints**

#### Ver Todas las Preguntas

```bash
# GET /api/admin/questions
curl http://localhost:3000/api/admin/questions
```

#### Eliminar Todas las Preguntas

```bash
# DELETE /api/admin/questions
curl -X DELETE http://localhost:3000/api/admin/questions
```

#### Eliminar Pregunta Específica

```bash
# DELETE /api/admin/questions/[id]
curl -X DELETE http://localhost:3000/api/admin/questions/123
```

### 3. **Desde Supabase Dashboard**

1. Ve a [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Table Editor**
4. Selecciona la tabla `pitchQuestions`
5. Puedes ver, editar o eliminar registros directamente

### 4. **Usando Supabase CLI**

```bash
# Ver preguntas
supabase db query "SELECT * FROM pitchQuestions ORDER BY created_at DESC;"

# Eliminar todas las preguntas
supabase db query "DELETE FROM pitchQuestions;"

# Eliminar pregunta específica
supabase db query "DELETE FROM pitchQuestions WHERE id = 123;"
```

## 🔧 Comandos Útiles para Pruebas

### Limpiar Base de Datos (Desarrollo)

```bash
# Eliminar todas las preguntas
curl -X DELETE http://localhost:3000/api/admin/questions
```

### Ver Estadísticas

```bash
# Contar preguntas
curl http://localhost:3000/api/admin/questions | jq '.count'
```

### Backup de Preguntas

```bash
# Exportar preguntas a JSON
curl http://localhost:3000/api/admin/questions > preguntas_backup.json
```

## 🚨 Casos de Uso Comunes

### Antes de una Presentación

1. Ve a `/admin`
2. Revisa las preguntas existentes
3. Elimina preguntas de prueba si es necesario
4. Deja solo preguntas relevantes

### Después de Pruebas

1. Ve a `/admin`
2. Haz clic en "Eliminar Todas"
3. Confirma la acción
4. La base de datos queda limpia

### Durante Desarrollo

```bash
# Limpiar rápidamente desde terminal
curl -X DELETE http://localhost:3000/api/admin/questions
```

## 📊 Estructura de Datos

```json
{
	"id": 123,
	"name": "Juan Pérez",
	"pregunta": "¿Cuál es su modelo de negocio?",
	"created_at": "2024-01-15T10:30:00Z"
}
```

## 🔒 Seguridad

- ⚠️ **Solo para desarrollo/pruebas**: Estas rutas no tienen autenticación
- 🚀 **Para producción**: Agrega autenticación antes de desplegar
- 🛡️ **Recomendación**: Usa estas rutas solo en entornos de desarrollo

## 🎯 URLs Importantes

- **Desarrollo**: `http://localhost:3000/admin`
- **Producción**: `https://tu-dominio.com/admin`
- **API**: `/api/admin/questions`
- **Supabase**: [supabase.com/dashboard](https://supabase.com/dashboard)
