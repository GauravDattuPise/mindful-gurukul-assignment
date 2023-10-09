

 
Objective:

Users should be able to sign-up  and login in to the app. Logged in users should be able to add new USER and perform basic CRUD operation.

They should be able to see saved records in ListView at the dashboard screen. They can search, filter the records. If required they can edit and delete records one by one.

 

1 - Signup Screen ; Ask user to fill all fields a mandatory to save in the API 

Name - Textbox - Alphabets only
Email  - Textbox - Alphanumeric only
Phone -  - Textbox - Number only
Gender - Radio button - Male, Female and Others
How did you hear about this? - Check box - LinkedIn, Friends, Job Portal, Others
City :  Drop-Down - Static value - Mumbai, Pune, Ahmedabad
State: Auto Suggested Search Textbox - Static  - Gujarat, Maharashtra, Karnataka
Save - Button

 

2. Login:
Email
Password


3. Dashboard screen has a user listing that should show Username, Email, and Phone in the card item

4. If there are no users added, show the default placeholder image "No Data Found"

5. There should be a floating bar button or options menu to add new user details same as the listing

6. Add User - Add User Name, Mobile and Email address - Save & Cancel Button

7. View Details - On Clicking on the list item, the next screen should open and that shows the user details

8. Edit User - There should be an edit icon in each list item to edit the records. On post-edit records as success - show a message in dialog and redirect automatically to the dashboard page where the card item should be updated.

9. Delete User -  In the dashboard listing card should have the option to delete the record. Show confirmation dialog before deleting and on success delete the record from the list and UI should be updated.

10. Dashboard should have filter option - A-Z / Z-A / Last modified / Last Inserted

11. Dashboard should have the option to search by Name, Mobile, or email, As a result, the list should show only selected items that come under the search keywords

12. OnRelaod of the app, Filter should be saved

13. All records should be stored in a local database

14. If there are no records available in the local database fetch them from the API and save them in a local database for further use.

15. Ensure the network is available before hitting the API, If not show a message / Snackbar to enable WI-FI / Mobile Data

 

Add-On - Take a picture from the camera and Gallery and show it to each user. This will be for offline only. API will not provide the Image URL. App should work for online and offline both (Login and Register doesn’t require store all fields in local database, Only User CRUD operation data should be save)
