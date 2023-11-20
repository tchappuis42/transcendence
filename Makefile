RM		= rm -rf

all: build up 

db: 
		docker-compose build postgre
		docker-compose up -d postgre
	
up:
		docker-compose up -d

build:
		docker-compose build

re:			clean all

clean:		
		docker-compose down

fclean:
		docker-compose down -v

ps:
		docker ps