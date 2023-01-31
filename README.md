
<!-- create .env and add  -->
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=12345
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=task

SWAGGER_USER=admin
SWAGGER_PASSWORD=admin123

#SERVER
PORT=5001
NODE_ENV=test
LOGGER=["error","warn","debug","log"]
#JWT tokeen has not implemented
#JWT CONFIG
JWT_SECRET=notimplementyet
JWT_EXPIRATION=36000000000000000

<!-- //-------------------------------------- -->

$ npm install
$ npm run start:dev

<!-- Run Migration -->
to create tables use powershell
npm run migration:generate Test123
npm run migration:run

To get api list please run Swagger below api(just hit the link on local browser)
http://localhost:5001/documentation/
USER=admin
PASSWORD=admin123

Use this apis:-
1./user/add-user - to add user use this api

2./product/create-product - to create products(this are dummy product)
    in param there is three type - > 
    skin = 1,
    spray = 2,
    emote = 3,

3./battle-pass/add-battlepass - to add battle pass

4./battle-pass/add-battlepass-details - to add battle-pass-detail
    battle pass id you will get from battle-pass table
    free rewards and paid rewards products should be added through (/product/create-product) get id from product table
    xp - add xp required to complete the level of that pass

5./activity/add-activity    
    get product-id from product table

6./user/activity -this to add user activity this will stimulate as user completing a task(like liking a product)    
     get product-id from product table that you have also used for creating add-activity

7./user/user-activity to all the user activity

8./user/user-activity-status to get battle pass status and all the activities completed

9./user/activity - to emulate paid battle pass
    pass product id -pass battle-pass id as product id
    ActivitesType - 5 (boughtPass = 5 is the enum for that please pass 5)



