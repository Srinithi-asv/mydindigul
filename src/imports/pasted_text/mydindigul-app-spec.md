Design and build a complete, production-ready responsive web application called "MyDindigul".

IMPORTANT:
This is NOT only a landing page.
Create the complete platform with ALL public pages, authentication screens, User Panel, Vendor Panel, Admin Panel, dashboards, CRUD screens, forms, tables, details pages, modals, empty states, loading states, error states, confirmation dialogs, plan restrictions, and navigation flows described below.

Do not omit any module.
Do not create only static landing pages.
Every major button, card, navigation item, CTA, table row action, filter, form, and menu should have a corresponding screen/state in the Figma prototype.

The product is a local business discovery and business-management platform for Dindigul.

==================================================
1. DESIGN DIRECTION
==================================================

Create a modern, professional, trustworthy local-business marketplace UI.

Visual style:
- Modern SaaS + local marketplace design
- Clean and premium
- Friendly but professional
- Spacious layouts
- Strong visual hierarchy
- Rounded cards
- Subtle shadows
- High-quality business photography
- Consistent iconography
- Accessible contrast
- Responsive layouts
- Mobile-first behavior
- Desktop dashboard layouts
- Tablet layouts
- Mobile layouts

Brand:
- Product name: MyDindigul
- Use a recognizable local-business/community identity
- Use a clean logo area
- Use a consistent primary brand color
- Use neutral backgrounds for dashboards
- Use status colors for success, warning, error and locked states
- Use professional typography

Create a reusable design system:
- Colors
- Typography
- Buttons
- Inputs
- Selects
- Search bars
- Dropdowns
- Tabs
- Cards
- Badges
- Tables
- Pagination
- Modals
- Drawers
- Toast notifications
- Alerts
- Breadcrumbs
- Avatars
- Tooltips
- Empty states
- Loading skeletons
- Error states
- Confirmation dialogs
- File/image upload components
- Charts
- Stat cards

==================================================
2. GLOBAL NAVIGATION
==================================================

Create separate navigation experiences for:

A. Public / Guest
B. Logged-in User
C. Vendor
D. Admin

Public header:
- MyDindigul logo
- Home
- Services
- Products
- Jobs
- Tourism
- Search
- Login
- Register
- Business Registration / List Your Business
- Responsive mobile hamburger menu

Footer:
- MyDindigul logo
- About
- Services
- Products
- Jobs
- Tourism
- Business Registration
- Login
- Privacy
- Terms
- Contact
- Copyright

==================================================
3. PUBLIC / GUEST WEBSITE
==================================================

Create all public pages.

--------------------------------------------------
3.1 HOME PAGE
--------------------------------------------------

Route:
/

Create:

Header:
- Logo
- Navigation
- Search
- Login
- Register
- Business Registration

Hero section:
- Large headline introducing MyDindigul
- Supporting text
- Large unified search bar
- Search input
- Category/type selector
- Location selector
- Search button

Popular Brands section:
- Business logo cards
- Business names
- Industry/category
- Location
- View Business CTA

Category shortcuts:
- Services
- Products
- Jobs
- Tourism
- Local businesses
- Industry categories

Featured businesses:
- Business cards
- Image
- Business name
- Category
- Location
- Rating/display area
- View Profile
- Wishlist/favourite

Popular services:
- Service cards
- Service image
- Service title
- Vendor
- Location
- CTA

Popular products:
- Product cards
- Product image
- Product name
- Vendor
- Price/details
- CTA

Jobs section:
- Job cards
- Job title
- Company
- Location
- Employment type
- View Job

Tourism section:
- Tourism cards
- Place image
- Place name
- Location
- Short description
- View Place

Business CTA:
"List Your Business"
- Explain benefits
- CTA to business registration

Footer.

--------------------------------------------------
3.2 SERVICES LISTING
--------------------------------------------------

Route:
/services

Create a full services discovery page.

Features:
- Page title
- Search services
- Industry filter
- Category filter
- Location filter
- Sort
- Pagination
- 20 items per page
- Service cards/list
- Vendor information
- Service image/banner
- Service title
- Description
- Location
- View service/vendor CTA
- Wishlist button

States:
- Loading
- Empty
- No results
- Error
- Pagination
- Filter applied

--------------------------------------------------
3.3 PRODUCTS LISTING
--------------------------------------------------

Route:
/products

