## Clinical Report App - Web 

### Team Aperture
- Sungkar Bolat
- Darshan Golchha
- Johanes Dharmawan Wihardjo
- Gleb Zhynko
- Asma Sulieman
- Rohan Vuppalapati

### Repo Link:
https://github.com/regenmed-aperture/crf-app-web

### Set-up steps:
Two main ways: using the web link https://crf-app-web.pages.dev or running locally with Node.js
https://crf-app-web.pages.dev/dbg/build-link will lead to a dev page that allows us to make unique links that patients can use to access the survey.
https://crf-app-web.pages.dev/?id=eyJvYnNlcnZhdGlvblByb3RvY29sU3VydmV5SWQiOiI5NzciLCJjYXNlSWQiOiIxNjYxIiwic3VydmV5SWQiOiI0MzYiLCJsYW5ndWFnZUlkIjoiMSJ9 is one of the links we generate that will lead you to the survey.

### How the code works:
Accessing the link leads users to a React and Type-script front-end, where the patients can fill in the form and read statistics. Finishing the survey sends the data through the backend and records the answers.

### What works & What doesn't:
The survey is able to locally store the patient's answers if they were not finished, and we were able to observe that the survey completion is properly sent and recorded on the operator's side. The UI works as expected.

### What would we work on next:
Better integration with Regenmed's backend.
