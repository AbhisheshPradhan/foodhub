# foodhub

Restaurant directory + Restaurant Menu

docker compose up -d
docker compose exec backend

<!-- migration -->

docker compose exec backend npx prisma migrate dev --name add_user_restaurant_relation
docker compose exec backend npx prisma generate

docker compose restart backend
