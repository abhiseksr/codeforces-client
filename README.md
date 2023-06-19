# codeforces-client
Competitive programming website 

## Introduction

Recreated the functionality and design of the original codeforces, a competitive programming platform.

- Replaced server-side routing with client-side routing using React Router, resulting in improved response time, reduced payloads size and minimized server requests.
- JWT authentication. Password recovery using gmail authentication(nodemailer). Ensured secured password storing by hashing passwords using bcrypt.
- Different account types(organizer and contestant) with distinct privileges. Organisers can host contests, while contestants can participate in contests. Both of them can practice problems from the problemset built from contest problems.
- ICPC rule-based ranking system for fair competition.
- Online status tracking of users. Ability to view and make friends. Add problem to favourites.
- Discussion forums and upvoting. Messaging feature using regular HTTP with message notifications.
- Integration of Monaco code editor and online judge API supporting multiple programming languages.
- Conducted comprehensive API testing using Postman. Error handling, flashed messages - success and error messages between routes.

## Setup

1. To run the project on local machine, clone codeforces-client and codeforces-server repositeries.
2. In the src directory of codeforces-client where index.js located issue the following commands - npm install, npm start
3. In the outermost directory of codeforces-server where index.js located issue the following commands - npm install, nodemon index.js
4. Server is serving on port number 4000.
5. Client is running on port number 3000. Open the url http://localhost:3000 in your web browser.
6. Following are some of the snapshots of the project - 

## Snapshots

