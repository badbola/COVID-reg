Creating a RESTful API for corona register with Node.js
This repository have files of project having COVID register.
A doctor can Sign Up and Sign In to register patient and create reports.
Reports can be seen only after login.


Navigation: 

- /doctors/register → with username and password POST
- /doctors/signin → returns the JWT to be used POST
- /patients/register POST
- /patients/:id/create_report POST
- /patients/:id/all_reports → List all the reports of a patient oldest to latest GET
- /reports/:status → List all the reports of all the patients filtered by a specific GET
status


Usage
Check out the branch, git clone it and thereafter run npm install.