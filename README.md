# seba-backend
> basic info
  "name": "golocal-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  
> API is running in port 3000 (default) 

## API routes

**authRoute: /auth**

+ router.post('/login', AuthController.login);

+ router.post('/register', AuthController.register);

+ router.get('/logout', middlewares.checkAuthentication, AuthController.logout);



**toursRoute: /tours**

+ router.post('/search', TourController.search);

+ router.get('/', TourController.list); // List all tours

+ router.post('/:user_id', TourController.create); // Create a new tour by guide's id

+ router.put('/:tour_id',  TourController.update); // Update a tour by Id  

+ router.delete('/:tour_id',  TourController.remove); // Delete a tour by Id 


**bookingRoute: /booking**

+ router.get('/:tour_id', BookController.load); // Ahow a tour detail

+ router.post('/:tour_id', BookController.book); // Create a booking based on a tour id 

**blogRoute: /blog**
+ router.post('/:username', BlogController.create); // Create a blog under guide's username

+ router.get('/:username', BlogController.list); // List all blogs 
<br/>
<br/>

## Creating/Updating POST methods:
### Please FIRST read the corresponding code from controllers folder BEFORE posting.

### Request JSON examples (using Postman to post request)
#### 1. create a tour (router.post('/:user_id', TourController.create))
##### POST http://localhost:3000/tours/5f0828638684b26dbfe747ff
```
{"title": "Munich English Garden",
"city": "Munich",
"country":"Germany",
"lat": 48.1642,
"lon": 11.6056,
"description":"The English Garden (Englischer Garten) lies in the midst of bustling Munich and is one of the largest city parks in Europe",
"dates":["2020-08-21","2020-08-22","2020-08-23"],
"schedules":[{"hours":10,"minutes":0},{"hours":18,"minutes":0}],
"price":10,
"preference":"nature",
"duration": 2,
"max_participants": 4,
"imgPath": "/Users/liu0001q/webeng/golocal/seba-backend/image/englischer-garten-schwabing.jpg"
}
```
Logic for writing a Tour into database using req:
```
let booking_dates_seats=[];
        for (let date of dates) { //date is one date e.g."2020-08-21"
            new_date = new Date(date);
            // for each date, add the schedules to get a unique date_time e.g. 2020-10-11T10:00:00.000+00:00
            for(let schedule of req.body.schedules){ 
                date_time = add_schedule(new_date,schedule.hours,schedule.minutes);
                new_dates.push(date_time);
            }
        };
        
        for (let booking_d of new_dates) { //booking_d is a date_time
            booking_dates_seats.push({"date":booking_d,"seats":req.body.max_participants}); 
            }
        // booking_dates_seats is a list. each element is a dictionary, with two keys: "date" and "seats". the seats are the available seats.
        // e.g. as the guide created a new tour, seats=req.body.max_participants=4. Later, if user A booked 3 seats, then it changes to seats=1. 
        // once the wish_book_seats > available_seats, it can not be booked. 
        // e.g. If user B want to book 2 seats for the same time block as user A, it should be given a error message.
```



#### 2. create a booking (router.post('/:tour_id', BookingController.create))
##### POST http://localhost:3000/booking/5f0882d518a99d0200a8932b
##### the wishdate should be choosen from given avaiable date_blocks from tour.dates_seats
##### update 7.11: the request of wishdate is not yet implemented. Please see the controllers/booking.js --> book method TODO
```
{
"num_participants":2
}

```
#### 3.create a review (router.post('/:tour_id', ReviewController.create))
##### POST http://localhost:3000/reviews/5f0867ce13535180a0c159c6

```
{
"rating": 4,
"comment": "A Test Review"
}

```

#### 4.create a blog (router.post('/:username', BlogController.create))
##### POST http://localhost:3000/blog/guide_1

```
{"lat":48.1374,
"lon":11.5754,
"city":"Munich",
"title":"Heart of Munich",
"content": "Most large cities have a place where the crowds gather automatically or by arrangement for big events—celebrations, demonstrations, markets and the like. Times Square, Piccadilly Circus, the Zocalo, Red Square, the names are familiar. In Munich, for nearly 900 years, it's been Marienplatz."
}

```







## Install and Configuration

**node dependencies**

```
npm install
```

**Set up your database**

* URI for mongodb-compass: mongodb+srv://golocal:<password>@cluster0-dvenz.mongodb.net/test
* URI for node.js:  mongodb+srv://golocal:<password>@cluster0-dvenz.mongodb.net/<dbname>?retryWrites=true&w=majority
  
substitute <dbname> to golocal-db
and <password>
  
## Start the project



**Development environment**
```bash
npm run devstart
```

**Production environment**
```bash
npm start
```
