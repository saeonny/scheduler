# Interview Scheduler

## Setup

Install dependencies with `npm install`.



## Running Webpack Development Server with DataBase

SetUp DataBase (psql)
- git clone : https://github.com/saeonny/scheduler-api
- Read and Follow README 

We need 2 different Terminals to run Webpack Development Server with database since Interview Scheduler fetchs data from scheduler-api server

1. data-api server : go to scheduler-api directory and run
```sh
npm start
```
- Make sure that api server working : http://localhost:8001/api/days
- /img url api/
- How to reset Database : http://localhost:8001/api/debug/reset
- error mode: `npm run error`

2. Interview Scheduler : go to scheduler directory and run
```sh
npm start
```




## Features
/img url : interviewer-hompage
### Selecting day
1. [day] We can select day : Monday, Turesday, Wednesday, Thursday, and Friday
2. [remaining spots] each day can show [ ] spots remaining ex. on Monday there are 3 spots that are avilable to book an interview 

### Booking Interview
/ img url : booking - form/
1. we can book/add an interview by clicking ( + ) sign  
2. type student name and select interviewer then click "Save" button to add an interview
3. we can go back by clicking "Cancel" button
4. [Edit] We can edit existing appointment : can change the student's name and re-select the interviewer
5. [Delete] We can Delete an existing appointment 
6. [Handling Errors] : we show the error message ex. if we failed to save or delete or edit then we show the error message /error message url/



## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running cypress
```sh
npm run cypress
```



