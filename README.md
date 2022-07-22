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
 !["screenshot api-server/days"](https://github.com/saeonny/scheduler/blob/master/docs/scheduler-api.png)
- /img url api/
- How to reset Database : http://localhost:8001/api/debug/reset
- error mode: `npm run error`

2. Interview Scheduler : go to scheduler directory and run
```sh
npm start
```




## Features
!["screenshot mainpage"](https://github.com/saeonny/scheduler/blob/master/docs/shceduler-hompage.png)
### Selecting day
1. [day] We can select day : Monday, Turesday, Wednesday, Thursday, and Friday
2. [remaining spots] each day can show [ ] spots remaining ex. on Monday there are 3 spots that are avilable to book an interview 

### Booking Interview
!["screenshot booking an appointment"](https://github.com/saeonny/scheduler/blob/master/docs/scheduler-appointment-form.png)
1. we can book/add an interview by clicking ( + ) sign  

!["screenshot booking an appointment Form"](https://github.com/saeonny/scheduler/blob/master/docs/scheduler-appointment-form.png)
2. type student name: Saeonny and select interviewer then click "Save" button to add an interview
3. we can go back by clicking "Cancel" button
!["screenshot after booking an appointment"](https://github.com/saeonny/scheduler/blob/master/docs/scheduler-after%20save.png)



!["screenshot existing appointment hover"](https://github.com/saeonny/scheduler/blob/master/docs/scheduler-appointment-hover.png)
4. [Edit] We can edit existing appointment : can change the student's name and re-select the interviewer
5. [Delete] We can Delete an existing appointment 

!["screenshot existing appointment hover"](https://github.com/saeonny/scheduler/blob/master/docs/scheduler-appointment-error.png)
6. [Handling Errors] : we show the error message if we failed to save or delete or edit an appointment then we show the error page with appropriate message



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



