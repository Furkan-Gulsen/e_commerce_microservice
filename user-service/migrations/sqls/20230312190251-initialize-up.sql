CREATE TABLE "address" (
  "id" bigserial PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "address_line1" text,
  "address_line2" text,
  "city" varchar,
  "post_code" varchar,
  "country" varchar,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE INDEX ON "address" ("user_id");
CREATE INDEX ON "address" ("post_code");
CREATE INDEX ON "address" ("country");

-- Add Relation
ALTER TABLE "address" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");