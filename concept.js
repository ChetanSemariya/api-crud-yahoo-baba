/*

API DEVELOPMENT :- It provide an interface between frontend or android device with the database.

Read   :- app.get('/profile', (req, res) => {})
create :- app.post('/profile', (req, res) => {})
update :- app.put('/profile', (req, res) => {})
delete :- app.delete('/profile', (req, res) => {})

Note:- Api mai data ko show krne ke liye humare pass response ka ek method aata hai res.json()


// ---------------------- How to use API in Frontend ---------------------- //

1). Javascript Fetch Method
2). Jquery $.Ajax() method
3). ReactJs
4). AngularJs
5). VueJs
6). Axiom

// ------------------------ CORS Package --------------------- //

Note :- Now let suppose humare backend ki api www.test.com pr bani hui hai and hum chahte hai ki humara jo frontend hai vo xyz.com pr hai to humare backend ki api ko xyz.com se access karne ke liye hume cors package ki jarurat hoti hai.

CORS :- Cross Origin Resource Sharing
CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
// CORS is a security feature implemented by web browsers to prevent malicious websites from making requests to a different domain than the one that served the original web page.
=> Now let suppose humare pass multiple servers hai and hum chahte hai ki koi specific server hi humare backend ki api ko access kar sake to uske liye hum cors package ka use karte hai.

************** Steps to working with CORS **************

1). Install CORS package
2). const cors = require('cors');
3). app.use(cors()); // use cors as a middleware

***************** How to enable cors for a single route ********

app.get('/profile', cors(), (req, res) => {}); // only isi route ka access hai dusre server ko


******************** How to allow access to specific Origin ***************

Note:- Isme sare parameters optionals hote hai

const corsOptions = {
  origin: 'http://example.com', // kis origin ko allow krna chahte hai hum
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // only authorize user hi access krskta haii
  optionsSuccessStatus: 200 // here 200 is the default status code
};

app.use(cors(corsOptions)); // use cors as a middleware


************************ Or we can also write like this ***********************

const corsOptions = {
    origin: 'http://example.com',
    origin: ['http://example.com','http://example1.com','http://example2.com'], // for allowing multiple origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}

******** -------------------------- JWT AUTHENTICATION -------------------------- ***********

NOTE :- Session mai and jwt mai difference yhh hai ki session ko hum server pr save krte hai and jwt ko hum client pr save krte hai.
2). session page refresh hone pr expire ho jata hai and jwt page refresh hone pr expire nahi hota hai qk vo client ke localhost pr work krta hai

// --------- How to work with Json web Token -------------- //

1). npm install jsonwebtoken
2). const jwt = require('jsonwebtoken');
3). const SECRET_KEY = 'Chetan@1234';
4). Generate JWT Token :- Token generate krne ke liye hume sign name ke method ka use krna hota hai.Iss token ko hum kahi bhi save krskte hai jaise ki local storage, session storage, cookies etc.

const token = jwt.sign({ key: value }, SECRET_KEY, { expiresIn: '1h' });
const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

************** Verify JWT Token ***************

jwt.verify(token, SECRET_KEY)

************ JWT AUTHENTICATION WITH FETCH METHOD ***************

NOTE:- Token save in local storage

Step-1 :- Store in localStorage

localStorage.setItem(key, value); // localstorage browser ka inbuilt storage system hota hai

Step-2 :- Read from localStorage

localStorage.getItem(key)

Step-3 :- Remove from localStorage

localStorage.removeItem(key) // for remove specific key
localStorage.clear() // remove all the data from localStorage

// ************* Fetch Method ************** //

fetch(file/URL, {
  method:"POST",
  body: data // data should be form-data/Json Data/Text
  header: {
    'Content-Type':'application/json', // agr data hum json mai bhej rahe hai tab
    'Content-Type':'application/x-www-form-urlencoded', // agr data hum form data se bhej rahe hai tab,
    'Authorization' : `Bearer ${token}`,
  },
});


// ****************** API Security ****************** //

Note:- API ko hacking se bachane se hum kuch techniques ka use krte hai 

1). Form validation (express-validator)
2). CSRF Token (csurf)
3). Password Hashing (Bcrypt)
4). JWT Authentication (jsonwebtoken)
5). Rate Limiting
6). Helmet

***************************** HACKING ATTACKS ******************************

BRUTE FORCE ATTACKS :- Isme hacker ke pass large number of data hota hai and vo baar baar login ka attempt krta hai alag-alag credentials se jisse humare server down hojaata haii.

DDos Attack :- ISS attack mai hacker website ke kisi bhi page pr baar baar request krta hai jisse server crash hojata hai because server request handle nahi krpaata hai

SOLUTION :- Rate Limiting iski help se hum kisi bhi system se rate limit laga skte hai with the help of IP address i.e ki iss ip address se only itni request hi valid hai and agar isse jyada hoto vo page dikhna band hojaaye and website hi open na ho

iske liye humare pass expressjs mai ek package aata hai express-rate-limit iski help se hum time or request bhi set krskte hai and agar usse jyada request aati hai to server uss ip address ko block krdeta hai

1). express-rate-limit
2). express-slow-down => same work as rate limit but the difference is that agar rate limit jo bhi humne set kari hai usse jyada hai to yhh baki ki request ko block nahi krta hai usee queue mai daal deta hai i.e jese hi aaage hi req process ho uske baad hi queue vali req run ho


***************** Steps to working with Rate Limiting *********************

1). npm install express-rate-limit
2). const rateLimit = require("express-rate-limit")
3). const limiter = rateLimit({
      windowMs: 15 * 60 * 1000 // yaha pr hum time set krte hai (15 min)
      max: 100, (kitni max request hum set krna chahte hai and agar isse jyada req aaye to webpage show hona band hojaaye)
      message: "Too many requests form this IP, please try again later"
})

4). use rate limit as a middleware

app.use(limiter)

// ----------------- HACKING TECHNIQUES -------------------- //

1). Cross-Site-Scripting(XSS) =  humare website ki css ya script ko hacker utha kr kahi or multiple jagah rakh dete hai jisse uss server pr load padta hai and server down hojaata hai
2). Clickjacking = Isme hacker humare website ka koi page iframe ke andar khol lete hai and javascript ke code ki help se multiple click karate hai isi ko kahte hai clickJacking
3). MIME-sniffing attacks :- Isme hacker humare response ke sath malfunctioning krta hai
4). Information disclosure :- Isme hacker yhh pata krskta hai ki humari website kis technology mai bani hai

Note :- Agar hum insbhi attacks se bachna chahte hai to uske liye humare pass security headers aate hai jisse hum humari website ko prevent krskte hai. Iske liye humare pass Express js mai ek package bhi aata hai jo bydefault sabhi security headers ko enable krdeta hai and disable bhi krskta hai

SECURITY HEADERS :- 

!). Content-Security-Policy
2). Cross-Origin-Embedder-Policy
3). Cross-Origin-Opener-Policy
4). Cross-Origin-Resource-Policy
5). Origin-Agent-Cluster
6). Referrer-Policy
7). Strict-Transport-Security
8). X-Content-Type-Options
9). X-DNS-Prefetch-Control
10). X-Download-Options
11). X-Frame-Options
12). X-Permitted-Cross-Domain-Policies
13). X-Powered-By
14). X-XSS-Protection

// *********************** STEPS to WORKING WITH Helmet Package ******************** //

**** Helmet ka use only server side pr hi krna chahiye i.e in production bcz localsystem mai testing ke time problem aaskti hai

1). npm install helmet
2). const helmet = require("helmet");
3). app.use(helmet()); // sabhi security headers enable hojayenge

Note:- Agar hum kuch security headers ko band krna chahte hai to usee kuch iss tarah se krskte hai

app.use(
    helmet({
      contentSecurityPolicy:false,
      xDownloadOptions:false
    })
)

*/