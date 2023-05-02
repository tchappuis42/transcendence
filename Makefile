RM		= rm -rf

all: up build

db: 
		docker-compose build postgre
		docker-compose up -d postgre
	
up:
		docker-compose up -d

build:
		docker-compose --build

down:
		docker-compose down

re:			down all

clean:		down
		docker system prune -a -f

ps:
		docker ps