# :computer: RUNNING
## On development mode:
- Run `yarn dev:server`
- Make sure that your program has an `.env` file isnide main folder
- Make sure that your `.env` file follow the same pattern of `.env.example` file 
## On production mode:
- Run `yarn build`
- You may run build using `forever`
  - To do this, install `forever` globally using `yarn global add forever`
  - After all, run `forever start -c "serve -s" build`
  - To run in a specify port, run `forever start -c "serve -l PORT -s" build`
- You also may run using just `serve -s build`
  - However, this way doesnt work when the terminal is closed 

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
