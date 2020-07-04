import pandas as pd
from flask import Flask, render_template, redirect, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
import os

# from password import password

# engine = create_engine(f'postgresql+psycopg2://postgres:{password}@localhost:5432/sportSalay_db')
# engine = create_engine(f'postgres://rwbdompjejjwby:c2e61aca98786bb3402c23494beb1902d523ef00dc2011cb46381334bb93146a@ec2-34-224-229-81.compute-1.amazonaws.com:5432/d1i0ak4t8u1rei')
engine = create_engine(os.environ.get('DATABASE_URL', ''))

app = Flask(__name__)
CORS(app, support_credentials=True)

def graphData(money):
    
    #------------------------------------------- First Visualization ------------------------------------------------
    # Retrieve the earnings by sport per year
    yearly_Sport = pd.DataFrame(money.groupby(["Year", "Sport"])["Earnings (Millions of US$)"].sum()).unstack().droplevel(level=0, axis = 1).fillna(0)
    yearlySport = yearly_Sport.to_dict('index')
    
    # Retrieve the earnings by nationality per year
    yearly_Nationalities = pd.DataFrame(money.groupby(["Year", "Nationality"])["Earnings (Millions of US$)"].sum()).unstack().droplevel(level=0, axis = 1).fillna(0)
    yearlyNationalities = yearly_Nationalities.to_dict('index')

    # Retrieve the total earnings per year
    yearly_Earnings = pd.DataFrame(money.groupby(["Year"])["Earnings (Millions of US$)"].sum()).fillna(0)
    yearlyEarnings = yearly_Earnings.to_dict('index')
    
    # Total earnings per nationality & sort
    nationality_globalEarnings = pd.DataFrame(money.groupby(["Nationality"])["Earnings (Millions of US$)"].sum().sort_values(ascending = False)).fillna(0)
    nationalityGlobalEarnings = nationality_globalEarnings.to_dict('index')
    
    # Total earnings per sport & sort
    sports_globalEarnings = pd.DataFrame(money.groupby(["Sport"])["Earnings (Millions of US$)"].sum().sort_values(ascending = False)).fillna(0)
    sportsGlobalEarnings = sports_globalEarnings.to_dict('index')
    
    # Total earnings per athlete & sort
    athlete_earnings = pd.DataFrame(money.groupby(["Name"])["Earnings (Millions of US$)"].sum().sort_values(ascending = False)).fillna(0)
    athleteEarnings = athlete_earnings.to_dict('index')
    
    #------------------------------------------ Second Visualization -------------------------------------------------
    
    # Earnings per sport by year
    sports_specificEarnings = pd.DataFrame(money.groupby(["Sport", "Year"])["Earnings (Millions of US$)"].sum()).unstack().droplevel(level=0, axis = 1).fillna(0)
    sportSpecificEarnings = sports_specificEarnings.to_dict('index')

    # Rank count per sport
    sports_specificRanking = pd.DataFrame(money.groupby(["Sport"])["Rank"].value_counts()).rename(columns = {"Rank":"Count"}).unstack().droplevel(level=0, axis = 1).fillna(0)
    sportSpecificRanking = sports_specificRanking.to_dict('index')

    # Total athletes per sport
    sports_Athletes = pd.DataFrame(money.groupby(["Sport"])["Name"].nunique()).fillna(0)
    sportsAthletes = sports_Athletes.to_dict('index')
    
    # Earnings per nationality by year
    nationality_specificEarnings = pd.DataFrame(money.groupby(["Nationality", "Year"])["Earnings (Millions of US$)"].sum()).unstack().droplevel(level=0, axis = 1).fillna(0)
    nationalitySpecificEarnings = nationality_specificEarnings.to_dict('index')
    
    # Ranking count per nationality
    nationality_specificRanking = pd.DataFrame(money.groupby(["Nationality"])["Rank"].value_counts())
    nationality_specificRanking = nationality_specificRanking.rename(columns = {"Rank":"Count"}).unstack().droplevel(level=0, axis = 1).fillna(0)
    nationalitySpecificRanking = nationality_specificRanking.to_dict('index')
    
    # Total atheletes per nationality
    nationality_Athletes = pd.DataFrame(money.groupby(["Nationality"])["Name"].nunique()).fillna(0)
    nationalityAthletes = nationality_Athletes.to_dict('index')
    
    # Categories
    allSports = sports_globalEarnings.index.values.tolist() 
    allNations = nationality_globalEarnings.index.values.tolist()
    
    # return [yearlySport, yearlyNation, yearlyEarnings, nationalityGlobalEarnings, sportsGlobalEarnings, athleteEarnings, sportSpecificEarnings, sportSpecificRanking, sportsAthletes, nationalitySpecificEarnings, nationalitySpecificRanking, nationalityAthletes]
    dictData = {
        "yearSport": yearlySport,
        "yearNation": yearlyNationalities,
        "yearEarnings": yearlyEarnings,
        "nationGlobalE": nationalityGlobalEarnings,
        "sportGlobalE": sportsGlobalEarnings,
        "AthletesEarnings": athleteEarnings,
        "sportEarnings": sportSpecificEarnings,
        "sportRanks": sportSpecificRanking,
        "sportAthletes": sportsAthletes,
        "nationEarnings": nationalitySpecificEarnings,
        "nationRanks": nationalitySpecificRanking,
        "nationAthletes":nationalityAthletes,
        "allSports": allSports,
        "allNations": allNations
    }
    
    return jsonify(dictData)

@app.route("/")
@cross_origin(supports_credentials=True)
def index():

    return render_template("index.html")

@app.route("/api/sports")
@cross_origin(supports_credentials=True)
def sports():
    conn = engine.connect()
    money = pd.read_sql("SELECT * FROM sports_data;", conn)
    data = graphData(money)
    conn.close()
    return data

if __name__ == "__main__":
    app.run(debug = True)

