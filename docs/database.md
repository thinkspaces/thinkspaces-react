# Database

## Table of contents

- [Database](#database)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Recommendations](#recommendations)
    - [Nested properties that may not exist](#nested-properties-that-may-not-exist)
    - [Static methods](#static-methods)
    - [Consistency](#consistency)
    - [Manually deleting documents from the Firebase console](#manually-deleting-documents-from-the-firebase-console)
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
      - [Tag().bucket()](#tagbucket)
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
      - [User().updateAdmin(projectInstance)](#userupdateadminprojectinstance)
      - [User().deleteTag(tagInstance)](#userdeletetagtaginstance)
      - [User().deleteTeam(projectInstance)](#userdeleteteamprojectinstance)
      - [User().deleteAdmin(projectInstance)](#userdeleteadminprojectinstance)
      - [User().id()](#userid)
  - [Project](#project)
    - [Project Firebase structure](#project-firebase-structure)
    - [Project properties](#project-properties)
      - [Project().ref](#projectref)
    - [Project methods](#project-methods)
      - [Project(pid, pDocRef)](#projectpid-pdocref)
      - [Project().create(props)](#projectcreateprops)
      - [Project().read()](#projectread)
      - [static Project().read(field, comparator, value)](#static-projectreadfield-comparator-value)
      - [Project().readTags(tbid)](#projectreadtagstbid)
      - [Project().readTeam()](#projectreadteam)
      - [Project().readAdmin()](#projectreadadmin)
      - [Project().update(props)](#projectupdateprops)
      - [Project().updateTag(tagInstance)](#projectupdatetagtaginstance)
      - [Project().updateTeamUser(userInstance)](#projectupdateteamuseruserinstance)
      - [Project().updateAdminUser(userInstance)](#projectupdateadminuseruserinstance)
      - [Project().delete()](#projectdelete)
      - [Project().deleteTag(tagInstance)](#projectdeletetagtaginstance)
      - [Project().deleteTags(tbid)](#projectdeletetagstbid)
      - [Project().deleteTeamUser(userInstance)](#projectdeleteteamuseruserinstance)
      - [Project().deleteTeam()](#projectdeleteteam)
      - [Project().deleteAdminUser(userInstance)](#projectdeleteadminuseruserinstance)
      - [Project().deleteAdmin()](#projectdeleteadmin)
      - [Project().id()](#projectid)
      - [static Project.idFromShortname(shortname)](#static-projectidfromshortnameshortname)

## Introduction

The Database models use the CRUD pattern: Create, Read, Update, Delete.

- Create: Create a new document in the database for the model / collection.
- Read: Unpack the data for a document.
- Update: Modify the data for a document.
- Delete: Delete a document.

There are also helper functions for each model that simplify common tasks. These also follow the CRUD pattern.

## Recommendations

### Nested properties that may not exist

Use `idx` library to safely access nested properties. Database records may be inconsistent and some fields may be missing. `idx` returns if any of a chain of properties is `null` or `undefined`.

### Static methods

If making a new method that does not require use of a class instance, make the method `static`. Static functions are used like this e.g. `TagBucket.myStaticFunction()`. In contrast, recall that non-static methods are used like this e.g. `new TagBucket("location").read()`.

### Consistency

- Use the CRUD keywords where possible for consistency.
- Consider extending existing methods (and try to remain consistent) instead of making new ones for special cases.

### Manually deleting documents from the Firebase console

In general, this is OK, but be aware of the following dependencies:

- If deleting a project, make sure to delete all references to the project by users (and vice versa).
- If deleting a tag, make sure to delete all references to the tag by projects and users (and vice versa).

Basically, anything which has a reference field to another document needs to be carefully dealt with when deleting.

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

#### Tag().bucket()

Returns a TagBucket instance for the bucket the tag belongs to.

## User

### User Firebase structure

It's intended for this structure to be the single source of truth for all users in the database.

*Disclaimer*: this structure might be incomplete and only contains the most important fields.

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

Proxies `Project().updateTeamUser(userInstance)` for convenience.

Arguments:

- `projectInstance`: an instance of the Project class to update the user for.

Notes:

- You can use either for the same effect.

#### User().updateAdmin(projectInstance)

Proxies `Project().updateAdminUser(userInstance)` for convenience.

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

- `projectInstance`: an instance of the Project class to remove from the user's teams array.

Notes:

- You can use either for the same effect.

#### User().deleteAdmin(projectInstance)

Proxies `Project().deleteAdminUser(userInstance)` for convenience.

Arguments:

- `projectInstance`: an instance of the Project class to remove from the user's admin array.

Notes:

- You can use either for the same effect.

#### User().id()

Returns the unique string ID of document in the database.

## Project

### Project Firebase structure

It's intended for this structure to be the single source of truth for all projects in the database.

*Disclaimer*: this structure might be incomplete and only contains the most important fields.

- tags: [DocumentReference]
  - 0 or more references to tags
- team: [DocumentReference]
  - 0 or more references to users that are part of the project's team
- admin: [DocumentReference]
  - 0 or more references to users that are part of the project's admin group
- privacy : { visibleInSearch : bool }
  - This map/object may be expanded with more properties in the future
- shortname: string
  - Unique for every project

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

#### static Project().read(field, comparator, value)

Queries for Project documents in the database, and returns them as an array.

Arguments:

- `field`: which field to query against e.g. "shortname"
- `comparator`: comparators e.g. "==", "<="
- `value`: specific value

Notes:

- Wraps the Firebase simpleQuery: <https://firebase.google.com/docs/firestore/query-data/queries>

#### Project().readTags(tbid)

`Project().read()` gives an array of tag references. But if you want the data for each tag as well, then use `Project().readTags()`. It unpacks each tag reference and puts it into an array.

Arguments:

- `tbid`: an optional string for the Tag Bucket. If specified, only those project tags belonging to the bucket will be fetched.

Notes:

- Structure: `[ tag { id, ref, all other fields } ]`

#### Project().readTeam()

`Project().read()` gives a team which is an array of user references. But if you want the data for each user as well, then use `Project().readTeam()`. It unpacks each user reference and puts it into an array.

Notes:

- Structure: `[ user { id, ref, all other fields } ]`

#### Project().readAdmin()

`Project().read()` gives an admin which is an array of user references. But if you want the data for each user as well, then use `Project().readAdmin()`. It unpacks each user reference and puts it into an array.

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
It also adds a reference to the project in the User document's teams array.

#### Project().updateAdminUser(userInstance)

Associates user with a project's admin in the database.

Arguments:

- `userInstance`: an instance of the User class.

- Notes:

Behind the scenes, the function adds a reference to the user in the Project document's admin array.
It also adds a reference to the project in the User document's admin array.

#### Project().delete()

Deletes the Project from the database entirely.

Notes:

- Deletes the project document.
- Deletes any two-way references to users (teams and admin).
- Deletes any two-way references to tags.
- Deletes all images.

#### Project().deleteTag(tagInstance)

Proxies `Tag().deleteProject(projectInstance)` for convenience.

Arguments:

- `tagInstance`: an instance of the Tag class to delete the project for.

Notes:

- You can use either for the same effect.

#### Project().deleteTags(tbid)

`Project().deleteTag(tagInstance)` deletes a specified tag from the Project. What if you wanted to delete all the tags the project is associated with? That's where `Project().deleteTags(tbid)` comes in. It is useful from a functional perspective.

Arguments:

- `tbid`: an optional string for the Tag Bucket. If specified, only those project tags belonging to the bucket will be deleted.

Notes:

- Behind the scenes, this method calls `Project().deleteTag(tagInstance)` on every tag the project document has in its tags array.

#### Project().deleteTeamUser(userInstance)

Disassociate a user from a project's team in the database.

Arguments:

- `userInstance`: an instance of the User class to remove from the project's team.

Notes:

- The method deletes the User from the Project's team array. And it also deletes the project from the User's teams array.

#### Project().deleteTeam()

`Project().deleteTeamUser(userInstance)` deletes a specified user from the Project's team. What if you wanted to delete all the users the project team is associated with? That's where `Project().deleteTeam()` comes in. It is useful from a functional perspective.

Notes:

- Behind the scenes, this method calls `Project().deleteTeamUser(userInstance)` on every user the project document has in its team array.

#### Project().deleteAdminUser(userInstance)

Disassociate a user from a project's admin array in the database.

Arguments:

- `userInstance`: an instance of the User class to remove from the project's admin.

Notes:

- The method deletes the User from the Project's admin array. And it also deletes the project from the User's admin array.

#### Project().deleteAdmin()

`Project().deleteAdminUser(userInstance)` deletes a specified user from the Project's admin. What if you wanted to delete all the users the project admin is associated with? That's where `Project().deleteAdmin()` comes in. It is useful from a functional perspective.

Notes:

- Behind the scenes, this method calls `Project().deleteAdminUser(userInstance)` on every user the project document has in its admin array.

#### Project().id()

Returns the unique string ID of project document in the database.

#### static Project.idFromShortname(shortname)

Returns the unique ID of a project document in the database.

Arguments:

- `shortname`: a string corresponding to the unique shortname for any project

Notes:

- Useful for routing (creating Project instances using a shortname indirectly when the pid is not known)