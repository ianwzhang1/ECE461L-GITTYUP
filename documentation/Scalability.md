# Scalable Design Implementation
## Database and Backend Scalability
System administrators have access to a wide variety of API endpoints unaccessible to client users that allow for more granular management.

Endpoints can be independently called by administrators to easily:
- Add hardware resources ad hoc
- Get and set descriptions of hardware resources
- Update quantities of hardware resources

Extensible features that are currently supported by backend and can be supported by future UI updates:
- Admin privileges to add and remove members to a project and checkout hardware
- Change project descriptions even after creation of a project

Code quality features:
- Backend supports dynamic mapping of endpoints to functions using Python method reflection, meaning that new backend endpoints can be created by simply adding a function

## User Experience and Interface Scalability
Changing the look of the site:
- Project Overview Style => ProjectView.css
- Backgroud, app, tiling shapes, basic look => App.css
  - For example the drop shadow and border radii are found here
- Hardware sets list look => hwlist.css
- User accounts have "names" which are separate from their username. This name can be used to personalize the user experience. 
- Currently, projects and hardware sets have optional descriptions. This can be improved to be editable in the future.


## Billing Feature Addition
Billing can be easily added with a per project balance counter to keep track of financial transactions
- Each project is associated with its balance counter
- Each hardware set has its own billing cost
- The counter serves as a running total so that hardware fees are paid back

Updates to hardware checkout:
- When a user checkouts a hardware set for a project, the system attaches a timestamp attribute to the Neo4J graph relationship/edge from project to the hardware set
- When the hardware set is returned, the current time is subtracted from the checkout time, multiplied by the quantity, and multiplied by the billing cost rate (in $ per day*counts). 
  - For example, if two Ipads are checked out for 2 days and Ipad checkouts cost $10/(day times units), then the prices at return added to the balance counter is $40
- If balance counters pass a certain predetermined threshold, new checkouts won't be processed until the old balances are paid.

Payment API integration
- The system can use a payment API by an internal payment provider or a third party provider such as Stripe or Paypal. 
- Due to the idea of 3rd party microservices, this payment API would support various payment methods to ensure flexibility for stakeholders.
- Transaction histories can be maintained in order to provide users and administrators with a comprehensive overview of activity.