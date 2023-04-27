
if [ ! -d ./dist] ; then
	npm install -g @nestjs/cli
	npm i ejs
	npm i --save class-validator class-transformer
	npm install --save @nestjs/typeorm typeorm pg
fi

npm run start:dev