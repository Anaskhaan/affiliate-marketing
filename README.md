# run the following script to import csv into db

- npx tsx scripts/tablename.ts

# steps to import cvs

- create model
- mirgrate that model using "npx prisma migrate dev --name add_affiliate_product" (read about what part of command does what)
- add import script that matches your csv shape and table model
- run npx tsx scripts/tablename.ts#
