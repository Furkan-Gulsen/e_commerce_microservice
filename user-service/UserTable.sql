CREATE TABLE "users" (
    "user_id" bigserial PRIMARY KEY,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "user_type" varchar NOT NULL,
    "salt" varchar NOT NULL,
    "created_at" timestampt NOT NULL DEFAULT NOW(),
);