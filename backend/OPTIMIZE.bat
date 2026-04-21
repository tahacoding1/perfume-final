@echo off
echo Optimizing LUMIERE Admin Panel...
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo Done! Admin panel is now optimized.
pause
