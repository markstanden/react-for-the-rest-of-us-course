# marks-project-base
webpack/scss base config and site layout for future projects.

Github won't allow us to fork our own projects, so to use the template the following works well, thanks to Dean Malone for the guide to setting this up (https://deanmalone.net/post/how-to-fork-your-own-repo-on-github/)


## First -create a new empty repository for the new project on github
> https://github.com/new

## Clone the NEW repo
> git clone git@github.com:markstanden/NEW_REPO.git


## Add your original repository as an Upstream Remote

> cd NEW_REPO
> git remote add upstream git@github.com:markstanden/marks-project-base.git


## Pull the project-base repo down - note the branch name!

> git pull upstream master


## Now push the 'forked' repo back up to github

> git push origin master
