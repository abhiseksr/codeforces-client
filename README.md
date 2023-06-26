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

### Login & Register

![Screenshot from 2023-06-19 14-37-33](https://github.com/abhiseksr/codeforces-client/assets/85542595/aad93c30-edf5-4ee6-9567-956f4cb58a3a)

![Screenshot from 2023-06-19 14-42-29](https://github.com/abhiseksr/codeforces-client/assets/85542595/6fab82d9-a54e-4db0-b836-828d4ceb932c)

### Profile

![Screenshot from 2023-06-19 15-24-45](https://github.com/abhiseksr/codeforces-client/assets/85542595/3115e3f4-520c-4c64-b51d-104d6031a126)

![Screenshot from 2023-06-19 15-24-49](https://github.com/abhiseksr/codeforces-client/assets/85542595/74ecb686-8447-443f-a8e0-e69c11eb905e)

![Screenshot from 2023-06-19 15-21-09](https://github.com/abhiseksr/codeforces-client/assets/85542595/6a245249-412a-4b5f-b435-bd3697eb5428)

![Screenshot from 2023-06-19 14-55-47](https://github.com/abhiseksr/codeforces-client/assets/85542595/0def7d99-f684-4d57-ad47-8c2e5e81691b)

![Screenshot from 2023-06-19 14-58-18](https://github.com/abhiseksr/codeforces-client/assets/85542595/30b402e3-6ba2-4730-afdd-5acec134243b)

![Screenshot from 2023-06-19 15-03-20](https://github.com/abhiseksr/codeforces-client/assets/85542595/f4079a54-453d-499c-abb1-f27000025766)

![Screenshot from 2023-06-19 15-08-46](https://github.com/abhiseksr/codeforces-client/assets/85542595/0bfa096f-afc4-451a-964e-041146a03a5b)


### Contest

![Screenshot from 2023-06-19 15-14-25](https://github.com/abhiseksr/codeforces-client/assets/85542595/e3aadd41-50af-4899-8d85-a23fc98a2818)

![Screenshot from 2023-06-19 15-15-01](https://github.com/abhiseksr/codeforces-client/assets/85542595/94bea506-4a40-436b-bfbf-8d4e858e494d)

![Screenshot from 2023-06-19 15-18-33](https://github.com/abhiseksr/codeforces-client/assets/85542595/dc5c65d6-8f2f-4f77-b347-0c5590694394)

![Screenshot from 2023-06-19 15-18-52](https://github.com/abhiseksr/codeforces-client/assets/85542595/a6e32264-aafd-483a-9975-bc3ab4735351)

![Screenshot from 2023-06-19 18-12-14](https://github.com/abhiseksr/codeforces-client/assets/85542595/2277cf70-2d92-445b-bbd9-96f27b642b09)

![Screenshot from 2023-06-19 18-12-26](https://github.com/abhiseksr/codeforces-client/assets/85542595/cdca6951-27fd-447b-8cd3-2c9d9cbc22e9)

![Screenshot from 2023-06-19 18-12-48](https://github.com/abhiseksr/codeforces-client/assets/85542595/3ded22d9-156d-4a96-a581-043199828876)

![Screenshot from 2023-06-19 18-13-08](https://github.com/abhiseksr/codeforces-client/assets/85542595/1c2fc9f1-ff1c-4217-a379-1a37096dc952)

![Screenshot from 2023-06-19 18-16-34](https://github.com/abhiseksr/codeforces-client/assets/85542595/ac112d88-7c41-4129-bebc-7b405cb864d2)

![Screenshot from 2023-06-19 18-17-01](https://github.com/abhiseksr/codeforces-client/assets/85542595/e9ce1966-7e5e-4e9c-a9ad-b4947b28d767)

![Screenshot from 2023-06-19 15-13-13](https://github.com/abhiseksr/codeforces-client/assets/85542595/60032f5e-4dfd-4604-9bec-a2cbdf4f4866)

![Screenshot from 2023-06-19 18-35-16](https://github.com/abhiseksr/codeforces-client/assets/85542595/c9160a62-3064-4a13-94ce-afe12d83f8c8)

![Screenshot from 2023-06-19 18-34-08](https://github.com/abhiseksr/codeforces-client/assets/85542595/373e33c1-14d7-4c33-8602-e0546032a82d)
