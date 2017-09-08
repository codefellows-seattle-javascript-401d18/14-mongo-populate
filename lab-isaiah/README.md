# Lab14-Isaiah

### Configuration
```
  * .gitignore
  * .eslintrc
  * .eslintignore
  * package.json
  * README.md (this file)
```

### Feature Tasks:
* Completed the featured task by creating the appropriate `GET`, `POST`, `PUT`, and `DELETE` routes for the child resource. Included a ***populate()*** on the child `GET` route. Here are list of HTTPie commands:

      ```
      1. http POST :5000/api/child name=dragon
      2. http GET :5000/api/child
      3. http PUT :5000/api/child name=dragon
      4. http PUT :5000/api/child/59b1f960f7197324fc81b171 name=blah
      5. http POST :5000/api/toy/59b1f960f7197324fc81b171 name='spider man' desc=hero
      6. http DELETE :5000/api/child/59b1f960f7197324fc81b171
      7. http GET :5000/api/child
      ```
