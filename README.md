# Fobes Top Paid Athletes 1990 - 2019
![tiger-woods](https://github.com/JaviSandoval94/Proyecto-2-Sports-Salaries/blob/master/static/img/Tiger_Woods.jpg)

## Background
In this project, we will try to answer questions related to the salary of players of different sports worldwide in an online dashboard. Our data set presents annual information related to nationality, salary, sport/discipline, current rank and last year rank. The technologies that we will be using include D3, Flask and PostgreSQL, to create a front-end visualization connected to a back-end server containing our database. The final dashboard was deployed on Heroku and can be accessed [here](https://javisandoval94-sports-salaries.herokuapp.com/).  The dashboard will help us solve the following key questions:

## Key questions
* Which is the highest paying sport?
* Which country has the most top 10 paid athletes?
* Is there a relationship between a player’s nationality and his salary?
* Has the salary of sports players increased overtime since 1990?

## Data set
Forbes Highest Paid Athletes 1990-2019

URL: https://www.kaggle.com/parulpandey/forbes-highest-paid-athletes-19902019

The complete data set was donwloaded in `.csv` format and saved in a single-table PostgreSQL database containing all the data fields. The database was accessed using a SQLAlchemy engine in the `money_app.py` file, which contains the Flask script to run the backend server and generate the corresponding visualizations in the HTML template.

## Code description
This repository contains all the files to deploy our dashboard online, incluidng `requirements.txt` and `Procfile`. Our Flask server is contained in the `money_app.py` file and is connected to the final deployed PostgreSQL database in Heroku. The `static` folder contains all the files necessary to deploy the visualizations in the `index.html` template, including the `money.js` file, which contains the script to work with the data an generate the final plots.

## Visualizations
The earnings data was first visualized in yearly categories using a sunburst chart, which the user can interact with to identify the highest-paying sport in each year. This visualization is helpful to visualize two dimensions in a visual without much visual clutter. This chart revealed that out of the analyzed data, the highest paid year for the sports industry was 2018.

![year-sunburst](https://github.com/JaviSandoval94/Sports-Salaries-Dashboard/blob/master/static/img/visualizations/sunburst-years.PNG)

Unsing the sunburst functionality of the previously described chart, the user can quickly identify the highest paid sport in any given year. For instance, the highest paying sports in 2018 were boxing and soccer

![2018-sunburst](https://github.com/JaviSandoval94/Sports-Salaries-Dashboard/blob/master/static/img/visualizations/sunburst-2018.PNG)

Two simple data pies were also generated to extract general data, showing that the country with a highest paying sports industry is the USA, which accounts for 65.1% of the toal earnings in the data set. The highest paying sport from 1990 to 2019 was basketball, which accounts for 24.9% of the total earnings in the data set.

An additional interactive visualization allows the user to select between the Nationality or Sport categories to get specific stats upon selection. This allows for the user to see the total athletes, overall country/sport ranking, best rank, best earnings year and total earnings of the selection.

![stats-country-and-sport](https://github.com/JaviSandoval94/Sports-Salaries-Dashboard/blob/master/static/img/visualizations/stats-country-and-sport.PNG)

The user's selection also affects the final lollipop chart, which showcases the total earnings of the selected country or sport by year. The height and size of the bubbles in this final chart is proportional to the amount of earnings the country or sport had in any given year.

![lollipop-chart](https://github.com/JaviSandoval94/Sports-Salaries-Dashboard/blob/master/static/img/visualizations/lollipop-chart.PNG)

## Final remarks
This project shows the utility of interactive data visualizations to represent and make sense out of multidimensional data. Our dashboard can be further improved by implementing alternative visualizations to better showcase categorical data, since the data categories can make it difficult to read the graphs in the traditional pie charts. Any additional comment on the functionality and visualizations will also be appreciated!
