# Database

## Table of contents

- [Database](#database)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Recommendations](#recommendations)
  - [TagBucket](#tagbucket)
    - [TagBucket properties](#tagbucket-properties)
      - [TagBucket().ref](#tagbucketref)
    - [TagBucket methods](#tagbucket-methods)
      - [TagBucket(tbid, tbDocRef)](#tagbuckettbid-tbdocref)
      - [TagBucket().create(props)](#tagbucketcreateprops)
      - [TagBucket().read()](#tagbucketread)
      - [TagBucket().readTags()](#tagbucketreadtags)
      - [TagBucket().update(props)](#tagbucketupdateprops)
      - [TagBucket().id()](#tagbucketid)
  - [Tag](#tag)
    - [Tag properties](#tag-properties)
      - [Tag().ref](#tagref)
    - [Tag methods](#tag-methods)
      - [Tag(tbid, tid, tDocRef)](#tagtbid-tid-tdocref)
      - [Tag().create(props)](#tagcreateprops)
      - [Tag().read()](#tagread)
      - [Tag().update(props)](#tagupdateprops)
      - [Tag().updateUser(userInstance)](#tagupdateuseruserinstance)
      - [Tag().updateProject(projectInstance)](#tagupdateprojectprojectinstance)
      - [Tag().deleteUser(userInstance)](#tagdeleteuseruserinstance)
      - [Tag().deleteProject(projectInstance)](#tagdeleteprojectprojectinstance)
      - [Tag().id()](#tagid)
  - [User](#user)
    - [User Firebase structure](#user-firebase-structure)
    - [User properties](#user-properties)
      - [User().ref](#userref)
    - [User methods](#user-methods)
      - [User(uid, uDocRef)](#useruid-udocref)
      - [User().create(props)](#usercreateprops)
      - [User().read()](#userread)
      - [static User().read(field, comparator, value)](#static-userreadfield-comparator-value)
      - [User().update(props)](#userupdateprops)
      - [User().updateTag(tagInstance)](#userupdatetagtaginstance)
      - [User().updateTeam(projectInstance)](#userupdateteamprojectinstance)
      - [User().deleteTag(tagInstance)](#userdeletetagtaginstance)
      - [User().deleteTeam(projectInstance)](#userdeleteteamprojectinstance)
      - [User().id()](#userid)
  - [Project](#project)
    - [Project Firebase structure](#project-firebase-structure)
    - [Project properties](#project-properties)
      - [Project().ref](#projectref)
    - [Project methods](#project-methods)
      - [Project(pid, pDocRef)](#projectpid-pdocref)
      - [Project().create(props)](#projectcreateprops)
      - [Project().read()](#projectread)
      - [Project().readTags()](#projectreadtags)
      - [Project().readTeam()](#projectreadteam)
      - [Project().update(props)](#projectupdateprops)
      - [Project().updateTag(tagInstance)](#projectupdatetagtaginstance)
      - [Project().updateTeamUser(userInstance)](#projectupdateteamuseruserinstance)
      - [Project().deleteTag(tagInstance)](#projectdeletetagtaginstance)
      - [Project().deleteTags()](#projectdeletetags)
      - [Project().deleteTeam()](#projectdeleteteam)
      - [Project().deleteTeamUser(userInstance)](#projectdeleteteamuseruserinstance)
      - [Project().id()](#projectid)

## Introduction

The Database models use the CRUD pattern: Create, Read, Update, Delete.

- Create: Create a new document in the database for the model / collection.
- Read: Unpack the data for a document.
- Update: Modify the data for a document.
- Delete: Delete a document.

There are also helper functions for each model that simplify common tasks. These also follow the CRUD pattern.

## Recommendations

- Use `idx` library to safely access nested properties. Database records may be inconsistent and some fields may be missing. `idx` returns if any of a chain of properties is `null` or `undefined`.
- If making a new method that does not require use of a class instance, make the method `static`. Static functions are used like this e.g. `TagBucket.myStaticFunction()`. In contrast, recall that non-static methods are used like this e.g. `new TagBucket("location").read()`.
- Use the CRUD keywords where possible for consistency.
- Consider extending existing methods (and try to remain consistent) instead of making new ones for special cases.

## TagBucket

### TagBucket properties

#### TagBucket().ref

DocumentReference to the TagBucket in Firebase.

### TagBucket methods

#### TagBucket(tbid, tbDocRef)

Constructor.

Arguments:

- `tbid`: a string ID for the TagBucket e.g. `"location"` corresponds to the location bucket. If the ID does not exist, a new TagBucket will be created with that ID in the database.
- `tbDocRef`: alternatively, supply a DocumentReference to a TagBucket document in Firebase.

Leave both arguments blank to create a new TagBucket e.g. `TagBucket()`. This will be assigned a random ID.

#### TagBucket().create(props)

Create a new TagBucket in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Recommended to use with a new instance to create a new document. To update existing documents, use `update()` instead.

#### TagBucket().read()

Get all the data for a TagBucket, put it into an object, and return.

Notes:

- Structure: `{ id, ref, tag references [], all other fields }`

#### TagBucket().readTags()

`TagBucket().read()` gives an array of tag references. But if you want the data for each tag as well, then use `TagBucket().readTags()`. It unpacks each tag reference and puts it into an array.

Notes:

- Structure: `[ tag { id, ref, all other fields } ]`

#### TagBucket().update(props)

Update a TagBucket in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Can only be used to update existing documents.

#### TagBucket().id()

Returns the unique string ID of document in the database.

## Tag

### Tag properties

#### Tag().ref

DocumentReference to the Tag in Firebase.

### Tag methods

#### Tag(tbid, tid, tDocRef)

Constructor.

Arguments:

- `tbid`: a string ID for the TagBucket e.g. `"project-category"`
- `tid`: a string ID for the Tag e.g. `"finance"` corresponds to the finance tag. If the ID does not exist, a new Tag will be created with that ID in the database.
- `tDocRef`: alternatively, supply a DocumentReference to a Tag document in Firebase.

Leave all arguments blank to create a new Tag e.g. `Tag()`. This will be assigned a random ID, and will be created inside the `miscellaneous` TagBucket.

#### Tag().create(props)

Create a new Tag in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Recommended to use with a new instance to create a new document. To update existing documents, use `update()` instead.

#### Tag().read()

Get all the data for a Tag, put it into an object, and return.

Notes:

- Structure: `{ id, ref, all other fields }`

#### Tag().update(props)

Update a Tag in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Can only be used to update existing documents.

#### Tag().updateUser(userInstance)

Associates the tag with a user in the database.

Arguments:

- `userInstance`: an instance of the User class to update the tag for.

Notes:

- Behind the scenes, the function adds a reference to the user in the Tag document's users array.
- It also adds a reference to the tag in the User document's tags array.

#### Tag().updateProject(projectInstance)

Associates the tag with a project in the database.

Arguments:

- `projectInstance`: an instance of the Project class to update the tag for.

Notes:

- Behind the scenes, the function adds a reference to the project in the Tag document's users array.
- It also adds a reference to the tag in the Project document's tags array.

#### Tag().deleteUser(userInstance)

Disassociates the tag with a user in the database.

Arguments:

- `userInstance`: an instance of the User class to delete the tag for.

Notes:

- Behind the scenes, the function removes the reference to the user in the Tag document's users array.
- It also removes the reference to the tag in the User document's tags array.

#### Tag().deleteProject(projectInstance)

Disassociates the tag with a project in the database.

Arguments:

- `projectInstance`: an instance of the Project class to delete the tag for.

Notes:

- Behind the scenes, the function removes the reference to the project in the Tag document's users array.
- It also removes the reference to the tag in the Project document's tags array.

#### Tag().id()

Returns the unique string ID of document in the database.

## User

### User Firebase structure

- username: string
  - optional
- teams: [DocumentReference]
  - 0 or more references to projects that the user is a team member of
- admin: [DocumentReference]
  - 0 or more references to projects that the user is an administrator of
- profilepicture: string
  - a URL to an image
- email: string
- createdTimestamp: timestamp
- major: string
- privacy: boolean
- headline: string
- graduation: string
- name: string
- tags: [DocumentReference]
  - 0 or more references to tags

### User properties

#### User().ref

DocumentReference to the User in Firebase.

### User methods

#### User(uid, uDocRef)

Constructor.

Arguments:

- `uid`: a string ID for the user e.g. `"275034kergkjer"` corresponds to the user John Doe. If the ID does not exist, a new User will be created with that ID in the database.
- `tbDocRef`: alternatively, supply a DocumentReference to a User document in Firebase.

Leave both arguments blank to create a new User e.g. `User()`. This will be assigned a random ID.

#### User().create(props)

Create a new User in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Recommended to use with a new instance to create a new document. To update existing documents, use `update()` instead.

#### User().read()

Get all the data for a User, put it into an object, and return.

Notes:

- Structure: `{ id, ref, all other fields }`

#### static User().read(field, comparator, value)

Queries for User documents in the database, and returns them as an array.

Arguments:

- `field`: which field to query against e.g. "username"
- `comparator`: comparators e.g. "==", "<="
- `value`: specific value

Notes:

- Wraps the Firebase simpleQuery: <https://firebase.google.com/docs/firestore/query-data/queries>

#### User().update(props)

Update a User in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Can only be used to update existing documents.

#### User().updateTag(tagInstance)

Proxies `Tag().updateUser(userInstance)` for convenience.

Arguments:

- `tagInstance`: an instance of the Tag class to update the user for.

Notes:

- You can use either for the same effect.

#### User().updateTeam(projectInstance)

Proxies `Project().updateTeam(userInstance)` for convenience.

Arguments:

- `projectInstance`: an instance of the Project class to update the user for.

Notes:

- You can use either for the same effect.

#### User().deleteTag(tagInstance)

Proxies `Tag().deleteUser(userInstance)` for convenience.

Arguments:

- `tagInstance`: an instance of the Tag class to delete the user for.

Notes:

- You can use either for the same effect.

#### User().deleteTeam(projectInstance)

Proxies `Project().deleteTeamUser(userInstance)` for convenience.

Arguments:

- `projectInstance`: an instance of the Project class to remove from the user's projects array.

Notes:

- You can use either for the same effect.

#### User().id()

Returns the unique string ID of document in the database.

## Project

### Project Firebase structure

- tags: [DocumentReference]
  - 0 or more references to tags
- team: [DocumentReference]
  - 0 or more references to users that are part of the project's team

### Project properties

#### Project().ref

DocumentReference to the Project in Firebase.

### Project methods

#### Project(pid, pDocRef)

Constructor.

Arguments:

- `pid`: a string ID for the user e.g. `"ewfweohreug404395"` corresponds to the project Sample Project. If the ID does not exist, a new Project will be created with that ID in the database.
- `pDocRef`: alternatively, supply a DocumentReference to a Project document in Firebase.

Leave both arguments blank to create a new Project e.g. `Project()`. This will be assigned a random ID.

#### Project().create(props)

Create a new Project in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Recommended to use with a new instance to create a new document. To update existing documents, use `update()` instead.

#### Project().read()

Get all the data for a Project, put it into an object, and return.

Notes:

- Structure: `{ id, ref, all other fields }`

#### Project().readTags()

`Project().read()` gives an array of tag references. But if you want the data for each tag as well, then use `Project().readTags()`. It unpacks each tag reference and puts it into an array.

Notes:

- Structure: `[ tag { id, ref, all other fields } ]`

#### Project().readTeam()

`Project().read()` gives a team which is an array of user references. But if you want the data for each user as well, then use `Project().readTeam()`. It unpacks each user reference and puts it into an array.

Notes:

- Structure: `[ user { id, ref, all other fields } ]`

#### Project().update(props)

Update a Project in the database.

Arguments:

- `props`: an object of properties corresponding to fields for the document in the database.

Notes:

- Can only be used to update existing documents.

#### Project().updateTag(tagInstance)

Proxies `Tag().updateProject(projectInstance)` for convenience.

Arguments:

- `tagInstance`: an instance of the Tag class to update the project for.

Notes:

- You can use either for the same effect.

#### Project().updateTeamUser(userInstance)

Associates user with a project's team in the database.

Arguments:

- `userInstance`: an instance of the User class.

- Notes:

Behind the scenes, the function adds a reference to the user in the Project document's team array.
It also adds a reference to the project in the User document's projects array.

#### Project().deleteTag(tagInstance)

Proxies `Tag().deleteProject(projectInstance)` for convenience.

Arguments:

- `tagInstance`: an instance of the Tag class to delete the project for.

Notes:

- You can use either for the same effect.

#### Project().deleteTags()

`Project().deleteTag(tagInstance)` deletes a specified tag from the Project. What if you wanted to delete all the tags the project is associated with? That's where `Project().deleteTags()` comes in. It is useful from a functional perspective.

Notes:

- Behind the scenes, this method calls `Project().deleteTag(tagInstance)` on every tag the project document has in its tags array.

#### Project().deleteTeam()

`Project().deleteTeamUser(userInstance)` deletes a specified user from the Project's team. What if you wanted to delete all the users the project team is associated with? That's where `Project().deleteTeam()` comes in. It is useful from a functional perspective.

Notes:

- Behind the scenes, this method calls `Project().deleteTeamUser(userInstance)` on every user the project document has in its team array.

#### Project().deleteTeamUser(userInstance)

Disassociate a user from a project's team in the database.

Arguments:

- `userInstance`: an instance of the User class to remove from the project's team.

Notes:

- The method deletes the User from the Project's team array. And it also deletes the project from the User's projects array.

#### Project().id()

Returns the unique string ID of document in the database.