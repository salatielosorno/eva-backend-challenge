# Eva Backend Jr Challenge

Imagine it's your first day at Eva and you are fresh out of the onboarding process.
You've been assigned to the Backend team that'll support the exploration experience at our Popup Clinics in commercial centers.

Women book explorations through our [website](https://evatech.co/).
On the date of their exploration women visit the clinic, answer some questions about their health, and are scanned by our thermal cameras.
We recommend you watch this [video](https://www.facebook.com/evatech.co/videos/2396208054034326/) for more context on the experience.

Back to work, you log into the issue tracker and find that you've already been assigned two tickets:

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

```
ISSUE 02

The staff that manages bookings has seen a large number of bookings with the same email but different user names.
It turns out that some users are making bookings on behalf of their friends.
They need your help to identify the bookings affected by this problem.

REQUIREMENTS

* Time based filtering, the team only wants to query a specific time frame at a time.
* Clinic filtering, the team only wants to query a specific clinic at a time.
* The server should respond with all bookings affected by the problem.
```

## Your mission, should you choose to accept it:

- Clone this repo and create a repo of your own. (DO NOT FORK THIS REPO)
- Seed a database of your choice with the provided bookings and explorations.
- Implement an API (REST or GRAPHQL) with a framework of your choice that implements the required endpoints.
- Your api endpoints should be documented.
- Your api endpoints should be tested.
- Your api endpoints should not be public (Authentication).
- The bookings staff should not be able to access the AI endpoint and the AI team should not be able to access the bookings edpoint (Roles/Authorization).
- It should be easy for your teammates to understand your repo and use your code in the unfortunate case of your sudden combustion.
