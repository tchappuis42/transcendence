RM		= rm -rf

all: up build

db: 
		sudo docker-compose build postgre
		sudo docker-compose up -d postgre
	
up:
		sudo docker-compose up -d

build:
		sudo docker-compose build

down:
		sudo docker-compose down

re:			down all

clean:		down
		sudo docker system prune -a -f

ps:
		sudo docker ps