Create:
- Product search
- Category filter
- Industry filter
- Location/vendor filter
- Sort
- Product cards
- Product image
- Product name
- Vendor
- Details
- View Product
- Wishlist
- Pagination

Create:
- Product detail page
- Product image gallery
- Product information
- Vendor information
- Contact/enquiry CTA
- Related products

--------------------------------------------------
3.4 JOBS LISTING
--------------------------------------------------

Route:
/jobs

Create a public job board.

Features:
- Search jobs
- Job title
- Company
- Location
- Industry
- Job type
- Filters
- Sort
- Pagination

Job card:
- Job title
- Company
- Location
- Job type
- Posted date
- Short description
- Apply button
- View details

Job detail page:
- Job title
- Company
- Location
- Job type
- Description
- Requirements
- Responsibilities
- Application CTA
- Related jobs

Application flow:
- Login/register requirement if needed
- Application form
- Applicant details
- Resume/file upload
- Submit application
- Success state

--------------------------------------------------
3.5 TOURISM LISTING
--------------------------------------------------

Route:
/tourism

Create:
- Tourism hero
- Search
- Tourism category filters
- Location
- Featured destinations
- Tourism cards
- Place images
- Place name
- Location
- Description
- View Place

Tourism detail page:
- Large hero image
- Image gallery
- Place name
- Location
- Description
- Highlights
- Related places
- Contact/information section

--------------------------------------------------
3.6 VENDOR PUBLIC STOREFRONT
--------------------------------------------------

Route:
/@profile-slug
or
/:username

Create a public business profile.

Header:
- Business logo
- Business name
- Verification/status badge if applicable
- Category
- Location
- Contact CTA
- Wishlist

Sections:
- Cover image
- About Us
- Company information
- Address
- Map/location
- Services
- Products
- Industry-specific catalogue
- Offers
- Jobs
- Events
- Terms & Policies
- Contact/enquiry CTA

Create different visual states for:
- Free Listing vendor
- Premium vendor
- Empty catalogue
- No services
- No products
- No offers
- No jobs
- No events

==================================================
4. AUTHENTICATION
==================================================

--------------------------------------------------
4.1 LOGIN
--------------------------------------------------

Route:
/login

Single unified login for:
- User
- Vendor

Fields:
- Phone/email
- Password
- Remember me
- Login
- Forgot password
- Register
- Business registration

States:
- Invalid credentials
- Validation errors
- Loading
- Success
- Account blocked
- Account inactive

--------------------------------------------------
4.2 USER REGISTRATION
--------------------------------------------------

Route:
/register

Fields:
- Name
- Phone
- Email
- Password
- Confirm password

Phone OTP verification:
- Enter OTP
- Resend OTP
- Timer
- Verify
- Incorrect OTP
- Expired OTP
- Successful verification

Success:
"Account created successfully"

--------------------------------------------------
4.3 BUSINESS REGISTRATION
--------------------------------------------------

Route:
/businessregister

Create vendor onboarding.

Fields:
- Business name
- Owner name
- Phone
- Email
- Password
- Business category
- Industry
- Sub-industry
- Address
- City
- Location
- Business description
- Logo upload
- Cover image
- Other business details

Include:
- Validation
- Upload states
- Registration success
- Registration pending/review state
- Registration error

--------------------------------------------------
4.4 FORGOT PASSWORD
--------------------------------------------------

Create:
- Forgot password screen
- Email reset option
- Phone OTP reset option
- OTP verification
- New password
- Confirm password
- Password success
- Expired link
- Invalid OTP
- Error states

==================================================
5. USER PANEL
==================================================

