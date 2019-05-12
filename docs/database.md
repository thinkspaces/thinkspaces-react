# Database

## Table of contents

- [Database](#database)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Models](#models)
    - [TagBucket](#tagbucket)
      - [TagBucket properties](#tagbucket-properties)
      - [TagBucket methods](#tagbucket-methods)
        - [TagBucket(tbid, tbDocRef)](#tagbuckettbid-tbdocref)
    - [Tag](#tag)
      - [Tag properties](#tag-properties)
      - [Tag methods](#tag-methods)
        - [Tag(tbid, tid, tDocRef)](#tagtbid-tid-tdocref)
    - [User](#user)
      - [User properties](#user-properties)
      - [User methods](#user-methods)
        - [User(uid, uDocRef)](#useruid-udocref)
    - [Project](#project)
      - [Project properties](#project-properties)
      - [Project methods](#project-methods)
        - [Project(pid, pDocRef)](#projectpid-pdocref)
  - [Recommendations](#recommendations)

## Introduction

The Database models use the CRUD pattern: Create, Read, Update, Delete.

- Create: Create a new document in the database for the model / collection.
- Read: Unpack the data for a document.
- Update: Modify the data for a document.
- Delete: Delete a document.

There are also helper functions for each model that simplify common tasks. These also follow the CRUD pattern.

## Models

### TagBucket

#### TagBucket properties

#### TagBucket methods

##### TagBucket(tbid, tbDocRef)

Constructor.

Arguments:

- `tbid`: a string ID for the TagBucket e.g. `"location"` corresponds to the location bucket. If the ID does not exist, a new TagBucket will be created with that ID in the database.
- `tbDocRef`: alternatively, supply a DocumentReference to a TagBucket document in Firebase.

Leave both arguments blank to create a new TagBucket e.g. `TagBucket()`. This will be assigned a random ID.

### Tag

#### Tag properties

#### Tag methods

##### Tag(tbid, tid, tDocRef)

Constructor.

Arguments:

- `tbid`: a string ID for the TagBucket e.g. `"project-category"`
- `tid`: a string ID for the Tag e.g. `"finance"` corresponds to the finance tag. If the ID does not exist, a new Tag will be created with that ID in the database.
- `tDocRef`: alternatively, supply a DocumentReference to a Tag document in Firebase.

Leave all arguments blank to create a new Tag e.g. `Tag()`. This will be assigned a random ID, and will be created inside the `miscellaneous` TagBucket.

### User

#### User properties

#### User methods

##### User(uid, uDocRef)

Constructor.

Arguments:

- `uid`: a string ID for the user e.g. `"275034kergkjer"` corresponds to the user John Doe. If the ID does not exist, a new User will be created with that ID in the database.
- `tbDocRef`: alternatively, supply a DocumentReference to a User document in Firebase.

Leave both arguments blank to create a new User e.g. `User()`. This will be assigned a random ID.

### Project

#### Project properties

#### Project methods

##### Project(pid, pDocRef)

Constructor.

Arguments:

- `pid`: a string ID for the user e.g. `"ewfweohreug404395"` corresponds to the project Sample Project. If the ID does not exist, a new Project will be created with that ID in the database.
- `pDocRef`: alternatively, supply a DocumentReference to a Project document in Firebase.

Leave both arguments blank to create a new Project e.g. `Project()`. This will be assigned a random ID.

## Recommendations

- Use `idx` library to safely access nested properties. Database records may be inconsistent and some fields may be missing. `idx` returns if any of a chain of properties is `null` or `undefined`.