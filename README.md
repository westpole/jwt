# JWT package test application

## Before use

Run **npm install** to setup environment

## How to use it

Run server task to emulate server logic

    npm run server

Then run client to emulate user behaviour

    npm run client

Then open browser and navigate to **http://localhost:8082**

Use default user credentials to get successful result

    user: dartwader
    password: pass123

Test project code base:

    # run single test suit
    npm test

    # when develop in TDD style
    npm run tdd

## Prepare database

Mongodb holds application model. You should create **"local"** database and **"jwt"** collection before start.
Mondodb is running on default 27017 port.

Initial data set:

    collection.insert([
        { user: 'dartwader', password: '8We4bOMkPf9be089cdbe9dd86968ef070df7d3402' }
    ]);