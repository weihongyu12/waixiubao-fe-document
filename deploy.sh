# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git config user.name "weihongyu12"
git config user.email "weihongyu12@outlook.com"
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f https://${GH_TOKEN}@github.com/weihongyu12/weihongyu12.github.io.git master

cd -
