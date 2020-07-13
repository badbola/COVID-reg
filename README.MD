Creating a RESTful API for corona register with Node.js
This repository have files of project having COVID register.
A doctor can Sign Up and Sign In to register patient and create reports.
Reports can be seen only after login.


Navigation: 

- /doctors/register → with username and password
- /doctors/login → returns the JWT to be used
- /patients/register
- /patients/:id/create_report
- /patients/:id/all_reports → List all the reports of a patient oldest to latest
- /reports/:status → List all the reports of all the patients filtered by a specific
status


Usage
Check out the branch, git clone it and thereafter run npm install.