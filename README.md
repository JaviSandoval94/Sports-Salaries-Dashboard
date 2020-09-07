# Introduction
![tiger-woods](https://github.com/JaviSandoval94/Proyecto-2-Sports-Salaries/blob/master/static/img/Tiger_Woods.jpg)

## Description
In this project, we will try to answer questions related to the salary of players of different sports worldwide in an online dashboard. Our data set presents annual information related to nationality, salary, sport/discipline, current rank and last year rank. The technologies that we will be using include D3, Flask and PostgreSQL, to create a front-end visualization connected to a back-end server containing our database. The final dashboard was deployed on Heroku and can be accessed [here](https://javisandoval94-sports-salaries.herokuapp.com/).  The dashboard will help us solve the following key questions:

## Key questions
* Which is the highest paying sport?
* Which country has the most top 10 paid athletes?
* Is there a relationship between a player’s nationality and his salary?
* Has the salary of sports players increased overtime since 1990?

## Dataset
Forbes Highest Paid Athletes 1990-2019

URL: https://www.kaggle.com/parulpandey/forbes-highest-paid-athletes-19902019

## Justification
This dataset was chosen to challenge ourselves and put to work the data visualization skills we’ve gathered throughout the class.

## Plot types
* Pie/bar chart
* Scatter Plot
* Radial stackedbar (circular)
* Earnings by country and sport

# Code description
This repository contains all the files to deploy our dashboard online, incluidng `requirements.txt` and `Procfile`. Our Flask server is contained in the `money_app.py` file and is connected to the final deployed PostgreSQL database in Heroku. The `static` folder contains all the files necessary to deploy the visualizations in the `index.html` template, including the `money.js` file, which contains the script to work with the data an generate the final plots.
