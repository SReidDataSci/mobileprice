from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)
# Allow all origins and all methods
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://sreiddatasci.github.io/portfolio/"]}}, supports_credentials=True)

url = "https://raw.githubusercontent.com/SReidDataSci/mobileprice/refs/heads/main/data/train.csv"
dataframe = pd.read_csv(url)

X = dataframe.iloc[:, :-1].values
Y = dataframe.iloc[:, -1].values

clf = DecisionTreeClassifier()
clf.fit(X, Y)

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200
    
    # Get the phone data from the request
    data = request.json
    
    # Example: ['battery_power', 'blue', 'clock_speed', etc...]
    features = [data['battery_power'], data['blue'], data['clock_speed'], data['dual_sim'],
                data['fc'], data['four_g'], data['int_memory'], data['m_dep'], data['mobile_wt'], 
                data['n_cores'], data['pc'], data['px_height'], data['px_width'], data['ram'], data['sc_h'], 
                data['sc_w'], data['talk_time'], data['three_g'], data['touch_screen'], data['wifi']]
    
    # Reshape the input for prediction
    features = np.array(features).reshape(1, -1)
    
    # Make the prediction
    prediction = clf.predict(features)
    
    # Return the prediction as a JSON response
    return jsonify({'price_range': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
