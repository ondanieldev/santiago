# :computer: RUNNING
## Frontend
### On development mode
- Run `yarn start`
### On production mode
- Run `yarn build`
- You may serve build using `forever`
  - To do this, install `forever` globally using `yarn global add forever`
  - After all, run `forever start -c "serve -s" build`
  - To serve in a specify port, you should run `forever start -c "serve -l PORT -s" build`
- You also may serve using just `serve -s build`
  - However, this way doesnt work when the terminal is closed 
## Backend
### On development mode
- Run `yarn dev:server`
- Make sure that your program has an `.env` file isnide main folder
- Make sure that your `.env` file follow the same pattern of `.env.example` file 
### On production mode
- Run `yarn build`
- Make sure that your program has an `.env` file isnide main folder
- Make sure that your `.env` file follow the same pattern of `.env.example` file
- You may serve using `pm2`
  - To do this, install `pm2` globally using `yarn global add pm2`
  - After all, run `pm2 start ./dist/shared/infra/http/server.js`
  - Make sure that you running from the backend folder
    - If you run from other folder, environment variables will not work 

# :blue_book: DESCRIPTION
- A system to control everything that occurs at school
- This description will be more detailed soon

# :green_book: MODULES
## Agreements
## Contracts
## Debits
## Discharges
## Grades
## Payments
## Persons
## Profiles
## Relationships
## Students
## Users
