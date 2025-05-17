from flask import Blueprint, jsonify, request

main = Blueprint("main", __name__)

@main.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Dummy prediction result
    result = {
        "input": data,
        "prediction": "recommendation result placeholder"
    }

    return jsonify(result)

