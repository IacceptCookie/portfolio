#!/bin/bash
# Script de sauvegarde automatique pour le portfolio
# À exécuter via cron: 0 3 * * * /var/www/portfolio/scripts/backup.sh

set -e

# Configuration
BACKUP_DIR="/var/backups/portfolio"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Créer le répertoire de backup si nécessaire
mkdir -p "$BACKUP_DIR"

echo "=== Backup démarré: $DATE ==="

# Backup de la base de données PostgreSQL
echo "Backup de la base de données..."
docker compose -f /var/www/portfolio/compose.prod.yaml exec -T db \
    pg_dump -U portfolio portfolio | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Backup des volumes Grafana
echo "Backup des données Grafana..."
docker run --rm \
    -v portfolio_grafana_data:/data:ro \
    -v "$BACKUP_DIR":/backup \
    alpine tar czf "/backup/grafana_$DATE.tar.gz" -C /data .

# Backup des fichiers uploadés
echo "Backup des uploads..."
tar czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C /var/www/portfolio/public uploads 2>/dev/null || echo "Pas de dossier uploads"

# Backup des clés JWT
echo "Backup des clés JWT..."
docker run --rm \
    -v portfolio_jwt_keys:/data:ro \
    -v "$BACKUP_DIR":/backup \
    alpine tar czf "/backup/jwt_keys_$DATE.tar.gz" -C /data . 2>/dev/null || echo "Pas de clés JWT"

# Suppression des anciens backups
echo "Nettoyage des anciens backups (> $RETENTION_DAYS jours)..."
find "$BACKUP_DIR" -type f -mtime +$RETENTION_DAYS -delete

# Afficher la taille des backups
echo "=== Backups créés ==="
ls -lh "$BACKUP_DIR"/*_$DATE* 2>/dev/null || echo "Aucun fichier créé"

echo "=== Backup terminé: $(date) ==="
