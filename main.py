# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_render_template]
import datetime
from flask import Flask, render_template, jsonify
import requests

# from flask_security import Security, login_required, SQLAlchemySessionUserDatastore
# from database import db_session, init_db
# from models import User, Role

# 创建应用（app）
app = Flask(__name__)


# # 设置 Flask-Security
# user_datastore = SQLAlchemySessionUserDatastore(db_session, User, Role)
# security = Security(app, user_datastore)


@app.route('/')
def root():
    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    dummy_times = [datetime.datetime(2018, 1, 1, 10, 0, 0),
                   datetime.datetime(2018, 1, 2, 10, 30, 0),
                   datetime.datetime(2018, 1, 3, 11, 0, 0),
                   ]

    return render_template('index.html', times=dummy_times)

@app.route('/health_check')
def health_check():
    return "live"

@app.route('/test')
def test():
    return "just a test"

@app.route('/api/categories')
def categories():
    data = {"ca":["ca_total_score", "spatial_reasoning", "performance_iq", "verbal_reasoning", "processing_speed", "coping_with_distractions", "quantitative_reasoning"],
            "wm":["planning", "decisiveness", "orderliness","quality_quantity","thoroughness","self_monitoring","methodicallness","goal_orientation_efficiency", "time_management"],
            "ss":["emotional_intelligence", "empathy", "appropriate_behaviour_understanding", "collegial_behavior", "team_work"]}
    return jsonify(data)

@app.route('/api/dummydata/1')
def dummy_data1():
    data = [
      {
        "name": "user1",
        "test_scores": {
          "ca": [5.4,5.3,5.1,4.8,5,5,4.4],
          "ss": [2.4,2.8,4.3,3.8,4.1],
          "wm": [4.4,5.1,1.8,5.2,4.5,4.7,5,5,4.9]
        }
      },
      {
        "name": "role model1",
        "test_scores": {
          "ca": [5.4,5.3,5.4,4.8,3,5,4.4],
          "ss": [2.4,2.8,4.3,3.8,2.1],
          "wm": [3.4,3.1,5.8,5.2,4.5,4.7,5,5,3.9]
        }
      }
    ]
    return jsonify(data)

@app.route('/api/dummy/fit_rate/1')
def dummy_data2():
    data = {"name":"user2", "data":82}
    return jsonify(data)

@app.route('/api/call_other_api')
def call_api():
    r = requests.get('http://35.221.122.208/api/user/1', headers={"X-API-KEY":"jsolvtaredev"})
    print(r.json())
    return jsonify(r.json())


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='0.0.0.0', port=80, debug=True)
# [START gae_python37_render_template]
