
set -evx
# Pull code
cd /var/www/build/front
git checkout beta
git pull origin beta

# Build and deploy
yarn install
yarn build

# Copy build to destination
cp -rf build/* /var/www/signally.io
