#!/bin/bash
# ═══════════════════════════════════════════════════════════
#  سكربت النشر السريع - مصنع رويال للأنابيب
# ═══════════════════════════════════════════════════════════
#  تشغيل: sudo bash deploy.sh عنوان_الخادم
# ═══════════════════════════════════════════════════════════

set -e

SERVER_IP="${1:?خطأ: أدخل عنوان الخادم (مثال: 159.89.123.45)}"
DB_PASSWORD="${2:-RoyalPipes2026!}"

echo " بدء نشر موقع رويال على: $SERVER_IP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. تثبيت المتطلبات
echo "📦 1. تثبيت المتطلبات..."
ssh root@$SERVER_IP "
  apt update && apt upgrade -y
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs mysql-server nginx
  npm install -g pm2
"

# 2. إنشاء قاعدة البيانات
echo "🗄️ 2. إنشاء قاعدة البيانات..."
ssh root@$SERVER_IP "
  mysql -e \"CREATE DATABASE IF NOT EXISTS royal_pipes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\"
  mysql -e \"CREATE USER IF NOT EXISTS 'royal'@'localhost' IDENTIFIED BY '$DB_PASSWORD';\"
  mysql -e \"GRANT ALL PRIVILEGES ON royal_pipes.* TO 'royal'@'localhost';\"
  mysql -e 'FLUSH PRIVILEGES;'
"

# 3. رفع الملفات
echo "📤 3. رفع الملفات..."
ssh root@$SERVER_IP "mkdir -p /var/www/royal-pipes/api"
scp api/* root@$SERVER_IP:/var/www/royal-pipes/api/
scp dist/* root@$SERVER_IP:/var/www/royal-pipes/dist/ 2>/dev/null || echo "(لا يوجد مجلد dist/ بعد)"

# 4. إعداد API
echo "️ 4. إعداد API..."
ssh root@$SERVER_IP "
  cd /var/www/royal-pipes/api
  npm install
  cat > .env << ENVEOF
DB_HOST=localhost
DB_USER=royal
DB_PASSWORD=$DB_PASSWORD
DB_NAME=royal_pipes
DB_PORT=3306
PORT=3000
JWT_SECRET=royal-secret-change-$(date +%s)
ENVEOF
  node setup-database.js
"

# 5. تشغيل API
echo "▶️ 5. تشغيل API..."
ssh root@$SERVER_IP "
  cd /var/www/royal-pipes/api
  pm2 delete royal-api 2>/dev/null || true
  pm2 start server.js --name royal-api
  pm2 save
  pm2 startup
"

# 6. إعداد Nginx
echo " 6. إعداد Nginx..."
ssh root@$SERVER_IP "
  cat > /etc/nginx/sites-available/royal << 'NGINXEOF'
server {
    listen 80;
    server_name $SERVER_IP;
    root /var/www/royal-pipes/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
NGINXEOF
  ln -sf /etc/nginx/sites-available/royal /etc/nginx/sites-enabled/
  rm -f /etc/nginx/sites-enabled/default
  nginx -t && systemctl restart nginx
"

# 7. Firewall
echo " 7. إعداد الجدار الناري..."
ssh root@$SERVER_IP "
  ufw allow 22
  ufw allow 80
  ufw allow 443
  ufw --force enable
"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ تم النشر بنجاح!"
echo ""
echo " الموقع: http://$SERVER_IP"
echo "📡 API:    http://$SERVER_IP/api/products"
echo "🔐 لوحة التحكم: http://$SERVER_IP/admin"
echo ""
echo "👤 بيانات الدخول: admin / royal2026"
echo ""
echo "💡 لإضافة SSL (HTTPS):"
echo "   ssh root@$SERVER_IP"
echo "   apt install -y certbot python3-certbot-nginx"
echo "   certbot --nginx"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
