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
