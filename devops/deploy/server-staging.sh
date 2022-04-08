
set -evx
# Pull code
cd /var/www/build/front
git checkout staging
git pull origin staging

# Build and deploy
yarn install
yarn build

# Copy build to destination
cp -rf build/* /var/www/signally.io
