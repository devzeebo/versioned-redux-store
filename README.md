# Versioned Redux Store

While working with React SPAs, we ran into the issue with differing shapes of the persisted Redux state. We attempted to resolve this by creating a version aspect on the store, which we could use to determine the correct method to merge.

## Current Operation
There several cases to consider:
Initial => Initial state provided to the Redux `createStore()`
Persisted => Persisted state provided by `persistState` from redux-localstorage

Initial | Persisted | Result
Unversioned | Unversioned or Versioned | Merge
Unversioned | Empty or missing | Take Initial
Versioned | Unversioned | Take Initial
v2 | v1 | Take Initial
v2 | v3 | Take Initial^
v2 | v2 | Merge
v2 | Empty or missing | Take initial

^ - We chose to favor usuing the initial state when version do not match so taht 'rollback's are possible.

## Examples
See the Examples folder

More info to come.

For questions, please email [daniel@scheufler.io](mailto:daniel@scheufler.io)