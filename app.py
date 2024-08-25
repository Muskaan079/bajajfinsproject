from flask import Flask, request, jsonify

app = Flask(__name__)

# POST route for /bfhl
@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    try:
        # Extracting data from the request
        data = request.json.get('data')
        if not isinstance(data, list):
            return jsonify({"is_success": False, "error": "Invalid data format"}), 400

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lower_case_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase = max(lower_case_alphabets) if lower_case_alphabets else ""

        response = {
            "is_success": True,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "ABCD123",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 500

# GET route for /bfhl
@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
