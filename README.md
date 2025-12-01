# About

This is personal no commercial project, intended to help small businesses manage their customer queues more efficiently. It allows businesses to create and manage queues, while customers can join these queues remotely via a web interface.
This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Pages and components overview

 - PAGES 
  - Main Page
  - About Project for business
  - Create account for business
 
  - Login Page
    - Form
    - Toggle Admin (default) / User Queue

  - Create User Queue Account Page 
    - Form
    - Return to previous page
 
  - Enter Default Queue User Queue -> Via QR code or Friendly URL
      - Average waiting Time
    - Enter Queue Button
    - If not logged in show User Queue Login Page

  - Enter Priority Queue User Queue -> Via QR code
  - Average waiting Time
  - Enter Queue Button
    - If not logged in show User Queue Login Page

 - User 
  -- Queue Status (when in a queue)
    - Queue average waiting time
    - Queue Line Id
    - Exit Queue Button
  
  -- User account / profile Page
    - contact info
    - change password
    - disable account button
    - Disable account confirmation Modal
 
  - Client Owner / Admin
   -- Client page
      - client info
      - contact info
      - Active Unities
      - Active Queues
      - Manage Admin Button
   
    -- Manage Admin Page
      - List Unities
      - List Admins
      - Add Admin Button

    --- Add Admin page
      - Form

  -- Unity Page
    - unity info
    - contact info
    - Queues
    - Manage Admin Button
    - Generate Queue Link QR CODE



-LAYOUTS
  - Default 
    -- Header
    - Login / Logout / My account
  - Admin (side menu)
    - Client
    - Unity
    - Queue
    - Admin


-CONTEXTS
  - AuthenticationProvider
    - Role
    - user info
  - Client Provider
    - Client info
  - Queue UserProvider
    - Queue added info
      - Queue position Id