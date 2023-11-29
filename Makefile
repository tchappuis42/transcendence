RM		= rm -rf

all: build

db: 
		docker-compose build postgre
		docker-compose up -d postgre
	
up:
		docker-compose up -d

build:
		@ sudo docker compose -f docker-compose.yml up --build


re:			clean all

clean:		
		docker-compose down

re:			down all

clean:		down
		@ sudo docker system prune -a -f

ps:
		docker ps