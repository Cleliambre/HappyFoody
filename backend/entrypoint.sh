#!/bin/bash
set -e

# Convertir l'URL Render en format JDBC si nécessaire
if [[ "$DATABASE_URL" == postgres://* ]]; then
  export DATABASE_URL="jdbc:postgresql://${DATABASE_URL:11}"
elif [[ "$DATABASE_URL" == postgresql://* ]]; then
  export DATABASE_URL="jdbc:postgresql://${DATABASE_URL:13}"
fi

echo "Using database URL: $DATABASE_URL"

# Lancer ton application Spring Boot
exec java -jar /app/target/*.jar
