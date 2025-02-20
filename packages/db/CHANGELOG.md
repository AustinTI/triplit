# @triplit/db

## 0.3.34

### Patch Changes

- b3315c3: default to id order in after cursor calculation

## 0.3.33

### Patch Changes

- 0470537: fix bug in order by candidate selection
- 8d029fd: properly type db transaction fetchOne

## 0.3.32

### Patch Changes

- 5a0f993: handle filter clauses in candidate selection
- 1a8c0ea: Update conflicting type names for @triplit/db Value

## 0.3.30

### Patch Changes

- d1b274b: Support variable prefixes to prevent overriding variable assignments across various injection scopes

## 0.3.29

### Patch Changes

- 1d78145: remove insert batching for speed up

## 0.3.28

### Patch Changes

- f944c0b: allow access to noCache param to toggle experimental VAC

## 0.3.27

### Patch Changes

- 5b36d92: update added attribute matching logic to ignore new relations
- eddc659: - support inclusive after cursors
  - synchronously ensure unsubscribed queries dont refire
- 753e546: refactor overrideStoredSchema to return informational object
- 7408dca: support array of clauses in order by
- 26397d4: fix bug with replacing variables in filter statements

## 0.3.26

### Patch Changes

- b5744e9: fix bug for manage deletes with write rules

## 0.3.25

### Patch Changes

- 654c256: addressed a bug that errored out fetchDeltaTriples when subscribing to the 'schema' entity in the '\_metadata' collection
- 3ddaac3: - ensure deletes work properly with limit in fetch and subscription
  - add gte and lte options for range queries
- da425e6: fixup schema loading for initially schemaless dbs
- d20f7b4: add checks for dangerous schema updates when passed directly into the database constructor

## 0.3.24

### Patch Changes

- 3989757: Improve support for query type conversions

## 0.3.23

### Patch Changes

- a049f47: export appendCollectionToId

## 0.3.22

### Patch Changes

- 557e10f: Add jitter and exponential backoff to autoretry logic
- 2d41a65: improve delete performance

## 0.3.21

### Patch Changes

- 25ba609: Fixup deserialization bug in updater

## 0.3.20

### Patch Changes

- b07bba6: Ensure that schemas passed in to the DB constructor have id and collection triples
- b07bba6: Add support for 'has' and '!has' set operators

## 0.3.19

### Patch Changes

- f248061: fix and test pagination bug
- aff7f7f: add support for optional attributes
- 71504b0: Accept entities in after clause of queries
- 1ef3f46: fixup inserting nullable sets over remote client
- 2ab8039: fixup queries with limit but no order
- fd652f7: Fixup bugs with migration operations on nested attributes

## 0.3.18

### Patch Changes

- 9651552: add support for nullable sets
- 9a7fe03: add support for additive query filters and order statements in the query builder api
- 5ea23b8: ensure object assignments are agnostic to order
- 480f8eb: Add error and ts preventing updates to an entity id

## 0.3.17

### Patch Changes

- 458fc03: Fixup issues with set values in filters
- 10bb3eb: Add more informative errors when parsing values to types

## 0.3.16

### Patch Changes

- 6bf47f6: pass deleted keys to variables in exists subquery
- 3fe5761: Add fallback prop to TriplitErrors for identification

## 0.3.15

### Patch Changes

- 554aaa6: Implement basic json to js conversion of queries

## 0.3.14

### Patch Changes

- 33cc09c: refactor state vector querying, handle many async schema loads, fixup set filter bug with deleted entities

## 0.3.13

### Patch Changes

- 78edb1d: Improve error messaging
- 0bd7759: Improve indexeddb performance and prevent ghost attributes from deleted entities

## 0.3.12

### Patch Changes

- f2b0f1f: remove FormatRegistry usage in date

## 0.3.11

### Patch Changes

- 9e222c8: ensure clear() resets in memory schema
  small bug fixes
- ed225fd: Fix bug causing oversending of triples

## 0.3.10

### Patch Changes

- ae9bad9: clean up @tuple-database deps to fixt nextjs builds

## 0.3.9

### Patch Changes

- ff3bfe2: Properly handle single relationship deserialization

## 0.3.8

### Patch Changes

- f4f87df: Add RelationMany, RelationOne and RelationById schema helpers

## 0.3.7

### Patch Changes

- 4d2d381: add relationship types to schema

## 0.3.6

### Patch Changes

- 8edd13f: properly prune internal attributes on fetch

## 0.3.5

### Patch Changes

- 91ee2eb: dont return internal attributes from fetch

## 0.3.4

### Patch Changes

- 0d95347: add listener api for schema changes
- 0d95347: remove parcel dependency

## 0.3.3

### Patch Changes

- 5398d8d: build esm only, fixup entry point resolution

## 0.3.2

### Patch Changes

- 817e4cd: export update proxy methods

## 0.3.1

### Patch Changes

- 76c9700: Improve performance and support RSA-signed tokens

## 0.3.0

### Minor Changes

- 4af4fde: Add selecting subqueries and improve insert performance

## 0.2.3

### Patch Changes

- 06636a7: Fix CLI missing dependency issue

## 0.2.2

### Patch Changes

- d92db2c: fixup authentication variable handling
- d92db2c: drop automatic garbage collection

## 0.2.1

### Patch Changes

- 56d80f1: - rename MissingAttributeDefinitionError to TypeJSONParseError
  - refactor createCollection to handle rules

## 0.2.0

### Minor Changes

- 61455a2: minor version bump

## 0.1.1

### Patch Changes

- 6a92bbe: Fix Storage type error and include indexeddb dependency

## 0.1.0

### Minor Changes

- 2f75a31: bump version for beta release

## 0.0.39

### Patch Changes

- 1bb02af: version bump test

## 0.0.38

### Patch Changes

- 8761ebe: Many changes, bump version in prep for beta release

## 0.0.37

### Patch Changes

- af14ded: - Add support for date type
  - Support deeply nested updates and migrations
  - Allow additional data type options (nullable, default)
- af14ded: - Add fetch policy options
  - Bug fixes
  - Performance improvements

## 0.0.36

### Patch Changes

- 6df3de6: Update CLI to support HTTPS

## 0.0.32

### Patch Changes

- ba38c67: - fixup builds and typescript support
  - improve support for next.js

## 0.0.31

### Patch Changes

- 3145915: downgrade nanoid version

## 0.0.30

### Patch Changes

- 1a8f596: - Include the DB constructor as a default export
- 33a1201: Return transaction ids from update methods if an id is assigned
- 30aadee: - add rules and variables for authenticationa and authorization
  - Auto disconnect query on syncing error
  - Upgrade update api to immer style updates

## 0.0.28

### Patch Changes

- 5011219: - add string comparison operations
  - add fetchById method
  - support cursor pagination
  - performance improvements and bug fixes
