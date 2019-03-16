## How to run it

Start the app the following way

- Start the mongoDB with `docker-compose up` in the backend folder
- Initialize DB with `POST /initialize` (by default it should be listening on localhost:3000)
- Start backend with `yarn start` in the backend folder
- Start frontend with `yarn start` in the frontend folder

Some extra APIs on the backend:

- `GET /`: lists all the seats with their status
- `DELETE /`: deletes all the seats (use it before initialize)
- `POST /initialize`: generates new seats with random prices

## Features

You can select a seat and it shows blocked for everyone else.
You can change the selected seat, which unblocks the previous one.

## Things I did not do

Even though I would have loved to, I didn't really focus on areas where I could display my skills the most because it's harder to build a frontend with a great UX if it relies on a backend that does not exists. But I am quite happy about the result, given the fact that some of the technologies I just used were completely new to me.

What I didn't had time for:

- Any sort of tests
- Unblocking the reservation after 3 minutes
- Actually checking in
- Double bookings might be possible (the frontend does not wait for confirmation from the backend)

## Commits

You asked me to commit often, which I did not do cause things were quite messy and experimental. But here's how it happened:

- 1st hour: Panic, google how the heck does mongoDB work (never used it before) and what is mongoose
- 2nd hour: Have a basic model in mongoDB which can be initialized and reset through REST API
- 3rd hour: Google how socket.io works (tried it once years ago), do some implementation that might even work, start frontend implementation
- 4th hour: Wondering why does it give a CORS error if both is on localhost?
- 5th hour: Yey, some very basic things finally start to work. Implementing most of the stuff on frontend.
- 6th hour: Making things actually work, add CSS
- Over time: Fixing some errors
