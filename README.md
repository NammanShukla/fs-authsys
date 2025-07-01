# fs-authsys
## a full stack user authentication system with react, mongo and express. 

### client side logic
- Home page, will direct the user to the login or the register page 
- Login can redirect to register and vice versa 
- once logged in, the user can logout which will land at the home page 
- both forms will have validation 


### server side logic 
- connect to mongodb atlas using mongoose 
- uses sessions via express-session with a key and stores sessiosn in the db 
- using passport-local strat: <br>
    -finds user by username <br>
    -compares bcrypt pass <br>
    -serializes user ID into session, for example : <br>
    >_id <br>
    "wcKovOeYEiFa465A8BFxcimUdjBWHeGI" <br>
    expires <br>
    2025-07-02T16:11:03.718+00:00 <br>
    session <br>
    >"{"cookie":{"originalMaxAge":86400000,"expires":"2025-07-02T16:11:02.97…" <br>
    <br>
    -deserializes user with each request 

- registers user by username and password, saves new user to the db 
- authenticates using passport, if valid, stores session and return the logged in data 
- session based auth check, and destroys session and logs the user out. 