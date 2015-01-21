# Ubuntu setup
DB
```bash
# install whole PostgreSQL package
sudo apt-get install postgresql postgresql-client postgresql-contrib

# change password for Ubuntu's postgres user
sudo passwd postgres 

# log in as Ubuntu's postgres user
su postgres 

# change password for PostgreSQL's postgres user
# it should be equal to one provided in 'server/db/config.json.json'
# type Control+D to exit the PosgreSQL prompt
psql postgres
\password postgres

# create application DB
createdb todo

# log out as Ubuntu's postgres user
exit

# reload and restart DB
sudo service postgresql reload 
sudo service postgresql restart
```
Application
```bash
# install nodejs and task runner used by build system
sudo apt-get install nodejs
sudo npm install gulp -g

# checkout sources to your machine
git clone https://github.com/viktor-shepel/web-todo-app.git

# navigate to application folder
cd web-todo-app

# setup all application packages
npm install

# migrate DB to latest schema
gulp db:migrate

# launch app in development mode and redirect browser to address in terminal output
# like `Server started http://localhost:9000`
gulp development
```
