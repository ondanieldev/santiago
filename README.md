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
- [x] Create agreement between person and contract
  - [ ] Verify if person exists
  - [ ] Verify if contract exists
## Contracts
- [x] Create contract between student and grade
  - [ ] Verify if student exists
  - [ ] Verify if grade exists
## Debits
- [x] Create debit for a contract
  - [ ] Verify if contract exists
  - [ ] Define default dates ***
- [x] List all debits based on a contract
  - [ ] Verify if contract exists
## Discharges
- [x] Create a discharge (receive a payment)
  - [x] Verify if payment exists
  - [x] Verify if payment is already paid
## Enrollments
- [x] Create
  - [ ] Verify responsible types ***
  - [x] Create student
  - [x] Create contract
  - [x] Create responsibles or take their id (in case of reuse)
  - [x] Create agreements
  - [x] Create relationships
  - [ ] Verify errors when creating any table and remove all data when a error occurs
- [x] List all
  - [ ] List with just needed fields
- [x] Find one
- [x] Aproove or disaproove
  - [x] Verify if contract exists
  - [x] In case of aproove, create the first debit
  - [ ] Send email ***
## Grades
- [x] Create
  - [ ] Verify if exists another grade with the same name
  - [ ] Resolve the year question ***
- [x] List all
- [x] Find one
- [ ] Update
  - [x] Verify if exists
  - [ ] Verify if exists another grade with the same name
## Payments
- [ ] Create payment (pay a debit)
  - [ ] Verify if debit exists
  - [ ] Verify if debit is already paid
  - [ ] Generate receipt
- [ ] List all
## Persons
- [x] Create
  - [x] Verify unique values
- [x] Find one
- [x] Update photos
  - [x] Verify if person exists
  - [x] Delete the previous photos
## Profiles
- [x] Create
  - [x] Verify if exists another profile with the same name
- [x] List all
- [x] Update
  - [x] Verify if exists
  - [x] Verify if exists another profile with the same name
- [ ] Remove ***
## Relationships
- [x] Create relationship between person and student
  - [ ] Verify if responsible exists
  - [ ] Verify if student exists
## Students
- [ ] Create
- [x] Update documents photos
  - [x] Verify if student exists
  - [x] Delete the previous photos
## Users
- [x] Create
  - [x] Verify if exists another user with the same username
  - [x] Encrypt password
- [x] List all
- [x] Update
  - [x] Verify if exists another user with the same username
  - [x] Encrypt password
- [x] Authenticate
  - [ ] Check for user permissions

# :closed_book: FRONTEND SCREENS
## Dashboard
- [ ] Presentation
## Pay debits
- [ ] List enrollments with pagination
- [ ] Search for a specify enrollment
- [ ] Select enrollment
- [ ] Show all enrollment debits
- [ ] Pay enrollment
- [ ] Get receipt
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
## Grades administration
- [x] List
- [x] Create
- [x] Select
- [x] Update
- [ ] Remove
## Users administration
- [x] List
- [x] Create
- [x] Select
- [x] Update
- [ ] Remove
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