Route:
/user/*

Create a complete logged-in customer dashboard.

User sidebar:
- Dashboard
- Enquiries
- Orders
- Jobs Applied
- Events Booked
- Wishlist
- Profile
- Reset Password
- Logout

--------------------------------------------------
5.1 USER DASHBOARD
--------------------------------------------------

Route:
/user/dashboard

Create summary cards:
- Total Enquiries
- Total Orders
- Jobs Applied
- Events Booked
- Wishlist items

Create:
- Recent enquiries
- Recent orders
- Recent job applications
- Upcoming booked events
- Saved businesses
- Quick actions

--------------------------------------------------
5.2 USER ENQUIRIES
--------------------------------------------------

Route:
/user/enquiries

Create:
- Enquiry list
- Vendor
- Service/product
- Date
- Status
- Message
- View details

Statuses:
- New
- Pending
- Responded
- Closed

Enquiry detail page/modal:
- Vendor
- User
- Enquiry content
- Date
- Status

--------------------------------------------------
5.3 USER ORDERS
--------------------------------------------------

Route:
/user/orders

Create:
- Order history
- Order ID
- Vendor
- Date
- Items
- Amount
- Status
- View order

Order detail:
- Vendor
- Customer
- Items
- Quantity
- Price
- Total
- Status
- Order timeline

--------------------------------------------------
5.4 JOBS APPLIED
--------------------------------------------------

Route:
/user/jobs

Create:
- Applied jobs list
- Job title
- Company
- Application date
- Status
- View application

Statuses:
- Applied
- Reviewing
- Shortlisted
- Rejected
- Selected

Application detail.

--------------------------------------------------
5.5 EVENTS BOOKED
--------------------------------------------------

Route:
/user/events

Create:
- Booked events
- Event name
- Vendor
- Date
- Location
- Booking status
- View booking

Event booking detail:
- Event information
- Booking information
- User information
- Status

--------------------------------------------------
5.6 WISHLIST
--------------------------------------------------

Route:
/user/wishlist

Create:
- Saved vendor listings
- Saved services/products
- Favourite toggle
- Remove from wishlist
- Empty wishlist state

--------------------------------------------------
5.7 USER PROFILE
--------------------------------------------------

Route:
/user/profile

Fields:
- Name
- Email
- Phone
- Avatar

Actions:
- Edit profile
- Save changes
- Upload avatar
- Remove avatar

Create validation and success/error states.

--------------------------------------------------
5.8 RESET PASSWORD
--------------------------------------------------

Route:
/user/reset-password

Fields:
- Current password
- New password
- Confirm password

Create:
- Validation
- Success
- Error

--------------------------------------------------
5.9 VISITOR IDENTITY CAPTURE
--------------------------------------------------

When a logged-in user views a vendor storefront, the system should capture visitor identity.

Represent the UX appropriately:
- Logged-in visitor state
- Vendor can see visitor information through leads/analytics
- Privacy-conscious visitor activity state

==================================================
6. VENDOR PANEL
==================================================

Route:
/vendor/*

Create a professional business management dashboard.

Vendor sidebar:
- Dashboard
- Company Info
- CMS
- Services
- Products
- Industry Catalogue
- Orders
- Customers
- Leads
- Jobs
- Events
- Offers
- Visitor Analytics
- Settings
- Logout

The sidebar must dynamically show/hide or lock modules according to the vendor's plan.

--------------------------------------------------
6.1 VENDOR DASHBOARD
--------------------------------------------------

Route:
/vendor/dashboard

Top banner:
- Current plan
- Plan status
- Expiry date
- Upgrade CTA

Stat cards:
- Services
- Products
- Orders
- Customers
- Leads
- Jobs
- Events
- Offers
- Visitors

Dashboard sections:
- Recent leads
- Recent orders
- Recent customers
- Job applications
- Upcoming events
- Recent visitors
- Quick actions

--------------------------------------------------
6.2 COMPANY INFO
--------------------------------------------------

Route:
/vendor/company-info

Business profile fields:
- Company/business name
- Logo
- Cover image
- Owner/business contact
- Phone
- Email
- Address
- City
- Map location
- Industry
- Sub-industry
- Description

Create:
- Edit mode
- Save
- Cancel
- Validation
- Success/error state

--------------------------------------------------
6.3 CMS
--------------------------------------------------

Route:
/vendor/cms

Create CMS screens:

About Us:
- Rich text editor
- Image upload
- Preview
- Save

Terms & Policies:
- Rich text editor
- Save
- Preview

Create:
- Empty state
- Edit state
- Saved state

--------------------------------------------------
6.4 SERVICES
--------------------------------------------------

Route:
/vendor/services

Create:
- Service list
- Add Service
- Edit Service
- View Service

Service form:
- Service name
- Category
- Description
- Banner/image
- Pricing/details
- Status
- Save

Service list:
- Search
- Filter
- Status
- Edit
- Delete
- View

--------------------------------------------------
6.5 PRODUCTS
--------------------------------------------------

Route:
/vendor/products

Create:
- Product list
- Add product
- Edit product
- Product detail

Product form:
- Product name
- Category
- Description
- Images
- Price/details
- Availability/status
- Save

Product list:
- Search
- Filter
- Edit
- Delete
- View

--------------------------------------------------
6.6 INDUSTRY-SPECIFIC CATALOGUES
--------------------------------------------------

Create a dynamic catalogue module.

The catalogue displayed depends on the vendor's selected industry.

Create:
- Industry selection
- Sub-industry
- Catalogue dashboard
- Add item
- Edit item
- List items
- Detail page
- Image upload
- Category fields
- Industry-specific fields

Make the interface flexible so different industries can have different catalogue fields.

Examples of dynamic fields:
- Name
- Description
- Images
- Category
- Price
- Specifications
- Availability
- Custom industry attributes

Do NOT hard-code only one industry.

--------------------------------------------------
6.7 ORDERS
--------------------------------------------------

Route:
/vendor/orders

Premium feature.

Create:
- Incoming orders
- Order ID
- Customer
- Date
- Amount
- Status
- View order

Order detail:
- Customer information
- Items
- Quantity
- Price
- Total
- Order timeline
- Status management

Statuses:
- New
- Confirmed
- Processing
- Completed
- Cancelled

For Free plan:
Show locked/upgrade state explaining that Orders require Premium.

--------------------------------------------------
6.8 CUSTOMERS
--------------------------------------------------

Route:
/vendor/customers

Create:
- Customer list
- Add customer
- Customer details
- Edit
- Delete
- Search
- Filter

Customer fields:
- Name
- Phone
- Email
- Address
- Notes

FREE PLAN LIMIT:
Maximum 5 customers.

When limit is reached:
- Show usage counter "5/5"
- Disable Add Customer
- Show upgrade prompt

--------------------------------------------------
6.9 LEADS
--------------------------------------------------

Route:
/vendor/leads

Create tabs/screens:
- New Leads
- Add Lead
- All Leads
- Lead Detail

Lead fields:
- Name
- Phone
- Email
- Source
- Enquiry
- Date
- Status

Lead statistics:
- Total leads
- New leads
- Contacted
- Converted
- Closed

FREE PLAN:
Maximum 5 leads.

Phone number:
- Hide phone number for Free plan
- Show masked phone number
- Display "Upgrade to Premium to view phone number"

Create Premium state where phone number is visible.

--------------------------------------------------
6.10 JOBS
--------------------------------------------------

Route:
/vendor/jobs

Create:
- Post Job
- List Jobs
- Job detail
- Candidates/applicants

Post Job fields:
- Job title
- Description
- Requirements
- Responsibilities
- Location
- Job type
- Salary/details
- Application information
- Status

Job list:
- Search
- Filter
- Status
- Edit
- Delete
- View applicants

Candidate page:
- Candidate name
- Contact information
- Resume
- Application date
- Application status

FREE PLAN:
Maximum 1 job posting.

When limit is reached:
- Show "1/1 job posting used"
- Disable new job posting
- Upgrade CTA

--------------------------------------------------
6.11 EVENTS
--------------------------------------------------

Route:
/vendor/events

Create:
- Add event
- Event list
- Event detail
- Bookings

Event fields:
- Event name
- Banner/image
- Description
- Date
- Time
- Location
- Capacity
- Booking information
- Status

FREE PLAN:
Maximum 1 event.

Show:
- Usage counter
- Locked add button when limit reached
- Upgrade CTA

Event bookings:
- Attendee name
- Contact
- Booking date
- Status

--------------------------------------------------
6.12 OFFERS
--------------------------------------------------

Route:
/vendor/offers

Create:
- Add offer
- Offer list
- Offer detail
- Edit
- Delete

Offer fields:
- Offer title
- Description
- Image/banner
- Discount/details
- Start date
- End date
- Status

Include Free plan limit state as defined by the business rules.

--------------------------------------------------
6.13 VISITOR ANALYTICS
--------------------------------------------------

Route:
/vendor/analytics/visitors

Create analytics dashboard.

Show:
- Total visitors
- Unique visitors
- Visitor trends
- Top cities
- Top locations
- Visitor activity
- Vendor profile views
- Service/product views
- Logged-in visitor identity where available

Charts:
- Visitor trend line chart
- City/location chart
- Activity chart
- Recent visitors table

Date filters:
- Today
- 7 days
- 30 days
- Custom range

--------------------------------------------------
6.14 SETTINGS
--------------------------------------------------

Route:
/vendor/settings

Create:
- Account settings
- Business settings
- Password
- Profile preferences
- Export/download

Include:
- Download/Export functionality representation
- Export preview
- Download confirmation
- Success/error state

The development plan specifically mentions download using jsPDF + html2canvas, so represent the UI for generating/downloading the vendor information/report.

--------------------------------------------------
6.15 PLAN-BASED SIDEBAR GATING
--------------------------------------------------

This is VERY IMPORTANT.

Create two major plan states:

FREE PLAN
PREMIUM PLAN

Free plan should visually show restricted features.

Use:
- Lock icons
- Upgrade badges
- Usage counters
- Disabled buttons
- Upgrade modals
- Upgrade banners
- Tooltips

Rules from the development plan:

Orders:
- Premium only

Customers:
- Free plan capped at 5

Leads:
- Free plan capped at 5
- Phone number hidden until upgrade

Jobs:
- Free plan capped at 1 posting

Events:
- Free plan capped at 1

Offers:
- Apply the Free plan limit defined in the business rules

Sidebar:
- Services/Products/Orders visibility/gating should depend on plan.

Create:
1. Free vendor dashboard
2. Premium vendor dashboard
3. Locked module state
4. Upgrade modal
5. Limit reached modal
6. Plan expiry warning
7. Expired plan state

==================================================
7. ADMIN PANEL
==================================================

Route:
/admin/*

Create a separate professional admin interface.

Admin sidebar:
- Dashboard
- Vendors
- Users
- Services
- Products
- Industries
- Jobs
- Events
- Logout

Admin top bar:
- Search
- Notifications
- Admin profile
- Settings

--------------------------------------------------
7.1 ADMIN DASHBOARD
--------------------------------------------------

Route:
/admin/dashboard

Create today summary cards:
- New Vendors
- New Users
- New Services
- New Products
- New Jobs
- New Events

Additional analytics:
- Total vendors
- Total users
- Total services
- Total products
- Total jobs
- Total events

Charts:
- User growth
- Vendor growth
- Services
- Products
- Jobs
- Events

Recent activity table.

--------------------------------------------------
7.2 ADMIN VENDORS
--------------------------------------------------

Route:
/admin/vendors

Create:
- Vendor list
- Search
- Filter
- Industry
- Plan
- Status
- Date

Vendor detail:
- Business information
- Owner information
- Contact information
- Industry
- Services
- Products
- Plan
- Status
- Registration information

Vendor actions:
- View
- Activate
- Deactivate
- Block/unblock
- Manage status

Create confirmation dialogs.

--------------------------------------------------
7.3 ADMIN USERS
--------------------------------------------------

Route:
/admin/users

Create:
- Add User
- List Users
- User detail

User statuses:
- Active
- Inactive
- Blocked

Fields:
- Name
- Email
- Phone
- Status
- Registration date

Actions:
- View
- Edit
- Activate
- Deactivate
- Block
- Unblock

--------------------------------------------------
7.4 ADMIN SERVICES
--------------------------------------------------

Route:
/admin/services

Create:
- Platform-wide service list
- Search
- Filters
- Vendor
- Industry
- Status

Service detail:
- Service image
- Service name
- Vendor
- Description
- Category
- Status
- Created date

Actions:
- View
- Approve/manage status where applicable
- Edit
- Delete

--------------------------------------------------
7.5 ADMIN PRODUCTS
--------------------------------------------------

Route:
/admin/products

Create:
- Platform-wide product list
- Search
- Filter
- Vendor
- Industry
- Status

Product detail:
- Product image
- Product name
- Vendor
- Description
- Category
- Details
- Status

Actions:
- View
- Edit
- Delete

--------------------------------------------------
7.6 ADMIN INDUSTRIES
--------------------------------------------------

Route:
/admin/industries

Create industry management.

Industry list:
- Industry name
- Status
- Number of vendors
- Number of sub-industries

Sub-industry management:
- Add
- Edit
- Delete
- Enable/disable

Create:
- Add Industry modal
- Edit Industry
- Add Sub-industry
- Edit Sub-industry
- Delete confirmation
- Empty state

--------------------------------------------------
7.7 ADMIN JOBS
--------------------------------------------------

Route:
/admin/jobs

Create:
- Platform-wide job list
- Search
- Filters
- Vendor
- Industry
- Location
- Status

Job detail:
- Job title
- Vendor
- Description
- Requirements
- Location
- Job type
- Status
- Posted date

Job applications:
- Applicant list
- Applicant detail
- Resume
- Application status
- Applied date

--------------------------------------------------
7.8 ADMIN EVENTS
--------------------------------------------------

Route:
/admin/events

Create:
- Platform-wide event list
- Search
- Filters
- Vendor
- Date
- Status

Event detail:
- Event name
- Vendor
- Description
- Date
- Time
- Location
- Capacity
- Status

Event bookings:
- Booking list
- Attendee
- Contact
- Booking date
- Status

==================================================
8. REQUIRED UI STATES
==================================================

For EVERY important module create these states:

1. Default
2. Loading
3. Empty
4. No search results
5. Validation error
6. API/server error representation
7. Success
8. Confirmation modal
9. Delete confirmation
10. Disabled
11. Locked
12. Premium-only
13. Free-plan limit reached
14. Expired plan
15. Mobile responsive
16. Tablet responsive
17. Desktop responsive

==================================================
9. SEARCH EXPERIENCE
==================================================

Create a unified search experience.

Search categories:
- Businesses
- Services
- Products
- Jobs
- Tourism

Search UI:
- Search input
- Category
- Location
- Suggestions
- Recent searches
- Results
- Filters
- Sort

Search results should clearly distinguish:
- Business
- Service
- Product
- Job
- Tourism place

==================================================
10. ENQUIRY FLOW
==================================================

From a public vendor/service/product page:

CTA:
"Send Enquiry"

Create enquiry modal/page:
- Name
- Phone
- Email
- Message
- Service/product
- Vendor
- Submit

After submission:
- Success confirmation
- Enquiry ID
- Vendor information
- View enquiry button

The enquiry should appear:
- In User Panel → Enquiries
- In Vendor Panel → Leads/New Leads

==================================================
11. WISHLIST FLOW
==================================================

Every eligible business/service/product card should have:
- Heart icon

States:
- Not saved
- Saved
- Login required
- Removed

Logged-in users can manage wishlist from:
User Panel → Wishlist.

==================================================
12. JOB APPLICATION FLOW
==================================================

Public user:
Job → Apply

If not logged in:
- Login/register prompt

If logged in:
- Application form
- Personal details
- Resume upload
- Cover/message
- Submit

After submission:
- Success page
- Application status

User:
User Panel → Jobs Applied

Vendor:
Vendor Panel → Jobs → Candidates

Admin:
Admin Panel → Jobs → Applications

==================================================
13. EVENT BOOKING FLOW
==================================================

Public event:
- View Event
- Book/Register

Logged-in user:
- Booking form
- Confirmation

User:
User Panel → Events Booked

Vendor:
Vendor Panel → Events → Bookings

Admin:
Admin Panel → Events → Bookings

==================================================
14. PLAN / SUBSCRIPTION UX
==================================================

Create clear Free vs Premium experiences.

FREE PLAN:
- Show current usage
- Show limitations
- Lock restricted functionality
- Upgrade CTA

PREMIUM:
- Full access to eligible features
- Plan status
- Expiry date

Create:
- Upgrade modal
- Plan comparison modal
- Expiry warning
- Expired plan screen
- Feature locked screen
- Usage limit reached screen

Do not invent additional subscription features that are not specified.
Focus the design on the plan restrictions defined in the development document.

==================================================
15. RESPONSIVE DESIGN
==================================================

Create responsive versions for:

Desktop:
1440px
1280px
1024px

Tablet:
768px

Mobile:
390px
375px

Public website:
- Responsive navigation
- Mobile menu
- Responsive cards
- Responsive filters

Dashboards:
- Collapsible sidebar
- Mobile bottom/navigation behavior where appropriate
- Responsive tables
- Horizontal table scrolling when needed
- Responsive charts
- Stacked cards

Forms:
- Single-column mobile layout
- Multi-column desktop layout

==================================================
16. ACCESSIBILITY
==================================================

Use:
- High contrast
- Clear labels
- Visible focus states
- Large enough touch targets
- Descriptive button labels
- Form error messages
- Keyboard-friendly interaction representation

==================================================
17. COMPONENT SYSTEM
==================================================

Create reusable components and variants.

Buttons:
- Primary
- Secondary
- Outline
- Ghost
- Danger
- Disabled
- Loading
- Locked

Inputs:
- Text
- Email
- Phone
- Password
- Search
- Select
- Multi-select
- Date
- Time
- Textarea
- Rich text
- File upload

Cards:
- Business card
- Service card
- Product card
- Job card
- Tourism card
- Event card
- Offer card
- Stat card

Dashboard:
- Sidebar
- Header
- Stat card
- Table
- Chart
- Activity feed
- Status badge

==================================================
18. PROTOTYPE NAVIGATION
==================================================

Connect the Figma prototype logically.

Public:
Home
→ Services
→ Service detail
→ Vendor storefront

Home
→ Products
→ Product detail
→ Vendor storefront

Home
→ Jobs
→ Job detail
→ Apply

Home
→ Tourism
→ Tourism detail

Home
→ Login
→ User Dashboard / Vendor Dashboard

Home
→ Register
→ OTP
→ User Dashboard

Home
→ Business Registration
→ Vendor Dashboard

Vendor storefront
→ Enquiry
→ User Enquiries
→ Vendor Leads

Job
→ Apply
→ User Jobs Applied
→ Vendor Candidates

Event
→ Book
→ User Events Booked
→ Vendor Event Bookings
→ Admin Event Bookings

==================================================
19. DATA / CONTENT REPRESENTATION
==================================================

Use realistic sample Dindigul-oriented data.

Examples of categories:
- Restaurants
- Hotels
- Retail
- Education
- Healthcare
- Automobile
- Construction
- Professional Services
- Manufacturing
- Agriculture
- Tourism
- Local Services

Use realistic but fictional businesses.

Do not make the application look like an empty wireframe.

Populate:
- Business cards
- Service cards
- Product cards
- Jobs
- Tourism places
- Events
- Offers
- Leads
- Customers
- Orders
- Tables
- Charts

==================================================
20. IMPORTANT ROUTE / SCREEN INVENTORY
==================================================

Create the following complete screen groups.

PUBLIC:
- Home
- Services listing
- Service detail
- Products listing
- Product detail
- Jobs listing
- Job detail
- Job application
- Tourism listing
- Tourism detail
- Vendor storefront
- Free Listing storefront
- Login
- Register
- OTP verification
- Business registration
- Forgot password
- Email reset
- Phone OTP reset
- New password
- Password success

USER:
- User dashboard
- Enquiries list
- Enquiry detail
- Orders list
- Order detail
- Jobs applied list
- Job application detail
- Events booked list
- Event booking detail
- Wishlist
- Profile
- Edit profile
- Reset password

VENDOR:
- Vendor dashboard
- Company info
- CMS
- About Us editor
- Terms & Policies editor
- Services list
- Add service
- Edit service
- Service detail
- Products list
- Add product
- Edit product
- Product detail
- Industry catalogue
- Add catalogue item
- Edit catalogue item
- Catalogue detail
- Orders
- Order detail
- Customers
- Add customer
- Customer detail
- Edit customer
- Leads
- New leads
- Add lead
- Lead list
- Lead detail
- Jobs
- Add job
- Edit job
- Job detail
- Candidates
- Candidate detail
- Events
- Add event
- Edit event
- Event detail
- Event bookings
- Offers
- Add offer
- Edit offer
- Offer detail
- Visitor analytics
- Settings
- Export/download
- Free plan dashboard
- Premium plan dashboard
- Upgrade modal
- Feature locked state
- Limit reached state
- Expired plan state

ADMIN:
- Admin login
- Admin dashboard
- Vendors list
- Vendor detail
- Users list
- Add user
- User detail
- Services list
- Service detail
- Products list
- Product detail
- Industries
- Add industry
- Edit industry
- Sub-industries
- Jobs list
- Job detail
- Job applications
- Applicant detail
- Events list
- Event detail
- Event bookings

==================================================
21. FINAL QUALITY REQUIREMENT
==================================================

The final Figma project must feel like a complete real-world product, not a collection of disconnected screens.

Ensure:
- Consistent navigation
- Consistent spacing
- Consistent components
- Consistent typography
- Consistent colors
- Responsive layouts
- Complete CRUD flows
- Complete authentication flows
- Complete user flows
- Complete vendor flows
- Complete admin flows
- Free/Premium states
- Locked states
- Empty states
- Error states
- Success states
- Modals
- Confirmation dialogs
- Search/filter/pagination
- Dashboard analytics
- Tables
- Forms
- Charts
- Detail pages

MOST IMPORTANT:
Do not omit User Panel, Vendor Panel or Admin Panel.
Do not stop after designing the public homepage.
All modules described above must be represented in the Figma design and connected through prototype navigation.

The final result should represent the complete MyDindigul platform specified in the development requirements.