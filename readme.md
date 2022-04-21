# Chat rooms

This is a project I made to try out socket.io  
Both react and socket.io (at the time of writing) are relatively new to me.

<img src="https://github.com/Shiv-Patil/chatrooms/blob/main/screenshot.png?raw=true" />

---

## Running Locally

### Requirements

- git
- node
- yarn | npm

### Instructions
```bash
git clone https://github.com/Shiv-Patil/chatrooms.git
```
- Edit `webapp/.env` with `VITE_ENDPOINT` pointing to the url where the server is hosted, leave blank to use localhost with default port
- Create `server/.env` with `host` pointing to the domain where the frontend is hosted (optional, used for CORS)

```bash
cd chatrooms/server
yarn          # npm ci
yarn run dev  # npm run dev
```
Keep the above prcoess running.  
  
In a new shell:
```bash
cd chatrooms/webapp
yarn          # npm ci
yarn run dev  # npm run dev
```
