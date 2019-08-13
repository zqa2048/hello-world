# echo "#### cnpm cache clean --force"
# cnpm cache clean --force

echo "#### cnpm install --save"
cnpm install --save

echo "#### cnpm build"
cnpm run build:uat
