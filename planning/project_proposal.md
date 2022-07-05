# Project Proposal

Pod Members: **Aaron Alemi, Katherin Jimenez, Doris Sanchez**

## Problem Statement

Insert your groups problem statement and target audience.

Bug trackers are aimed towards large companies with large development teams, with common issues being a slow response time and an overwhelming amount of information shown at once. Our bug tracker will be aimed towards smaller companies/dev teams and small group projects and focus on making the site condensed and simplified.

## Description

What is the main purpose of your project? What are the key features your site has to offer its users? How will your targeted audience use your website?

The main purpose of our bug tracker project will be to create a bug tracking system that is tailored towards smaller companies. It will have a cleaner UI with less information shown at once and being more user friendly. Some key features our site will offer will include: 

* displaying the status of each bug as well as the priority of the bug
* the ability to see who else is working on the same bug
* managers will be able to see the progress of bugs as well as assign employees to specific bugs
* visual representations of data pertaining to the bugs, such as the amount of work done in the form of a pie chart. 

The target audience will use this project in order to track bugs in a simplified way without too many overwhelming features that larger bug trackers offer. Managers will be able to create teams and assign teams and specific employees to different tasks/bugs. Employees will be able to update the status of the bug they are currently working on. Managers are able to view the progress their employees are making quickly and efficiently. 


## Expected Features List

Add a list of your groups's brainstormed features list

* People can register and log in to our website
    * Their accounts will be saved in our database
* Afterwards they can create a team and add any other member that is currently in the database, as long as that prospective member also agrees on their end
* Teams will have different roles, such as manager, developer, etc
* Teams tab
    * 1 team can have multiple projects (projects are created by the manager in the projects tab)
    * Your account’s teams can be viewed in the teams tab. You will also have an option to create a new team from this tab
* Projects tab
    * 1 project is an item that consists of multiple tickets (submitted by anyone(?) )
* Tickets tab
    * Tickets can be created as a part of a project and assigned to a developer by a manager
        * Managers can also assign tickets to themselves if they so choose
* Tickets are filtered and shown by selecting a project from the tickets tab, and it will show the tickets for that project
* Additional filters can be applied such as priority, complexity, etc
* Tickets contain…
    * Category
        * “Bug fix”, “New Feature”, etc
    * Priority
        * Low, medium, high, extreme
    * Complexity
        * Numerical value from 1-10 estimating the overall time/resources needed and difficulty of a given ticket
    * Title
        * The title designated to the ticket. Typically a brief overview of what it requires
    * Description
        * A more detailed description of what the ticket requires
    * Status
        * Unassigned (not assigned to a developer yet) 
        * Not started (assigned to a developer but they have not yet started it)
        * In progress (assigned to a developer and they are currently working on it)
        * Submitted (the developer has submitted the ticket for approval by the manager)
        * Resolved (The manager has approved the submission and the ticket is now fully completed)
    * Developers
        * A list of developer(s) who are currently working on the ticket
* (Stretch) Team velocity tab
    * Calculates and shows information about the average work speed of a team based on the total complexity points they managed to complete within a set period of time (1 week period, 2 week period, etc). 
    * This number can also be used to estimate the amount of time needed to complete the current tickets based on their complexity points


## Related Work

What similar apps and websites? How will your project stand out from these other websites?

Similar apps that are on the market include JIRA, Google Issue Tracker, and BugHerd which are all tailored to large companies for software development bug tracking. The tracking interface and general usability is engineered for larger companies with larger teams of developers, or often, for the specific company itself like Google’s Issue Tracker. These trackers have some form of restricted access where individual consumers are not able to use the trackers and the sheer amount of information makes it difficult to use amongst smaller teams. 

However, our group seeks to resolve the issues present on current bug trackers and target our tracker for smaller companies and small group projects to reduce the amount of information presented to the user. The tracker also seeks to simplify the complicated designs of trackers already on the market in terms of providing more user accessibility and faster performance time (runtime). The tracker will provide productivity reports on how quickly bugs are being solved depending on the difficulty level through visual display of statistics. Additionally, the tracker will provide time recommendations for completing certain bugs depending on current production/resolution time according to those reports.


## Open Questions

What questions do you still have? What topics do you need to research more for your project?

For the project, we still need to research specific details that go on the productivity reports in terms of bug tracking and what smaller development teams might need over what is offered in other bug trackers. We also need to research certain accessibility features that can be added to the interface that has not been readily available on current bug trackers so that anyone and everyone can use the site.

Questions:
How can we improve the overall performance/speed of our bugtracker compared to others?
How can the interface be made more accessible and user friendly?
What other tools can be implemented into the tracker that are aligned with the needs of smaller businesses / development teams?

