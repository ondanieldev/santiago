# :computer: RUNNING
## Frontend
### On development mode
- Run `yarn start`
### On production mode
- Run `yarn build` to generate the build folder
- You may serve the build using `forever`, to do this:
  - Install `forever` globally using `yarn global add forever`
  - Run `forever start -c "serve -s" build`
  - To serve in a specific port, you can run `forever start -c "serve -l PORT -s" build`
- You may also serve using just `serve -s build`
  - However, this way doesn't work when the terminal is closed 
## Backend
### On development mode
- Run `yarn dev:server`
- Make sure your program has an `.env` file inside the main folder
- Make sure your `.env` file follows the same pattern as the `.env.example` file 
### On production mode
- Run `yarn build` to generate the dist folder
- Make sure your program has an `.env` file inside the main folder
- Make sure your `.env` file follows the same pattern as the `.env.example` file
- You may serve the dist using `pm2`, to do this:
  - Install `pm2` globally using `yarn global add pm2`
  - Run `pm2 start ./dist/shared/infra/http/server.js`
  - Make sure to run the command from the backend folder
    - If you run from another folder, the environment variables will not work 

# :blue_book: DESCRIPTION
- A system to control everything that occurs at school
- This description will be more detailed soon

# :closed_book: BACKEND SERVICES
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
  - [ ] CEP before the other address fields
  - [ ] CEP API
  - [ ] Reuse address
  - [ ] React input mask
  - [ ] Civil state with enum
  - [ ] Education level with enum
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
- [ ] Select a payment
- [ ] Receive
## Logout
- [x] Logout