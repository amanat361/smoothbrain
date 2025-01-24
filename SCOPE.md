# Jack Box Clone Project

## Tech Stack
- Next.js
- Thats about it lol
## Minimum product spec

#### Backend:
- Ability to make a lobby that has a generated code
- Ability for other users to join said lobby from the code
- Central lobby state that users can read and write to
- Garbage collection: clean up lobbies after people leave
#### Frontend:
- Client interface for interacting with the server
- "Join Lobby" button and "Create Lobby" button
- Ability to view existing lobbies and lobby metadata
- Form to submit answers to prompts
- Ability to view the current prompt from the lobby
- View the lobby you are in and the other members

## General product spec

#### Prompts:
- How are prompts going to be generated, and how does AI play a role?
#### Voting:
- How do people vote on prompts, when do they do it, and how does the server store this data?
#### Results:
- How does the algorithm determine winners and how are they displayed on devices?
## Bidirectional network communication

- Clients can easily communicate with host via POST requests. For example, the sever can have an endpoint like `/api/abc123/submit` which the server can handle in many ways. One way is just having some state like Redis where the submissions are stored. Nothing fancy.
- It is tricker to send current lobby state (like the question) to clients. We can start off with just a button like 'refresh' that submits a GET request to the server. This can look like `/api/abc123` and the client gets back the current lobby state. Later this can be improved to either a polling query every few seconds or something more advanced.

## Formalities

#### Schedule:
- Sam and Vince can work on this at least 20-30 minutes a day
- We should meat at least once a week to update this document
#### Task distribution:
- For now we should pick tasks that we enjoy as long as they align with large goals
- Communicate tasks and use Git branching to not overlap feature development