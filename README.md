# Backend Challenge

```
ISSUE 01

The Artificial Intelligence team has detected a large correlation between consumed medications and breast cancer.
They've requested a new endpoint that'll allow them to query explorations based on the consumed medications that were reported in the survey.

REQUIREMENTS

* Time based filtering, the team only wants to query a specific time frame at a time.
* Clinic filtering, the team only wants to query a specific clinic at a time.
* Filter by consumed medications STRICT MODE, the team wants to find out which explorations match ALL of the medications specified.
* Filter by consumed medications LAX MODE, the team wants to find out which explorations match ANY of the medications specified.
```

## Solution

This is my solution to resolve the backend challenge.

## Running API

Enter in the root directory and run:
```bash
$ npm install && npm start
```

## Testing API

You need to have the packages installed and then run:

```bash
$ npm test
```

## Documentation - Avaliable endpoints

You can generate the documentation each time you modified the endpoints, you just need to run:

```bash
$ npm run doc
```

You can find the documentation in the url /[doc](http://localhost:3000/doc) when the API is running in local.