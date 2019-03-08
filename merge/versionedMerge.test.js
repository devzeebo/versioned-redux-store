import versionedMerge from './versionedMerge';

describe('Versioned Merge', () => {
  describe('given a versioned initial state', () => {
    let initialState;
    let something;

    beforeEach(()=>{
      something = 'identifyable';
      initialState = {
        version: 2,
        something,
      }
    });
    describe('given an UNversioned persisted state', () => {
      let persistedState;

      beforeEach(()=>{
        persistedState = {
          that: 'this',
        }
      })
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then use the initial state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
          expect(mergedState.that).toBeUndefined();
        });
      });
    });
    describe('given a OLDER versioned persisted state', () => {
      let persistedState;

      beforeEach(()=>{
        persistedState = {
          version: 1,
          that: 'this',
        }
      })
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then use the NEW initial state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
          expect(mergedState.that).toBeUndefined();
        });
      });
    });
    describe('given a NEWER versioned persisted state', () => {
      let persistedState;

      beforeEach(()=>{
        persistedState = {
          version: 3,
          that: 'this',
        }
      })
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then use the OLDER inital state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
          expect(mergedState.that).toBeUndefined();
        });
      });
    });
    describe('given SAME version persisted state', () => {
      let persistedState;

      beforeEach(()=>{
        persistedState = {
          version: 2,
          that: 'this',
          something: 'theOtherThing',
        }
      })
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then merge persisted into initial', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(persistedState.something);
          expect(mergedState.that).toBeDefined();
        });
      });
    });
    describe('given NO persisted state', () => {
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,undefined);
        })
        it('then use initial state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
        });
      });
    });
    describe('given EMPTY persisted state', () => {
      const persistedState = {};
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then use initial state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
        });
      });
    });
  });

  describe('given an UNversioned initial state', () => {
    let initialState;
    let something;

    beforeEach(()=>{
      something = 'identifyable';
      initialState = {
        something,
      }
    });
    describe('given a persisted state', () => {
      let persistedState;

      beforeEach(()=>{
        persistedState = {
          that: 'this',
          something: 'theOtherThing',
        }
      })
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then merge persisted into initial', () => {
          expect(mergedState.something).toBe(persistedState.something);
          expect(mergedState.that).toBeDefined();
        });
      });
    });
    describe('given NO persisted state', () => {
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,undefined);
        })
        it('then use initial state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
        });
      });
    });
    describe('given EMPTY persisted state', () => {
      const persistedState = {};
      describe('when merging', () => {
        let mergedState;

        beforeEach(()=>{
          mergedState = versionedMerge(initialState,persistedState);
        })
        it('then use initial state', () => {
          expect(mergedState.version).toBe(initialState.version);
          expect(mergedState.something).toBe(something);
        });
      });
    });
  });
});
