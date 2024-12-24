> 1. State Variables

links: An array of objects. Each object has two properties: link and linktext.
Default state: [{ link: "", linktext: "" }].

handle: Represents the user's chosen handle (username).

pic: Represents the user's profile picture link.

> 2. Functions

handleChange:
Updates the links state when a user modifies a link or its text.
Identifies the specific link being edited using idx (index).

addLink:
Adds a new empty link object ({ link: "", linktext: "" }) to the links array.

submitLinks:
Sends the current state (links, handle, pic) to a backend API endpoint (/api/generate) via a POST request. Displays success or error messages using toast.

> 3. UI Layout
The layout is divided into two columns using CSS classes:

> Column 1 (Form Section)

Step 1: Claim Handle: Input field to set the handle.
Step 2: Add Links:
Dynamic list of input fields for adding and editing links.
Includes a button to add more links.

Step 3: Add Profile Picture:
Input field to set the profile picture link (pic).
Generate Button: Submits all data via the submitLinks function.


>Column 2 (Image Section):
Styled with a background image (/banner.png) that covers the full column.


4. API Integration
Sends a POST request to http://localhost:3000/api/generate.
The request body includes links, handle, and pic as JSON.

5. Toast Notifications
Displays success or error messages returned by the API using react-toastify.


> Example Workflow

User Input: User enters a handle, adds links, and sets a profile picture.

Data Submission: Clicking the "Generate" button triggers the submitLinks function.
Data is sent to the backend.

Feedback: A toast notification displays whether the operation was successful.

# GITHUB_ID=Ov23lit8pkk0efqDhtKq
# GITHUB_SECRET=ab79ed71c02e66b63c03db3f27c970e4cc769de6
