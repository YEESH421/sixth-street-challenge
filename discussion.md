# How did you prioritize your time?


I wanted to first get a working version of the todo list for a single user since it would be easier to catch/fix any bugs and it would help me think of any flows or design choices that I didn't come up with at first. To get a local version to work, I prioritized the add, edit, check, and delete functionalities.


After I got the todo list to work for one user, I shifted my attention to getting the list to sync across multiple users. I figured that the database calls were not that different from handling local states from a component lifecycle perspective, so I would not be doing much backtracking to implement the sync features.


Finally, once I finished the sync features, I looked for any enhancements and defects I could address. This is where I added a clear all button and fixed some bugs around removing the last element in a list.


As I became more familiar with the use cases and flow of the component, each step took less time as I narrowed down how many design decisions I needed to make at each step.


# What decision points did you come to, and how did you reach the decision you made? Are there any questions you would have asked if you could?


The Call component seemed a little crowded, so I decided to create a separate Todo component and pass props regarding call details into the Todo component.


I started by thinking about the requirements and what HTML elements would best serve these requirements. At first, I tried to use checkbox inputs and labels as the todo list, and a text input and an add button as the mechanism for adding new todo items. However, since users needed to be able to edit the todo items, I changed the labels for the todo items into text inputs as well, and added edit and delete buttons for every item.


After deciding the HTML structure, I thought about the state flow for a single user of the todo list. I knew I would need states tracking the whole todo list as well as one for tracking the new item the user is typing in. For editing todo items, I decided that the user should be able to click the edit button, type the updated text, and click update (the edit button turns into an update button after being pressed) to confirm the changes.


Once I decided how to design the state, I thought about how the event handlers would be implemented. For a single person, it was simple enough to use state changes and array functions like map and filter to handle add, delete, and edit. For multiple people, there are more complications. Some questions I had were:


* Should the todo list be visible/editable before joining the call?
* Should I try to handle scenarios where users change the same element at the same time?
* How to organize lists by room?
* What happens when two people have populated lists before joining?


In my final implementation, I allowed users to edit their lists before they joined the room. List items were placed into a path 'todo/{roomId}', where roomId is generated from the roomURL provided in the Call component. If two users have populated lists, the user who had the roomId that both users end up joining will replace the other user's list.


I changed the data/state design a little too. To handle syncing the checkboxes, I changed the todo list state from an array of strings to an array of arrays, with value [string: todo, boolean: checked]. When updating or adding data, I used { set } from "@firebase/database" and then useEffect fetch the newly set data and update the component's local state. For my useEffect, I added a dependency "count" that I would only update when I wanted a re-render. There is probably a more elegant solution that I'd use if I had more time.


# What would you do in this scenario if there was more time? What would come next? Is there anything you would change if you could do it again?


If I had more time, I'd try to make the component more sleek and with less parts to interact with. There's two buttons and one checkbox to interact with for every item on the list, so I would find a way to reduce the amount of interactable pieces for every point.


I would also apply styling to make it look nicer. The new todo input should be aligned with the rest of the items, and the buttons could have images instead of words. Once an item is marked done, it could be crossed out for emphasis, and the items should be reorderable. Finally, the list should be scrollable if it overflows the page.


If I were to do it again, I'd probably make the todo list hidden until the user joins the call room, since the todo is meant to be collaborative anyways.
