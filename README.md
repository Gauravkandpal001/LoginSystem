 User Login System

001 MongoDB Install Setup

    $ mongo
    > use nodeauth
    > db.createCollection('users');
    > show collections
    > show dbs

    > db.users.insert({name:"Brad Traversy",email:"brad@techguywebsolutions.com", username:"devuser1",password:"1234"});
    > db.users.insert({name:"John Doe",email:"john@techguywebsolutions.com", username:"devuser2",password:"1234"});
    > db.users.find();
    > db.users.find().pretty();

    > db.users.update({username:"devuser1"},{$set:{email:"devuser1@gmail.com"}});


002 Application Middleware Setup

    $ mikdir -p nodeauth
    $ cd nodeauth
    $ npm install --save mongodb
    $ npm install --save mongoose
    $ npm install --save connect-flash
    $ npm install --save express-validator
    $ npm install --save express-session
    $ npm install --save express-messages
    $ npm install --save passport
    $ npm install --save passport-local
    $ npm install --save passport-http
    $ npm install --save multer@0.1.8
    $ npm install

    $ npm start


003 Views  Layouts Part A  

004 Views and Layouts Part B  

005 User Registration PART-A

006 User Registration PART-B

    $ mongo
    > use nodeauth
    > db.users.find().pretty();
    > db.users.remove({})

007 Password Encryption with Bcrypt

Installation componetns for windows (Open SSL)

    $ npm install --save node-gyp
    $ npm install --save bcrypt

008 User Authentication with Passport

009 Logout Access Control Part A

010 Logout  Access Control Part B


<br/>
