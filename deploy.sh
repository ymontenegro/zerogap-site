#!/bin/bash

# Script de despliegue para Heroku
echo "🚀 Iniciando despliegue a Heroku..."

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si existe heroku CLI
if ! command -v heroku &> /dev/null; then
    echo -e "${RED}Error: Heroku CLI no está instalado${NC}"
    echo "Instala Heroku CLI desde: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Verificar si existe git
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git no está instalado${NC}"
    exit 1
fi

# Nombre por defecto de la app (cambiar según necesites)
APP_NAME="zerogap-site"

echo -e "${YELLOW}Verificando estado del repositorio...${NC}"

# Inicializar git si no existe
if [ ! -d ".git" ]; then
    echo "Inicializando repositorio Git..."
    git init
    git branch -M main
fi

# Verificar branch principal
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "Cambiando a branch main..."
    git checkout -b main 2>/dev/null || git checkout main
fi

# Validar package.json antes de continuar
echo -e "${YELLOW}Validando package.json...${NC}"
if ! node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo -e "${RED}❌ Error: package.json tiene errores de sintaxis${NC}"
    echo "Por favor, verifica la sintaxis del archivo package.json"
    exit 1
fi
echo -e "${GREEN}✅ package.json válido${NC}"

# Limpiar y reinstalar dependencias para sincronizar package-lock.json
echo -e "${YELLOW}Sincronizando dependencias...${NC}"
if [ -f "package-lock.json" ]; then
    echo "Eliminando package-lock.json existente..."
    rm package-lock.json
fi

if [ -d "node_modules" ]; then
    echo "Eliminando node_modules existente..."
    rm -rf node_modules
fi

echo "Instalando dependencias frescas..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi

# Agregar archivos al staging
echo "Agregando archivos..."
git add .

# Commit si hay cambios
if git diff --staged --quiet; then
    echo -e "${YELLOW}No hay cambios para commitear${NC}"
else
    echo "Creando commit..."
    git commit -m "Deploy to Heroku - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Verificar si la app existe en Heroku
echo -e "${YELLOW}Verificando aplicación en Heroku...${NC}"
if heroku apps:info $APP_NAME &> /dev/null; then
    echo -e "${GREEN}Aplicación $APP_NAME encontrada${NC}"
else
    echo -e "${YELLOW}Creando nueva aplicación: $APP_NAME${NC}"
    heroku create $APP_NAME
fi

# Verificar si el remote de heroku existe
if git remote get-url heroku &> /dev/null; then
    echo -e "${GREEN}Remote de Heroku configurado${NC}"
else
    echo "Agregando remote de Heroku..."
    heroku git:remote -a $APP_NAME
fi

# Sincronizar con el remote de Heroku si está detrás
echo -e "${YELLOW}Sincronizando con Heroku remote...${NC}"
git fetch heroku main 2>/dev/null || echo "No hay commits previos en Heroku"

# Forzar push si es necesario (para resolver conflictos)
echo -e "${YELLOW}Desplegando a Heroku...${NC}"
git push heroku main --force

# Verificar el estado del despliegue
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Despliegue exitoso!${NC}"
    echo -e "${GREEN}Tu sitio está disponible en: https://$APP_NAME.herokuapp.com${NC}"
    
    # Abrir la aplicación en el navegador (opcional)
    read -p "¿Quieres abrir la aplicación en el navegador? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        heroku open -a $APP_NAME
    fi
else
    echo -e "${RED}❌ Error en el despliegue${NC}"
    echo "Verifica los logs con: heroku logs --tail -a $APP_NAME"
    exit 1
fi

echo -e "${GREEN}🎉 Proceso completado!${NC}"
