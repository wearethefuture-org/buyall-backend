pm2 kill && pm2 start --env e2e
jest --config jest-local-e2e.json --detectOpenHandles --forceExit