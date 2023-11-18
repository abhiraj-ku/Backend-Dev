from flask import Flask, render_template

app= Flask(__name__)

@app.route('/')
def index():
    # Data to pass to the HTML template
    message = "Hello from Python!"

    # Render the HTML template with the provided data
    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(debug=True)