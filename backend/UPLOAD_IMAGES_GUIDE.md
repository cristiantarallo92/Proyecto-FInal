# Guía para Subir Imágenes de Productos

## 📋 Resumen
Se agregó soporte para subir imágenes a los productos. Ahora puedes incluir una imagen al crear o actualizar un producto.

## 🚀 Cómo usar

### Crear un producto con imagen

**Endpoint:** `POST /products`

**Tipo de Request:** `multipart/form-data`

**Campos del formulario:**
- `name` (string): Nombre del producto
- `description` (string): Descripción del producto
- `brandId` (number): ID de la marca
- `categoryId` (number): ID de la categoría
- `price` (number): Precio del producto
- `stock` (number): Stock disponible
- `image` (file, opcional): Archivo de imagen

### Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/products \
  -F "name=Producto de Prueba" \
  -F "description=Descripción del producto" \
  -F "brandId=1" \
  -F "categoryId=1" \
  -F "price=19.99" \
  -F "stock=10" \
  -F "image=@/ruta/a/tu/imagen.jpg"
```

### Actualizar un producto con imagen

**Endpoint:** `PATCH /products/:id`

**Tipo de Request:** `multipart/form-data`

**Campos del formulario:** (todos opcionales)
- `name` (string): Nuevo nombre
- `description` (string): Nueva descripción
- `brandId` (number): Nuevo ID de marca
- `categoryId` (number): Nuevo ID de categoría
- `price` (number): Nuevo precio
- `stock` (number): Nuevo stock
- `image` (file): Nueva imagen

### Ejemplo con curl:
```bash
curl -X PATCH http://localhost:3000/products/1 \
  -F "name=Producto Actualizado" \
  -F "image=@/ruta/a/nueva/imagen.jpg"
```

## 📁 Restricciones de Archivos

- **Formatos permitidos:** JPG, JPEG, PNG, GIF
- **Tamaño máximo:** 5MB
- **Ubicación:** Las imágenes se almacenan en `/uploads/products/`
- **Acceso:** Las imágenes son accesibles vía HTTP en `/uploads/products/nombre-archivo.jpg`

## 🗃️ Cambios en la Base de Datos

Se agregó una nueva columna `imageUrl` a la tabla `products`:
- **Tipo:** `varchar`
- **Nullable:** `true`
- **Descripción:** Almacena la URL relativa de la imagen

## 🔧 Ejemplo de Respuesta

```json
{
  "id": 1,
  "name": "Producto de Prueba",
  "description": "Descripción del producto",
  "price": 19.99,
  "stock": 10,
  "imageUrl": "/uploads/products/product-1673123456789-123456789.jpg",
  "brandId": 1,
  "categoryId": 1
}
```

## 🛠️ Notas para Desarrollo

1. **Directorio de uploads:** Se crea automáticamente al subir la primera imagen
2. **Nombres únicos:** Las imágenes se renombran automáticamente para evitar conflictos
3. **Migración de BD:** Necesitas aplicar las migraciones para agregar la columna `imageUrl`
4. **Archivos estáticos:** Express sirve automáticamente los archivos desde `/uploads/`

## 🔄 Compatibilidad

- ✅ La funcionalidad es **retrocompatible**
- ✅ Los productos existentes seguirán funcionando sin imagen
- ✅ La imagen es **opcional** al crear productos
- ✅ Los endpoints existentes siguen funcionando igual 