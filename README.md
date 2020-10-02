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
    - If you run from another folder, environment variables will not work 

# :blue_book: DESCRIPTION
- A system to control everything that occurs at school
- This description will be more detailed soon

# :closed_book: BACKEND SERVICES
## Agreements
## Contracts
## Debits
- [x] Create debit for a contract
  - [ ] Verify if contract exists
- [x] List all debits based on a contract
  - [ ] Verify if contract exists
## Discharges
- [x] Create (pay a debit)
  - [x] Verify if debit exists
  - [x] Verify if debit is already paid
## Enrollments
- [ ] Create
  - [ ] Verify unique credentials
  - [ ] Verify grade
  - [ ] Create student
  - [ ] Create contract
  - [ ] Create responsibles or just use in case of reuse
  - [ ] Create agreements
  - [ ] Create relationships
  - [ ] Verify errors when creating any table and remove all data when a error occurs
- [ ] List all
  - [ ] List with just needed fields
- [ ] Find one
- [ ] Aproove or disaproove
## Grades
- [ ] Create
- [ ] List all
- [ ] Find one
- [ ] Update
## Payments
- [ ] Create
- [ ] List all
## Persons
- [ ] Create
- [ ] Find one
- [ ] Update
## Profiles
- [ ] Create
- [ ] List all
- [ ] Update
## Relationships
- [ ] Create
## Students
- [ ] Create
- [ ] Update documents photos
## Users
- [ ] Create
- [ ] List all
- [ ] Update
- [ ] Authenticate

# :closed_book: FRONTEND SCREENS
## Dashboard
- [ ] Presentation
## Pay debits
- [ ] List enrollments with pagination
- [ ] Search for a specify enrollment
- [ ] Select enrollment
- [ ] Show all enrollment debits
- [ ] 
## New enrollment
- [ ] Create responsibles
  - [ ] Search for a responsible that already exists on database
  - [ ] CEP API
  - [ ] React input mask
  - [ ] Civil state with enum
  - [ ] Education level with enum
  - [ ] CEP before the other address fields
  - [ ] File inputs
- [ ] Create student
  - [ ] UF limited by two digits with enum
  - [ ] Radio button on custom fields
  - [ ] File inputs
## Profiles administration
- [x] List
- [x] Create
- [x] Select
- [x] Update
- [ ] Remove
  - [ ] How?
## Grades administration
- [x] List
- [x] Create
- [x] Select
- [x] Update
- [ ] Remove
  - [ ] How?
## Users administration
- [x] List
- [x] Create
- [x] Select
- [x] Update
- [ ] Remove
  - [ ] How?
## Validate enrollments
- [ ] List all enrollments with pagination
- [ ] Search for a specify enrollment
- [ ] Select enrollment
- [ ] List all enrollment's fields
- [ ] Update fields
- [ ] Aproove or disaproove
## Receveive payments
- [ ] List all payments with pagination
- [ ] Select a debit
- [ ] Receive
## Logout
- [x] Logout